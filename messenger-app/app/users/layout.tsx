import Sidebar from "../components/sidebar/Sidebar"


export default async function UsersLayout({
    children
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

// defined a common layout for all of our user routes
// different from the root layout 
// created as async because in the future we will use this server component to fetch users 
// directly from the database 