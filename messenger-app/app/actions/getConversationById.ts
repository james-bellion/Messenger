// import prisma from "@/app/libs/prismadb"
// import getCurrentUSer from "./getCurrentUser"
// import getCurrentUser from "./getCurrentUser"

// const getConversationById = async(
//     conversationId: string  // takes this as a string
// ) => {
//     try {
//         // 
//         const currentUser = await getCurrentUser()

//         // check if theres no current user
//         if (!currentUser?.email) {
//             return null
//         }

//         // use prisma to find the conversation
//         const conversation = await prisma.conversation.findUnique({
//             where: {
//                 id: parseInt(conversationId), // Parse the string ID to a number
//             },
//             include: {
//                 participants: true,
//             }
//         })

//         return conversation

//     } catch (error: any) {
//         return null 
//     }

// }

// export default getConversationById

// // dev notes

// //from errors i had :
// // Parse the conversationId to an integer using parseInt(conversationId)
// // because Prisma's findUnique expects the ID to be of type number.

// // Use participants instead of users in the include object. This is because
// // your FullConversationType has a property named participants, not users.

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;