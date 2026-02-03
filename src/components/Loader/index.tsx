import React from "react";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-10" />
      <div className="fixed inset-0 z-20 h-screen flex flex-col justify-center items-center">
        <div className="h-15 w-15 animate-spin rounded-full border-6 border-gray-300 border-t-blue-500"></div>
        <div className="mt-2 ml-2 text-lg">Loading...</div>
      </div>
    </>
  );
};

export default Loader;
