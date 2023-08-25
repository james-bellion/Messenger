import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2" 
import { signOut } from "next-auth/react"

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()

    // extract conversation id
    const { conversationId } = useConversation()

    // routes
    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId // check for conversationId
        },
        {
            label: 'Users',
            href: 'users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes


// In summary, the useRoutes hook provides an array of route objects with properties
// describing each route's label, URL path, associated icon, and active status.
// It also manages the context of the conversation, including checking for the presence
// of a conversationId. This hook abstracts away the logic for defining routes and their
// corresponding active states based on the URL pathname and conversation context.

// installed package react icons