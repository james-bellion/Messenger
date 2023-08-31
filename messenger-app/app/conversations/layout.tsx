import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import { FullConversationType } from "../types";

export default async function conversationsLayout({
    children // prop

}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                initalItems={conversations}
                 />
                {children}
            </div>
        </Sidebar>
    )
}