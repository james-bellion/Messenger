// import prisma from "@/app/libs/prismadb";

// const getMessages = async (conversationId: string) => {
//   try {
//     const conversationIdAsNumber = parseInt(conversationId); // Parse the string to a number

//     const messages = await prisma.message.findMany({
//       where: {
//         conversationId: conversationIdAsNumber,
//       },
//       include: {
//         sender: true,
//         seenByUsers: true,
//       },
//       orderBy: {
//         createdAt: "asc",
//       },
//     });

//     return messages;
//   } catch (error: any) {
//     return [];
//   }
// };

// export default getMessages;

// // this logic loads the messges from the bottom of the page







import prisma from "@/app/libs/prismadb";

const getMessages = async (
  conversationId: string
) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seenByUsers: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
