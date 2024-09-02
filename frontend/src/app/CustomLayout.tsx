"use client"
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const CutomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname()
  if (pathname === "/login" || pathname === "/signup") {
    return children;
  } else {
    return (
      <div className="grid grid-cols-7 h-screen">
        <div className="col-span-2"><Sidebar /></div>
        <div className="col-span-3 h-screen border-l border-r overflow-hidden overflow-y-scroll no-scrollbar border-slate-500">{children}</div>
        <div className="col-span-2"></div>
      </div>
    );
  }
};

export default CutomeLayout;
