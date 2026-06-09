"use client"

import DashboardSideBar from "@/components/DashboardSidebar";


const DashboardLayout = ({ children }) => {

  return (
    <div className="min-h-screen flex bg-[#080c16]">
      <DashboardSideBar />
      <div className="px-5 py-10 max-w-5xl max-full">
        {children}
      </div>
    </div>
  );
};


export default DashboardLayout;