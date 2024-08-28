import React from "react";
import { BiBell, BiHash, BiHomeCircle, BiMessageMinus } from "react-icons/bi";
import { RxBookmark } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

interface TwitterSidebarButton {
  title: String;
  icon: React.ReactNode;
}

const sidebarItem: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BiBell />,
  },
  {
    title: "Messages",
    icon: <BiMessageMinus />,
  },
  {
    title: "Bookmarks",
    icon: <RxBookmark />,
  },
  {
    title: "Profile",
    icon: <FaRegUser />,
  }, {
    title: "More",
    icon: <MdMoreHoriz />,
  },
];

const Sidebar = () => {
  return (
    <div className="flex justify-end">
      <div className="pr-20 pt-5">
        <div className="text-3xl hover:bg-slate-900 w-fit p-3 rounded-full cursor-pointer transition-all">
          <FaTwitter />
        </div>
        {sidebarItem.map((item, i) => (
          <div className="flex items-center text-xl gap-2 mt-3 hover:bg-slate-900 w-fit px-4 py-2 rounded-full cursor-pointer transition-all" key={i}>
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
        <button className="bg-blue-500 font-bold px-20 py-3 rounded-full mt-5">Post</button>
      </div>
    </div>
  );
};

export default Sidebar;
