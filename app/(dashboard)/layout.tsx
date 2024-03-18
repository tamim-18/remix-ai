import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-blue-50">
        <Sidebar />
      </div>
      <main className=" md:pl-72 pb-10">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardLayout;
