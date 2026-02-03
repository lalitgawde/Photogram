import React from "react";
import NavBar from "../NavBar";
import Sidebar from "../SideBar";

type Props = {
  children: React.ReactNode;
};
// h-[calc(100vh-4rem)]
const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main>
        <div className="flex">
          <aside className="hidden sm:block bg-gray-800 px-6 py-4 w-1/3 lg:w-1/4 xl:w-1/5 h-screen z-40">
            <Sidebar />
          </aside>
          <section className="flex-1 px-6 py-4">{children}</section>
          <aside className="hidden lg-block bg-gray-800 w-1/6 h-screen z-40">
            UserList
          </aside>
        </div>
      </main>
    </>
  );
};

export default Layout;
