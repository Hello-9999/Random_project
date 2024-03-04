import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/login_Server";
import { useSelector, useDispatch } from "react-redux";
import addinguserinfo, {
  Adding_info,
} from "../../Redux/Feature/addinguserinfo";
import { useNavigate } from "react-router-dom";

const Admin_login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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

  const handle_signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const User_data = {
          ID: user.uid,

          Name: user.displayName,
          Email: user.email,
          Email_Verfied: user.emailVerified,
          Photo: user.photoURL,
        };
        console.log(User_data, "data");
        dispatch(Adding_info(User_data));
        navigate("/adminhome");
      })
      .catch((error) => {
        const errorCode = error.code;

        console.log(errorCode);
        if ("auth/invalid-credential" == errorCode) {
          console.log("You are not an admin. 🛑");
        } else {
        }
        const errorMessage = error.message;
      });
  };
  return (
    <div className="login_container bg-slate-600 h-screen  ">
      <div className="form w-5/6 m-auto pt-5 md:w-3/5 lg:w-2/5">
        <form
          onSubmit={handle_signin}
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-lg font-bold mb-2 xl:text-xl"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline h-12 required: "
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-lg font-bold mb-2 xl:text-xl"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline h-12  required:"
              id="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <p class="text-red-500 text-xs italic"></p>

            <div className="showPass flex gap-2  items-center">
              <input
                type="checkbox"
                className="size-4"
                onClick={Showpassword}
              />
              <p className="text-black font-medium">Show password</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin_login;
