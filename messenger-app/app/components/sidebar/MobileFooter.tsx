'use client'

import useConversation from "../hooks/useConversation"
import useRoutes from "../hooks/useRoutes"
import MobileItem from "./MobileItem"

const MobileFooter = () => {

    const routes = useRoutes()
    const { isOpen } = useConversation()

    // hide mobile footer if user has a active convo going on
    if (isOpen) {
        return null
    }
    
    return (
        <div
         className="
          fixed
          justify-between
          w-full
          bottom-0
          z-40
          flex
          items-center
          bg-white
          border-t-[1px]
          lg:hidden
          "
        >
           {routes.map((route) => (
            <MobileItem
             key={route.href}
             href={route.href}
             active={route.active}
             icon={route.icon}
             onClick={route.onClick}
            />
           ))}
        </div>
    )
}

export default MobileFooter

// dev notes:
// in this page changes the UI when a user is in mobile.
// comparted to desktop when items are on the left side bar,
// now they are at the bottom of the viewport