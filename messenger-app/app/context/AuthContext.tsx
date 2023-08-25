'use client'

import { SessionProvider } from "next-auth/react" // component provided by NextAuth.js that manages user sessions and authentication state
import React from "react"

interface AuthContextProps {
    children: React.ReactNode
}

export default function AuthContext({
    children
}: AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>
}

// Dev Notes
// This code is defining an AuthContext component that wraps its children with the
// SessionProvider from the next-auth/react package. This context is used to manage user
// authentication state and provides session information to components within your application.

// The purpose of this context is to provide authentication-related information to
// components without having to manually pass that information down through props.
// By wrapping your components in this context, you can access authentication session data,
// such as the user's status (logged in or not), user ID, user email, and more, using
// hooks or the useSession hook from next-auth/react.