import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: null },
  reducers: {
    signin(state, action) {
      state.value = action.payload
    },
    signout(state) {
      state.value = null
    },
  },
});

export const userAction = userSlice.actions;


export default userSlice.reducer;
