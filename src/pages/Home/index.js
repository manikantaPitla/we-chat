import React, { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import UpdateProfile from "../../components/UpdateProfile";
import SideBar from "../../components/SideBar";
import Profile from "../../components/Profile";
import ChatBox from "../../components/ChatBox";

import { useSelector } from "react-redux";
import { useWindowWidth } from "../../context/widthContext";
import { setUserOnlineStatus } from "../../utils/firebaseUtils";

import { MainContainer, StyledPopUp, FlexColumn } from "./styledComponent";
import "reactjs-popup/dist/index.css";

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    setModalVisible(false);

    if (user && user.photoURL === null) {
      setModalVisible(true);
    }
  }, [user]);

  //   useEffect(() => {
  //     console.log("LOADING HOME");
  //     setUserOnlineStatus(user.uid, true);

  //     const handleWindowClose = () => {
  //       setUserOnlineStatus(user.uid, false);
  //     };

  //     window.addEventListener("unload", handleWindowClose);

  //     return () => {
  //       console.log("UNLOADING HOME");
  //       setUserOnlineStatus(user.uid, false);
  //       window.removeEventListener("unload", handleWindowClose);
  //     };
  //   }, [user.uid]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setUserOnlineStatus(user.uid, false);
      } else {
        setUserOnlineStatus(user.uid, true);
      }
    };

    const handleWindowClose = () => {
      setUserOnlineStatus(user.uid, false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("load", setUserOnlineStatus(user.uid, true));
    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("beforeunload", handleWindowClose);
    };
  }, [user.uid]);

  return (
    <MainContainer>
      <StyledPopUp
        modal
        open={isModalVisible}
        onClose={() => setModalVisible(false)}
        closeOnDocumentClick={false}
      >
        {(close) => <UpdateProfile closeModal={close} />}
      </StyledPopUp>
      {windowWidth <= 500 ? (
        <div style={{ display: "flex", gap: 10, order: 2 }}>
          <Profile />
          <SideMenu />
        </div>
      ) : (
        <SideMenu />
      )}

      <FlexColumn>
        <SideBar />
        {windowWidth > 500 && <Profile />}
      </FlexColumn>
      {windowWidth > 768 && <ChatBox />}
    </MainContainer>
  );
}

export default Home;
