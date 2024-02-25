import React from "react";

const Admin_Navbar = () => {
  return (
    <div className="nav-bar flex w-screen  justify-between items-center text-slate-200 bg-slate-700 h-16 p-3">
      <div className="logo w-2/4"> CLUB</div>

      <div className="small_menu md:hidden w-2/4  ">
        <button className="float-right"> menu</button>
      </div>
      <div className="menu"></div>
    </div>
  );
};

export default Admin_Navbar;
