import React, { useState } from "react";
import { auth } from "../../service/login_Server";
import { useSelector, useDispatch } from "react-redux";
import addinguserinfo, {
  Adding_info,
} from "../../Redux/Feature/addinguserinfo";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  des_Success_Toast,
  error_toast,
  success_Toast,
} from "../../service/Toast_Service";
import { Login_service } from "../../service/Auth_Service";

const Admin_login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Showpassword = (e) => {
    const passText = document.getElementById("password");

    if (passText.type === "password") {
      passText.type = "text";
    } else {
      passText.type = "password";
    }
  };

  const handle_signin = async (e) => {
    e.preventDefault();
    setloading(true);

    const response = await Login_service(email, password);
    try {
      setTimeout(() => {
        if (response) {
          setloading(false);
          des_Success_Toast(
            "Welcome back, Admin",
            "You've successfully logged in."
          );
          const User_data = {
            ID: response.uid,
            isLoggedin: true,
            Name: response.displayName,
            Email: response.email,
            Email_Verfied: response.emailVerified,
            Photo: response.photoURL,
          };
          dispatch(Adding_info(User_data));
          navigate("/admin/home");
        } else {
          setloading(false);
        }
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setloading(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="login_container bg-slate-600 h-screen  relative">
        <div
          className="w-5/6 m-auto pt-5 md:w-3/5 lg:w-2/5 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input absolute left-0 right-0 top-6 md:top-16 lg:top-25"
          style={{ backgroundColor: "#333333" }}
        >
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to the Phoenix IT Club Admin Portal
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Please enter your credentials to access the admin dashboard. If you
            experience any issues, contact support for assistance.
          </p>
          <form onSubmit={handle_signin} class="my-8">
            <div class="mb-4">
              <label
                class="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3"
                for="email"
              >
                Email
              </label>
              <input
                class="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
              file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
              focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
               disabled:cursor-not-allowed disabled:opacity-50
               dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
               group-hover/input:shadow-none transition duration-400 mt-2"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div class="mb-5">
              <label
                class="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3"
                for="password"
              >
                Password
              </label>
              <input
                class="mt-2 flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
              file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
              focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
               disabled:cursor-not-allowed disabled:opacity-50
               dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
               group-hover/input:shadow-none transition duration-400 "
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
              <p class="text-red-500 text-xs italic"></p>

              <div className="showPass flex gap-2  items-center mt-3">
                <input
                  type="checkbox"
                  className="size-4"
                  onClick={Showpassword}
                />
                <p className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                  Show password
                </p>
              </div>
            </div>
            <div class="flex items-center  w-full md:w-3/4 lg:w-10/12 justify-between m-auto">
              {!loading ? (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-full"
                  type="submit"
                >
                  Sign In
                </button>
              ) : (
                <button
                  class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-full cursor-wait animate-pulse mt-3"
                  disabled
                >
                  Please Wait ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin_login;
