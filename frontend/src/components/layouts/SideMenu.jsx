import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-6">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            {user?.fullName?.charAt(0) || "U"}
          </div>
        )}
        <h5 className="text-sm font-medium text-gray-800">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      {/* Side Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] p-3 px-6 rounded-lg mb-3 transition-colors ${
            activeMenu === item.label
              ? "text-white bg-primary"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
