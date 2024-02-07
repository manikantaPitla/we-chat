import React from "react";
import UpdateProfile from "../UpdateProfile";
import { useSelector } from "react-redux";
import { MainContainer, StyledPopUp } from "./styledComponent";
import { useWindowWidth } from "../../context/widthContext";
import { handleErrImage } from "../../utils/componentUtils";

function Profile() {
  const currentUser = useSelector((state) => state.auth.user);
  const windowWidth = useWindowWidth();

  return (
    <StyledPopUp
      modal
      trigger={
        <MainContainer>
          {currentUser && (
            <>
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                onError={handleErrImage}
                loading="lazy"
              />
              {windowWidth > 500 && (
                <div>
                  <h1>{currentUser.displayName}</h1>
                  <p>{currentUser.email}</p>
                </div>
              )}
            </>
          )}
        </MainContainer>
      }
    >
      {(close) => <UpdateProfile closeModal={close} />}
    </StyledPopUp>
  );
}

export default Profile;
