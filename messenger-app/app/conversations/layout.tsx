import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default async function conversationsLayout({
    children // prop

}: {
    children: React.ReactNode
}) {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}