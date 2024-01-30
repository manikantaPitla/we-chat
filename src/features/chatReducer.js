import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  chatId: null,
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      const { user, currentUser } = action.payload;

      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      state.user = user;
      state.chatId = combinedId;
    },

    clearCurrentChat: (state) => {
      state.user = {};
      state.chatId = null;
    },
  },
});

export const { setCurrentChat, clearCurrentChat } = chatReducer.actions;
export default chatReducer.reducer;
