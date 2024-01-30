import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import ChatBox from "./components/ChatBox";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const pageTheme = useSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <div
        className={pageTheme.theme === "LIGHT" ? "light-theme" : "dark-theme"}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="chats/:chatId"
            element={
              <ProtectedRoute>
                <ChatBox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth"
            element={
              <UnProtectedRoute>
                <Auth />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <UnProtectedRoute>
                <SignIn />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer limit={0} />
        <div id="popup-root"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
