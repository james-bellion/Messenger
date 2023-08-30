import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

// post function for this route

export async function POST(
    request: Request
) {
    try {
        // first get the current user
        const currentUser = await getCurrentUser
    } catch (error: any) {
        return new NextResponse('Internal Error in conversation route', { status: 500 })
    }
}