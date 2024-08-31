import React, { type ReactNode } from "react";
import SideNav from "./SideNav";

const AdminLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-1/5">
          <SideNav />
        </div>
        <div className="w-4/5 ">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
