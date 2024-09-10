import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecommondedUser = () => {
  const { user } = useCurrentUser();
  return (
    <div
      className={`${
        user?.recommondedUsers?.length ? "block" : "hidden"
      } bg-slate-800 ml-10 w-full p-4 rounded-xl mt-5`}
    >
      <h1 className="text-xl pb-2 pr-3">Users you may know</h1>
      {user?.recommondedUsers?.map((recommededUser:any) => (
        <div
          key={recommededUser?.id}
          className="flex items-center justify-between gap-4 bg-slate-900 py-3 px-6 rounded-full my-2"
        >
          <Image
            className="rounded-full"
            src={recommededUser?.avatar || "/profile.jpg"}
            width={40}
            height={40}
            alt="Pic"
          />
          <h1 className="text-lg text-nowrap overflow-hidden">{recommededUser?.name}</h1>
          <Link
            className="rounded-md px-2 py-1 bg-white text-slate-700 font-semibold"
            href={`/${recommededUser?.id}`}
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecommondedUser;
