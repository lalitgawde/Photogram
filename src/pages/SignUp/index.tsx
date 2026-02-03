/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import UserAuthContext from "@/store/UserAuthContext";
import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import image4 from "@/assets/images/image4.jpg";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

type UserSignInTypes = {
  email: string;
  password: string;
  confirmpassword: string;
};

const initialValue: UserSignInTypes = {
  email: "",
  password: "",
  confirmpassword: "",
};

type Props = {
  children?: React.ReactNode;
};

type ErrorTypes = {
  isError: string;
  errMessage: string;
};

const Signup = (_props: Props) => {
  const { signup, signinWithGoogle } = React.useContext(UserAuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorTypes>({
    isError: "",
    errMessage: "",
  });
  const [userInfo, setUserInfo] = React.useState<UserSignInTypes>(initialValue);
  const [loading, setLoading] = React.useState(false);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await signinWithGoogle();
      navigate("/");
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      } else if (userInfo.confirmpassword.trim() === "") {
        setError({
          isError: "confirmpassword",
          errMessage: "Enter a valid confirm password",
        });
      } else if (userInfo.password !== userInfo.confirmpassword) {
        setError({
          isError: "confirmpassword",
          errMessage: "Please enter the same password",
        });
      } else {
        setLoading(true);
        await signup(userInfo.email, userInfo.password);
        setLoading(false);
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
    <>
      {loading && <Loader />}
      <div className="bg-slate-800 w-full min-h-screen flex justify-center items-center px-4 sm:px-6">
        <div className="w-full lg:flex lg:justify-center lg:items-start p-6 sm:p-12 gap-8">
          <div className="hidden lg:block lg:w-3/4">
            <div className="grid grid-cols-2 grid- gap-2">
              <img
                className=" w-2/3 h-auto object-contain aspect-video rounded-3xl place-self-end"
                src={image2}
              />
              <img
                className=" w-2/4 h-auto object-contain aspect-auto rounded-3xl"
                src={image1}
              />
              <img
                className=" w-2/4 h-auto object-contain aspect-auto rounded-3xl place-self-end"
                src={image4}
              />
              <img
                className=" w-2/3 h-auto object-contain aspect-video rounded-3xl"
                src={image3}
              />
            </div>
          </div>
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 mx-auto lg:m-12 rounded-xl border bg-card text-card-foreground shadow-sm">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    PhotoGram
                  </CardTitle>
                  <CardDescription className="pb-4 text-center text-base">
                    Enter your email below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 px-2 sm:px-4">
                  <div className="grid">
                    <Button
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      className="cursor-pointer"
                    >
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dipesh@example.com"
                      value={userInfo.email}
                      onChange={handleInputChange}
                    />
                    {error.isError === "email" && (
                      <p className="text-sm text-red-600">{error.errMessage}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="relative w-full">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative w-full">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className={`border border-gray-300 rounded-md p-2 ${
                            error.isError === "password" ? "mb-2" : ""
                          }`}
                          value={userInfo.password}
                          onChange={handleInputChange}
                        />
                        {error.isError === "password" && (
                          <p className="text-sm text-red-600">
                            {error.errMessage}
                          </p>
                        )}
                        <img
                          src={`${
                            showPassword
                              ? "./images/hidden.png"
                              : "./images/eye.png"
                          }`}
                          alt={`${
                            showPassword
                              ? "./images/hidden.png"
                              : "./images/eye.png"
                          }`}
                          onClick={() => setShowPassword(!showPassword)}
                          className="w-5 h-5 absolute right-4 top-2 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmpassword">Confirm password</Label>
                    <div className="relative w-full">
                      <Input
                        id="confirmpassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className={`border border-gray-300 rounded-md p-2 mb-2`}
                        value={userInfo.confirmpassword}
                        onChange={handleInputChange}
                      />
                      {error.isError === "confirmpassword" && (
                        <p className="text-sm text-red-600">
                          {error.errMessage}
                        </p>
                      )}
                      <img
                        src={`${
                          showConfirmPassword
                            ? "./images/hidden.png"
                            : "./images/eye.png"
                        }`}
                        alt={`${
                          showConfirmPassword
                            ? "./images/hidden.png"
                            : "./images/eye.png"
                        }`}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="w-5 h-5 absolute right-4 top-2 cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col mt-4 px-2 sm:px-4">
                  <Button className="w-full cursor-pointer" type="submit">
                    Sign Up
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
