import React from "react";
import Sidebar from "../SideBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      <aside className="flex gap-x-4 bg-gray-800 fixed top-0 left-0 h-screen z-40">
        <Sidebar />
      </aside>
      <section className="flex-1">{children}</section>
      <aside></aside>
    </div>
  );
};

export default Layout;
