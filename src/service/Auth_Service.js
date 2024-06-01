import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./login_Server";
import { error_toast } from "./Toast_Service";

export const Login_service = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response.user;
  } catch (error) {
    setTimeout(() => {
      error_toast(error.code);
    }, 3000);
  }
};
