'use client'

import { User } from "@prisma/client"
import React from "react"
import UserBox from "./UserBox"

interface UserListProps {
    items: User[] // an array of users from our db
}

const UserList: React.FC<UserListProps> = ({
    items
}) => {
    return (
        <aside
        className="
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
         block
         w-full
         left-0
        ">
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                     text-2xl
                     font-bold
                     text-neutral-800
                     py-4
                    ">
                        My Squad

                    </div>
                </div> 
                {/* maps over the induvidual users and displays them in a new component 'UserBox'  */}
                {items.map((item) => (
                    <UserBox 
                     key={item.id}
                     data={item}
                    />
                ))}

            </div>
        </aside>
    )
}

export default UserList