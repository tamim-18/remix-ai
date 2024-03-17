import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className=" flex items-center p-4 ">
      <Button className="md:hidden" variant="ghost" size="icon">
        <Menu />
      </Button>
      <div className=" flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;