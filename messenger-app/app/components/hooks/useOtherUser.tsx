// import { useSession } from "next-auth/react"
// import { useMemo } from "react"
// import { FullConversationType } from "@/app/types"
// import { User } from "@prisma/client"

//                      // give it a conversion of > open and object >  give type of user and array
// const useOtherUser = (conversation: FullConversationType | {
//     users: User[]
// }) => {
//     //get our session
//     const session = useSession()

//     // get the current user email by using session
//     const otherUser = useMemo(() => {
//         const currentUserEmail = session?.data?.user?.email

//         //filter through the conversation users, filter out whatever is not my user using the email
//         const otherUser = conversation.participants.find(user => user.email !== currentUserEmail); // leave only the user thats not our current user

//         return otherUser[0]
//     }, [session?.data?.user?.email, conversation.participants])

//     return otherUser

// }

// export default useOtherUser

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType, User } from "@/app/types";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    if ("participants" in conversation) {
      // This is a FullConversationType
      const otherParticipant = conversation.participants.find(
        (user) => user.email !== currentUserEmail
      );

      return otherParticipant;
    } else if ("users" in conversation) {
      // This is the other version with a users property
      const otherParticipant = conversation.users.find(
        (user) => user.email !== currentUserEmail
      );

      return otherParticipant;
    }

    return null; // Handle other cases or return default value
  }, [session.data?.user?.email, conversation]);

  return otherUser;
};

export default useOtherUser;


