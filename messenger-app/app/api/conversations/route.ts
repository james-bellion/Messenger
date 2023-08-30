import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// post function for this route

// group chat logic
// one-to-one conversation logic

export async function POST(request: Request) {
  try {
    // first get the current user
    const currentUser = await getCurrentUser();

    // parse our body
    const body = await request.json();

    // extract all possible values from our body
    const {
      userId, // 1 to one
      isGroup, // *boolean
      members, // for group chats we will need members
      name, // name of the group chat
    } = body;

    // check if we have the current user
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check if we sent is group true but we have not sent members or name
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // code to create a group chat if isGroup is present
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          participants: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          participants: true,
        },
      });

      // now we have the newConversation all we have to do is:
      return NextResponse.json(newConversation);
    }

    // one-to-one convo
    // first check if there's an existing convo with that person

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            participants: {
              every: {
                id: { in: [currentUser.id, userId] },
              },
            },
          },
        ],
      },
    });

    // extract the only existing conversation
    const singleConversation = existingConversations[0];

    // if there is a single conversation, return it back to the user
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    // handle creating a new conversation if the existing conversation query does not exist
    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        participants: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal Error in conversation route", {
      status: 500,
    });
  }
}




// dev notes:
// sorry for all the comments 
// had lots of errors with user and userId. changed to participants and fixed for now,
// a conversation has been added to the database when clicking on a user in the UI

// for refference this is my old code maybe i missed something else will see later:
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import { NextResponse } from "next/server";

// import prisma from "@/app/libs/prismadb";


// // post function for this route

// // group chat logic
// // one-to-one conversation logic

// export async function POST(request: Request) {
//   try {
//     // first get the current user
//     const currentUser = await getCurrentUser();

//     // parse our body
//     const body = await request.json();

//     // extract all possible values from our body. open and array destructure all of the
//     // possible properties that we can send when creating a new conversation

//     // *so far what we know from the UserBox compoent. we know that one of the feilds
//     // we have is 'userID' (axios post api/conversations userID: data) > that is for
//     // creating a single one to one conversation but our conversation route is also
//     // going to be able to handel group chats so that why we are going to have more
//     // elements in this body bellow. We are going to need all of these values to do that.
//     const {
//       userId, // 1 to one
//       isGroup, // *boolean
//       members, // for group chats we will need members
//       name, // name of the group chat
//     } = body;

//     // check if we have the current user
//     if (!currentUser?.id || !currentUser?.email) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // check if we sent is group true but we have not sent members or name
//     if (isGroup && (!members || members.length < 2 || !name)) {
//       return new NextResponse("Invalid data", { status: 400 });
//     }

//     // code to create a group chat if isGroup is present
//     //* itterates over the array of members which we passed which are going to have a value object
//     //  inside of them which is going to serve as an ID and we're going to use the ID to connect our users.
//     if (isGroup) {
//       const newConversation = await prisma.conversation.create({
//         data: {
//           name,
//           isGroup,
//           users: {
//             connect: [
//               // conect them using prisma. filter out our user from the list of possible user to add in a group chat
//               ...members.map((member: { value: string }) => ({
//                 id: member.value
//               })),
//               {
//                 id: currentUser.id, // speratly adds the current user to the group of members
//               },
//             ],
//           },
//         },
//         // populate the users when we fetch the conversation. So by default when
//         // you get a new conversation you're not going to get an array of objects
//         // of your users inside of that group chat, your only going to get Id's
//         // but if you want to work with those users for example displaying their
//         // image or name you need to populate them. ***In prisma we do that uisng
//         // include + the feild we want to populate and true like this
//         include: {
//           users: true,
//         },
//       });

      
//       // now we have the newConversation all we have to do is:
//       return NextResponse.json(newConversation);
//     }

//     // one-to-one convo
//     // first check if theres an exisiting convo with thta person.

//     // look throughout all the conversations that exist.
//     // search the userIds feild.
//     // we are going to find if there is a conversation that has only these two users.
//     // eg. the user we are loged in as and the user we are trying to start a new convo with.
//     // if it already exsists we are not going to create a new one for them.

//     const existingConversations = await prisma.conversation.findMany({
//       // get an array (exsistingConversations) have to extract the first one from the array
//       where: {
//         // where query, open object
//         OR: [
//           //open arry
//           {
//             //open another object object
//             userIds: {
//               // search userId's feild
//               equals: [currentUser.id, userId],
//             },
//           },
//           {
//             // open another object
//             userIds: {
//               equals: [userId, currentUser.id],
//             },
//           },
//         ],
//       },
//     });

//     // extract the only existing conversation
//     const singleConversation = existingConversations[0];

//     // if there is a single conversation, in that case we can return the very same
//     // conversation back to the user instead of creating a new one.
//     if (singleConversation) {
//       return NextResponse.json(singleConversation);
//     }

//     // handel creating a new conversation if the existing conversation query does not exist
//     const newConversation = await prisma.conversation.create({
//       data: {
//         // for the data,
//         users: {
//           // give it a users object.
//           connect: [
//             // connect the users we are using.
//             {
//               id: currentUser.id, // first user to connect is ouselfs.
//             },
//             {
//               id: userId, // other user that we select from the user box in the UI
//             },
//           ],
//         },
//       },
//       include: {
//         // for using in the UI...
//         users: true,
//       },
//     });

//     return NextResponse.json(newConversation);
//   } catch (error: any) {
//     return new NextResponse("Internal Error in conversation route", {
//       status: 500,
//     });
//   }
// }

