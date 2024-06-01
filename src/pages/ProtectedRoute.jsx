import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { error_toast } from "../service/Toast_Service";

const ProtectedRoute = () => {
  const loggin_details = useSelector((state) => state.User_info);
  const isLoggedIn = loggin_details.Info[0];
  const navigate = useNavigate();
  console.log(Boolean(isLoggedIn), "r");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/iamadmin");
      error_toast("🛑 Admin Access Only! 🙌");
    }
  });
  return (
    <>
      {!isLoggedIn ? (
        <>
          {" "}
          {navigate("/iamadmin")} {}{" "}
        </>
      ) : (
        <>
          <Outlet />{" "}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
