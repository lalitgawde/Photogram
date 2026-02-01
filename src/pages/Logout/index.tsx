import LogOutIcon from "@/assets/images/logout.png";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-[#171717]">
      <div className="bg-white rounded-xl p-8 text-center shadow-lg w-96 mx-4 sm:mx-0">
        <img
          src={LogOutIcon}
          alt="Logo"
          className=" w-30 h-35 sm:w-50 sm:h-45 lg:w-60 lg:h-50 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          You are Logged Out
        </h1>
        <p className="text-sm sm:text-lg text-gray-700">
          You have been successfully logged out.
        </p>
        <p className="text-sm sm:text-lg mt-2 sm:mt-0 text-gray-700">
          Thanks for using PhotoGram.
        </p>
        <div className="mt-4 text-center">
          <button
            className="bg-black text-white font-bold py-2 px-8 rounded-4xl cursor-pointer"
            onClick={handleLoginRedirect}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
