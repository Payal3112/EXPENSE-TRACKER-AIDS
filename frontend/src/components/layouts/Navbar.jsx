import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <div className="flex gap-5 bg-white border-b border-gray-300 p-4 items-center justify-between">
      <button
        className="block lg:hidden text-black text-2xl"
        onClick={toggleSideMenu}
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
