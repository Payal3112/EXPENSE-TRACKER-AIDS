import React from "react";
import { Menu } from "lucide-react"; // or your icon library

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="h-[61px] flex items-center justify-between px-5 border-b border-gray-200 bg-white">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg">Expense Tracker</h1>
      </div>

      {/* Right: (optional user info / actions) */}
      <div className="flex items-center gap-4">
        {/* Example placeholder */}
      </div>
    </div>
  );
};

export default Navbar;
