import { createSlice } from "@reduxjs/toolkit";

const weChatTheme = JSON.parse(localStorage.getItem("weChatTheme"));
const initialState = {
  theme: (weChatTheme && weChatTheme.theme) || "DARK",
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeReducer.actions;
export default themeReducer.reducer;
