import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="h-[61px] w-full flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-gray-900">Expense Tracker</h1>
      <div className="flex items-center gap-4">
        {user?.fullName && <span className="text-gray-700 font-medium">{user.fullName}</span>}
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
