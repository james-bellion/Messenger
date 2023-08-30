import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // as this is an async server component, we can call getUsers in here
  // without the need for an api call
  // can pass *const users* to a new component called UserList and pass in items={users}
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}

// defined a common layout for all of our user routes
// different from the root layout
// created as async because in the future we will use this server component to fetch users
// directly from the database
