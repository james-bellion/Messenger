"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/components/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

//types
interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
  // todo: create a hook to help us to select the another user from the conversation
  // when we load a conversation this will make sure that its the other users name on the convo not the current user
  // eg talking to mark it will show marks name as the conversation.
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession(); // get our session
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  // constants:
  // Logic to fetch the last message sent in the conversation
  const lastMessage = useMemo(() => {
    // first get all messages
    const messages = data.messages || [];

    // now get the last message
    return messages[messages.length - 1];
  }, [data.messages]);

  //create a variable to fetch our user email
  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // logic for our seen boolean, has user seen the message or not
  const hasSeen = useMemo(() => {
    // first check if there is an existing last message
    if (!lastMessage) {
      return false;
    }

    // structure seen array
    const seenArray = lastMessage.seenByUsers || []; // || [] is to avoid error checking a filter meathod on undefined, with this we can safly check

    // check for no user email
    // need the user email to be loaded in order to compare weather it is in this seen array
    if (!userEmail) {
      return false;
    }

    // filter the seen array to only find the user that is the current logged in user and
    // confirm the length of the array is not 0 meaning there is atleast one email inside
    // that matches the email of the logged in usermeaning that the logged in user has seen this message.
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  // last message text
  const lastMessageText = useMemo(() => {
    // first check if image
    // because if image we cannt show any test to the user
    if (lastMessage?.image) {
      return "Sent an Image";
    }

    // if theres a body that means there is some text to display
    // eg the actual last message someone has sent
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
         w-full
         relative
         flex
         items-center
         space-x-3
         hover:bg-neutral-100
         rounded-lg
         transition
         cursor-pointer
         p-3
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {/* Avatar expects a single user */}
      <Avatar user={otherUser || undefined} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                    flex
                    justify-between
                    items-center
                    mb-1
                "
          >
            <p
              className="
                    text-md
                    font-medium
                    text-gray-900
                    "
            >
              {data.name || (otherUser && otherUser.name)}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                         text-xs
                         text-gray-400
                         font-light
                         "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
          className={clsx(`
          truncate
          text-sm
          `,
          hasSeen ? 'text-gray-500' : 'text-black font-medium'
          )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;

// dev notes:
// installed package date-fns

// todo: confirm the last message time is working...

// By using (otherUser && otherUser.name), you are checking if otherUser
// is not null or undefined before trying to access the name property.
// This will prevent the error you're encountering and ensure that otherUser.name
// is only accessed if otherUser is truthy.

// has seen ? if read the message will be a dark lighter color if not seen will be a bolder darker color to indicate not read yet
