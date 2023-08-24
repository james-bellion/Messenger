import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(
    request: Request
) {
    try {
    // extract the body
    const body = await request.json()
    const {
        email,
        name,
        password
    } = body 

    if (!email || !name || !password ) {
        return new NextResponse('Missing info', {  status: 400})
    }

    // create hashed password going to store in the database
    // cant store plain text passwords in the database we should encrypt them
    const hashedPassword = await bcrypt.hash(password, 12) // second argument takes the number 12 as options 

    // define the user 
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user)
} catch (error: any) {
    console.log(error, 'REGISTRATION_ERROR') // map my try catch to a registration error for debugging
    return new NextResponse('Internal Error', { status: 500 })
}
    
}