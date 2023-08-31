import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"
import { FullConversationType } from "../types"

// Function to get conversations involving the current user
const getConversations = async () => {
    // First get the current user
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
        return []
    }

    try {
        // Find conversations
        // Order by last message at descending.
        // Orders conversations by the latest message that has been sent in them
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            // Query using relation filtering
            where: {
                participants: {
                    some: {
                        id: currentUser.id
                    }
                }
            },
            // Populate fields we have in the conversations model
            include: {
                participants: true,
                messages: {
                    include: {
                        sender: true, // Author of the message
                        seenByUsers: true // Users who have seen the message
                    }
                }
            }
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
}

export default getConversations;
