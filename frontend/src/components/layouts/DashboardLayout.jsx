import React, { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeMenu = location.pathname.split("/")[2] || "dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Sidebar drawer for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Side menu */}
            <div className="relative z-50">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-5">
          {user ? (
            <Outlet /> // Nested pages render here
          ) : (
            <p className="text-gray-500">Please log in to continue.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
