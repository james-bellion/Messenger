"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // handel click function pointing to an api call
  const handelClick = useCallback(() => {
    setIsLoading(true);

    // initeise an axios post call to /api/conversations route
    // in the body element we are sending the user id that we are starting the conversation with
    // ** summery: click on the user eg dave > start a convo with Dave **
    axios
      .post("/api/conversations", {
        // in the body pass in
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      onClick={handelClick}
      className="
        w-full
        relative
        flex
        items-center
        space-x-3
        bg-white
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        "
    >
      {/* pass the users as data. our data prop in this file >
             if you look at the UserList Compoent the items are the users 
             so we know that the data here is the actual user */}
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div 
          className="
           flex
           justify-between
           items-center
           mb-1
           ">
              <p
              className="
               text-sm
               font-medium
               text-gray-900
              ">
                {data.name}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
