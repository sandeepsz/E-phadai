import React from "react";
import NavbarLinks from "@/components/navbar-routes";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  return (
    <div className=" p-4 border-b flex items-center bg-white shadow-sm">
      <MobileMenu />
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
