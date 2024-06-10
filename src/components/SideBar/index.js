import React, { useEffect, useState, useCallback } from "react";
import {
  MainContainer,
  ButtonContainer,
  SearchContainer,
  TopFlex,
  UserChatList,
  NoUserChats,
  ErrorMessage,
  StyledPopUp,
} from "./styledComponent";

import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { getUserChats, generateCombineId } from "../../utils/firebaseUtils";
import {
  getTime,
  PageLoader,
  resizeLastMessage,
  handleErrImage,
} from "../../utils/componentUtils";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChat, clearCurrentChat } from "../../features/chatReducer";
import { useWindowWidth } from "../../context/widthContext";
import { useNavigate } from "react-router-dom";
import AddNewChat from "../AddNewChat";
import "reactjs-popup/dist/index.css";

function SideBar() {
  const [usersList, setUsersList] = useState([]);
  const [searchUser, searchUserList] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat.user);

  const dispatch = useDispatch();

  const getChats = useCallback(() => {
    setLoading(true);
    try {
      const unSub = getUserChats(currentUser.uid, setUsersList, setLoading);
      return () => {
        unSub();
      };
    } catch (e) {
      setErrorMsg("Something went wrong, please try again!");
      setLoading(false);
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    currentUser.uid && getChats();
  }, [currentUser, getChats]);

  const filteredUserList = Object.entries(usersList).filter((eachUser) => {
    return eachUser[1].userInfo.displayName
      .toLowerCase()
      .includes(searchUser.toLowerCase());
  });

  return (
    <MainContainer>
      <TopFlex>
        <SearchContainer>
          <CiSearch />
          <input
            type="search"
            placeholder="Search"
            value={searchUser}
            onChange={(e) => searchUserList(e.target.value)}
          />
        </SearchContainer>
        <StyledPopUp
          modal
          trigger={
            <ButtonContainer>
              <IoAddOutline />
              <p>Start New Chat</p>
            </ButtonContainer>
          }
        >
          {(close) => <AddNewChat closeModal={close} />}
        </StyledPopUp>

        <hr />
      </TopFlex>
      <UserChatList>
        {loading ? (
          <PageLoader relative={true} />
        ) : errorMsg ? (
          <ErrorMessage>
            <p>{errorMsg}</p>
            <button type="button" onClick={() => getChats()}>
              Retry
            </button>
          </ErrorMessage>
        ) : usersList.length !== 0 ? (
          <>
            {filteredUserList.length > 0 ? (
              filteredUserList
                .filter(
                  (user) =>
                    user[1].date !== null && user[1].date.seconds !== null
                )
                .sort((a, b) => b[1].date.seconds - a[1].date.seconds)
                .map((user) => {
                  const { date, userInfo, lastMessage } = user[1];
                  const { uid, displayName, photoURL } = userInfo;

                  const time = getTime(date);

                  return (
                    <li
                      key={uid}
                      onClick={() => {
                        if (windowWidth > 768) {
                          dispatch(clearCurrentChat());
                          dispatch(
                            setCurrentChat({ user: userInfo, currentUser })
                          );
                        } else {
                          const combinedId = generateCombineId(
                            currentUser.uid,
                            uid
                          );

                          navigate(`chats/${combinedId}?u_id=${uid}`);
                        }
                      }}
                      className={`${uid === currentChat?.uid ? "active" : ""}`}
                    >
                      <img
                        src={photoURL}
                        alt={displayName}
                        onError={handleErrImage}
                        loading="lazy"
                      />
                      <div>
                        <h1>{displayName}</h1>
                        <p>
                          {lastMessage?.text &&
                            resizeLastMessage(lastMessage?.text)}
                        </p>
                      </div>
                      <p>{time}</p>
                    </li>
                  );
                })
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  marginTop: 20,
                }}
              >
                No chats found
              </p>
            )}
          </>
        ) : (
          <NoUserChats>
            <p>
              No friends yet? Let's change that!
              <br /> Add friends to start chatting.
            </p>
          </NoUserChats>
        )}
      </UserChatList>
    </MainContainer>
  );
}

export default SideBar;
