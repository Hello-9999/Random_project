import React from "react";
import Admin_Navbar from "./Admin_Navbar";

const Admin_blog = () => {
  const blogs_st =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";

  return (
    <div>
      {" "}
      <Admin_Navbar blogs_st={blogs_st} />
      Admin_blog
    </div>
  );
};

export default Admin_blog;
