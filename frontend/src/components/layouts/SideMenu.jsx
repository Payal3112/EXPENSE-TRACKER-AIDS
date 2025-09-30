import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div
      className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 overflow-y-auto"
    >
      {/* Profile */}
      {user && (user.fullName || user.profileImageUrl) && (
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <CharAvatar
              fullName={user.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
          {user.fullName && (
            <h5 className="text-gray-950 font-medium leading-6">
              {user.fullName}
            </h5>
          )}
        </div>
      )}

      {/* Menu */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${
            activeMenu === item.label.toLowerCase()
              ? "text-white bg-purple-600"
              : "text-gray-700 hover:bg-purple-100"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
