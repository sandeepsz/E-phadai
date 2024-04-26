import React from "react";
import Sidebar from "./_components/side-bar";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className=" md:pl-[14rem] h-[50px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex h-full w-56 fixed flex-col inset-y-0 z-50 ">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[65px] h-full ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
