import React, { useState } from "react";
import Sidebar from "../SideBar";

const NavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 sm:px-6 sm:py-4 bg-gray-800">
        <div className="flex items-center gap-2">
          <button
            className="text-3xl sm:text-4xl mb-1 text-white sm:hidden"
            aria-label="Open menu"
            onClick={() => setIsSideBarOpen((prevState) => !prevState)}
          >
            ≡
          </button>
          <h1 className="text-white text:xl md:text-2xl font-bold">
            PhotoGram
          </h1>
        </div>
        {isSideBarOpen && (
          <aside className="fixed top-0 left-0 bg-gray-800 px-6 py-4 w-1/2 h-screen z-40">
            <div className="mb-8 mr-2 text-right">
              <button
                className="text-2xl text-white"
                onClick={() => setIsSideBarOpen((prevState) => !prevState)}
              >
                ✕
              </button>
            </div>
            <Sidebar />
          </aside>
        )}
        <div></div>
        <div></div>
      </header>
      {/* <aside className="hidden sm:block fixed top-16 left-0 bg-gray-800 px-6 py-4 w-1/5 h-[calc(100vh-4rem)] z-40">
        <Sidebar />
      </aside> */}
    </>
  );
};

export default NavBar;
