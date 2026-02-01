import React from "react";
import { useNavigate } from "react-router-dom";
import pagenotfound from "@/assets/images/pageNotFound.png";

const NotFoundErrorPage = () => {
  const navigate = useNavigate();
  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-[#171717]">
      <div className="bg-white rounded-xl p-8 text-center shadow-lg w-96 mx-4 sm:mx-0">
        <img
          src={pagenotfound}
          alt="Logo"
          className="w-45 h-35 sm:w-65 sm:h-45 rounded-2xl mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          404 - Page Not Found
        </h1>
        <p className="text-sm sm:text-lg text-gray-700">
          The page you are looking for does not exist.
        </p>
        <div className="mt-4 text-center">
          <button
            className="bg-black text-white font-bold py-2 px-8 rounded-4xl cursor-pointer"
            onClick={handleHomeRedirect}
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundErrorPage;
