import { createSlice } from "@reduxjs/toolkit";

export const User_info = createSlice({
  name: "user_info",
  initialState: {
    Info: [],
  },
  reducers: {
    Adding_info: (state, action) => {
      //   console.log(state.Info);
      console.log(action.payload);
      state.Info.push(action.payload);
    },
  },
});

export const { Adding_info } = User_info.actions;
export default User_info.reducer;
