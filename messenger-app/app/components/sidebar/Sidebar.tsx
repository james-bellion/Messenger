import DesktopSidebar from "./DesktopSidebar"

async function Sidebar({ children }: {
    children: React.ReactNode
}) { //opens the function
    return (
        <div className="h-full">
            <DesktopSidebar />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar
