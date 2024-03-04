import React from "react";
import Admin_Navbar from "./Admin_Navbar";

const Admin_gallery = () => {
  const gallery_st =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";

  return (
    <div>
      {" "}
      <Admin_Navbar gallery_st={gallery_st} />
      Admin_gallery
    </div>
  );
};

export default Admin_gallery;
