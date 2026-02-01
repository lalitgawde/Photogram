import React from "react";
import { useNavigate } from "react-router-dom";
import alertImage from "@/assets/images/alert.png";

const Error = () => {
  const navigate = useNavigate();
  const handleHomeRedirect = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center h-screen  text-[#171717]">
      <div className="p-8 text-center mx-4 sm:mx-0">
        <img
          src={alertImage}
          alt="Logo"
          className="w-45 h-35 sm:w-40 sm:h-45 rounded-2xl mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Something went wrong
        </h1>
        <p className="text-base font-normal sm:text-2xl text-gray-700">
          Please try again later.
        </p>
        <div className="mt-6 text-center">
          <button
            className="bg-black text-white font-bold py-2 px-6 rounded-4xl cursor-pointer"
            onClick={handleHomeRedirect}
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
