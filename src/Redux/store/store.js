import { configureStore } from "@reduxjs/toolkit";
import addinguserinfo from "../Feature/addinguserinfo";

export const store = configureStore({
  reducer: {
    User_info: addinguserinfo,
  },
});
