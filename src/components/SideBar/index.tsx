import React, { useContext } from "react";
import homeIcon from "@/assets/icons/home.svg";
import addIcon from "@/assets/icons/add.svg";
import directIcon from "@/assets/icons/direct.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import myphotoIcon from "@/assets/icons/myphotos.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import notificationIcon from "@/assets/icons/notification.svg";
import profileIcon from "@/assets/icons/profile.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserAuthContext from "@/store/UserAuthContext";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Add Photos",
    link: "/create-post",
    icon: addIcon,
  },
  {
    name: "My Photos",
    link: "/my-photos",
    icon: myphotoIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: profileIcon,
  },
  {
    name: "Notifications",
    link: "#",
    icon: notificationIcon,
  },
  {
    name: "Direct",
    link: "#",
    icon: directIcon,
  },
  {
    name: "Settings",
    link: "#",
    icon: settingsIcon,
  },
  {
    name: "Logout",
    link: "/logout",
    icon: logoutIcon,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(UserAuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-col items-center gap-8">
      <div>
        <h1 className="text-white text-2xl font-bold">PhotoGram</h1>
      </div>
      <ul className="w-full">
        {navItems.map((item) => {
          const classes =
            pathname === item.link
              ? "bg-white text-slate-900 rounded-none"
              : "hover:bg-slate-950 text-white hover:text-white bg-transparent rounded-none";

          return item.name === "Logout" ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-1 my-4 text-white hover:bg-slate-950 w-full cursor-pointer"
              >
                <img
                  src={logoutIcon}
                  alt={item.name}
                  className="h-5 w-5 sm:h-8 sm:w-8 invert"
                />
                <span className="text-[14px] sm:text-[20px] font-semibold">
                  {item.name}
                </span>
              </button>
            </li>
          ) : (
            <Link to={item.link}>
              <li
                className={`flex items-center justify-start gap-3 px-4 py-1 my-4 cursor-pointer ${classes}`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="h-5 w-5 sm:h-8 sm:w-8 object-contain text-white"
                  style={{
                    filter: `${
                      pathname === item.link ? "invert(0)" : "invert(1)"
                    }`,
                  }}
                />
                <h2 className="text-[14px] md:text-[20px] font-semibold">
                  {item.name}
                </h2>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
