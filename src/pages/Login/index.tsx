/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icons } from "@/components/ui/icons";
import UserAuthContext from "../../store/UserAuthContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

type LogInTypes = {
  email: string;
  password: string;
};

const initialValue: LogInTypes = {
  email: "",
  password: "",
};

type Props = {
  children?: React.ReactNode;
};

type ErrorTypes = {
  isError: string;
  errMessage: string;
};

const Login = (_props: Props) => {
  const { login, signinWithGoogle } = React.useContext(UserAuthContext);
  const [error, setError] = React.useState<ErrorTypes>({
    isError: "",
    errMessage: "",
  });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState<LogInTypes>(initialValue);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await signinWithGoogle();
      navigate("/");
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (userInfo.email.trim() === "") {
        setError({
          isError: "email",
          errMessage: "Enter a valid email",
        });
      } else if (userInfo.password.trim() === "") {
        setError({
          isError: "password",
          errMessage: "Enter a valid password",
        });
      } else {
        console.log("The user info is : ", userInfo);
        await login(userInfo.email, userInfo.password);
        navigate("/");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error.isError) {
      setError({ isError: "", errMessage: "" });
    }
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-800 text-[#171717]">
      <div className="bg-white sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center border-2 border-gray-500 py-8 rounded-lg gap-6 mx-4 sm:mx-0">
        <div className="w-full flex flex-col sm:flex-row justify-center items-start sm:justify-between gap-4 px-6 sm:px-12">
          <div className="w-2/3 flex flex-col justify-center gap-1">
            <h3 className="text-base font-semibold text-[#171717]">
              Login to your account
            </h3>
            <p className="text-sm font-normal text-gray-600 text-wrap">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="align-middle">
            <Link
              to="/signup"
              className="text-[#171717] align-middle hidden sm:block hover:cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center gap-4 px-6 sm:px-12">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="demo@example.com"
              value={userInfo.email}
              className={`border border-gray-300 rounded-md ${
                error.isError === "email" ? "px-2 pt-2" : "p-2 mb-4"
              }`}
              onChange={handleInputChange}
            />
            {error.isError === "email" && (
              <p className="text-sm text-red-600">{error.errMessage}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label htmlFor="password">Password</label>
              <p className="text-[#171717] hover:cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="relative w-full">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={userInfo.password}
                className={`border border-gray-300 rounded-md p-2 ${
                  error.isError === "password" ? "mb-2" : "mb-4"
                }`}
                onChange={handleInputChange}
              />
              {error.isError === "password" && (
                <p className="text-sm text-red-600">{error.errMessage}</p>
              )}
              <img
                src={`${
                  showPassword ? "./images/hidden.png" : "./images/eye.png"
                }`}
                alt={`${
                  showPassword ? "./images/hidden.png" : "./images/eye.png"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                className="w-5 h-5 absolute right-4 top-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="w-full px-6 sm:px-12 gap-4 flex flex-col">
          <button
            className="w-full bg-[#171717] text-white py-2 rounded-md hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            className="w-full bg-white border-2 border-slate-200 text-[#171717] py-2 rounded-md flex justify-center items-center hover:cursor-pointer hover:bg-gray-200"
            onClick={handleGoogleSignIn}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Login with Google
          </button>
          <p className="text-center sm:hidden">
            Don't have an account ?{" "}
            <Link
              to="/signup"
              className="text-[#171717] hover:cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
