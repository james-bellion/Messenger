"use client";

import { Conversation } from "@prisma/client";
import React, { useState } from "react";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/app/components/hooks/useConversation";
import clsx from "clsx";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initalItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initalItems }) => {
  // assign initial items to a state
  const [items, setItems] = useState(initalItems);

  const router = useRouter();

  // destructure
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
          `,
        isOpen ? "hidden" : "block-w-full left-0" // conditional if not hidden apply this style, same as the users style
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div
            className="
                     text-2xl
                     font-bold
                     text-neutral-800
                     "
          >
            Messages
          </div>
          <div
           className="
           rounded-full
           p-2
           bg-gray-100
           text-gray-600
           cursor-pointer
           hover:opacity-75
           transition
           ">
            <MdOutlineGroupAdd size={20}/>
          </div>
        </div>
         {/* iteration mapping over our icons */}
        {items.map((item) => (
          <ConversationBox 
            key={item.id}
            data={item}
            selected={Number(conversationId) === item.id} // converted conversationID to a number to resolve a types match error
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList; 
