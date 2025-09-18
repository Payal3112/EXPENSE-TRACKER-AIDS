import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // activeMenu for sidebar highlight
  const activeMenu = location.pathname.split("/")[2] || "dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideMenu activeMenu={activeMenu} />
        <div className="flex-1 p-5">
          {user ? (
            <Outlet /> // nested pages render here
          ) : (
            <p className="text-gray-500">Please log in to continue.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
