import React, { useState, useEffect } from "react";
import {
  MainContainer,
  MenuItemContainer,
  MenuItem,
  LogoutContainer,
  StyledPopUp,
} from "./styledComponent";
import { useNavigate, Link } from "react-router-dom";
import PageLogo from "../../assets/svg/page-logo.svg";
import { Logout, Messages1, Moon, Sun1 } from "iconsax-react";
import { signOutUser } from "../../firebase";
import { removeUser } from "../../features/authReducer";
import { clearCurrentChat } from "../../features/chatReducer";
import { useDispatch } from "react-redux";
import { setTheme } from "../../features/themeReducer";

import "reactjs-popup/dist/index.css";
import { auth } from "../../firebase";

function SideMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weChatTheme = localStorage.getItem("weChatTheme");
  const defaultSettings = { theme: "DARK" };
  const storage = weChatTheme ? JSON.parse(weChatTheme) : defaultSettings;

  const [pageTheme, setPageTheme] = useState(storage.theme);

  const logOut = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await signOutUser();
        dispatch(removeUser());
        dispatch(clearCurrentChat());
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    const handleDarkMode = () => {
      dispatch(setTheme(pageTheme));
      localStorage.setItem("weChatTheme", JSON.stringify({ theme: pageTheme }));
    };

    handleDarkMode();
  }, [pageTheme, dispatch]);

  return (
    <MainContainer>
      <div>
        <Link to="/">
          <img className="page-logo" src={PageLogo} alt="logo" />
        </Link>
      </div>
      <MenuItemContainer>
        <MenuItem className="active">
          <Messages1 size={18} />
        </MenuItem>
        <MenuItem
          onClick={() =>
            setPageTheme((prev) => (prev === "DARK" ? "LIGHT" : "DARK"))
          }
        >
          {pageTheme === "DARK" ? <Sun1 size={18} /> : <Moon size={18} />}
        </MenuItem>
        <StyledPopUp
          modal
          trigger={
            <MenuItem title="Logout">
              <Logout size={18} />
            </MenuItem>
          }
        >
          {(close) => (
            <LogoutContainer>
              <p>Are you sure you want to log out?</p>
              <div>
                <button onClick={close}>Cancel</button>
                <button onClick={logOut}>Logout</button>
              </div>
            </LogoutContainer>
          )}
        </StyledPopUp>
      </MenuItemContainer>
    </MainContainer>
  );
}

export default SideMenu;
