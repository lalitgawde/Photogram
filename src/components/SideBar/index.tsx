import React from "react";
import homeIcon from "@/assets/icons/home.svg";
import addIcon from "@/assets/icons/add.svg";
import directIcon from "@/assets/icons/direct.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import myphotoIcon from "@/assets/icons/myphotos.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import notificationIcon from "@/assets/icons/notification.svg";
import profileIcon from "@/assets/icons/profile.svg";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon,
  },
  {
    name: "My Photos",
    link: "/myphotos",
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
  return <div>Sidebar</div>;
};

export default Sidebar;
