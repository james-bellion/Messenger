import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  // first we're going to get the session
  const session = await getSession();

  // check if we have the session
  if (!session?.user?.email) {
    return [];
  }

  try {
    // try find all the users excluding our own user eg. show your friends list
    // array of users, useing method findMany
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc", // decending, newest users at the top
      },
      where: {
        // special query.
        NOT: {
          email: session.user.email, // not our curent user
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
