import prisma from "@/app/libs/prismadb"

import getSession from "./getSession"

// not and api route but a server action
const getCurrentUser = async () => {
    try{
        const session = await getSession()

        // check if current session exists 
        if (!session?.user?.email) {
            return null
        }

        // otherwise search for current user using that email
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string // email: is equel to
            }
        })

        // check if current user exists
        if (!currentUser) {
            return null
        }

        // otherwise
        return currentUser

    } catch (error: any) {
        return null

    }
}

export default getCurrentUser

// dev notes 

// function to get a current user, used to get the user icon in the sidebar componet 
// imports the action function getSession
