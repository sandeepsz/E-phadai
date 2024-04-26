import React from "react";
import Logo from "./logo";
import SidebarLinks from "./sidebar-links";

const Sidebar = () => {
  return (
    <div className="h-full  flex flex-col overflow-y-auto bg-white shadow-sm border-r">
      <div className="flex p-6 gap-2">
        <Logo />
        <span className="font-bold text-2xl text-[#5417d7]">E-Padhai</span>
      </div>
      <div className="flex flex-col w-full">
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
