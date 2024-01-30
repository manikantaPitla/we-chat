import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messageList: [],
};

const messageReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messageList = action.payload;
    },

    addMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    updateMessage: (state, action) => {
      const index = state.messageList.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.messageList[index] = action.payload;
      }
    },
  },
});

export const { addMessage, updateMessage, setMessages } =
  messageReducer.actions;
export default messageReducer.reducer;
