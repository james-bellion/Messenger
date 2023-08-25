import { useParams } from "next/navigation"
import { useMemo } from "react"

const useConversation = () => {
    const params = useParams()

    // search for conversation id inside of these paramaters
    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return ''
        }

        return params.conversationId as string
    }, [params?.conversationId])

    // !! turns this string into a boolean
    const isOpen = useMemo(() => !!conversationId, [conversationId]) 

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])
}

export default useConversation

//In summary, this hook is used to determine the state of a conversation, specifically
// whether a conversation is open and the corresponding conversationId. It abstracts away
// the logic for extracting and managing conversation-related information from
// URL parameters.