import { createSlice } from "@reduxjs/toolkit";

export const User_info = createSlice({
  name: "user_info",
  initialState: {
    Info: [{ name: "asdasd" }],
  },
  reducers: {
    Adding_info: (state, action) => {
      //   console.log(state.Info);
      console.log(action.payload);
    },
  },
});

export const { Adding_info } = User_info.actions;
export default User_info.reducer;
