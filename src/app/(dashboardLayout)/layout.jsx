"use client"

import DashboardSideBar from "@/components/DashboardSidebar";
import { Toaster } from "react-hot-toast";


const DashboardLayout = ({ children }) => {

  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSideBar />
      <div className="flex-1 min-w-0 overflow-x-auto px-5 py-10">
        {children}
        <Toaster />
      </div>
    </div>
  );
};


export default DashboardLayout;