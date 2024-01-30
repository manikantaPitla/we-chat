import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";
import chatReducer from "../features/chatReducer";
import messagesReducer from "../features/messagesReducer";
import themeReducer from "../features/themeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messagesReducer,
    theme: themeReducer,
  },
});

export default store;
