import React, { useState, useEffect } from "react";
import ChatBody from "../ChatBody";
import ChatInput from "../ChatInput";
import {
  MainContainer,
  Header,
  DefaultPage,
  DevContact,
  HeaderMenu,
  DeletePopUp,
  StyledPopUp,
  PreviewPopup,
  MediaPopContainer,
} from "./styledComponent";
import { PageLoader, handleErrImage } from "../../utils/componentUtils";
import { useSelector, useDispatch } from "react-redux";

import chatWaitingImg from "../../assets/svg/chat-waiting.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import {
  clearChat,
  updateLastMessage,
  getUser,
} from "../../utils/firebaseUtils";
import { useWindowWidth } from "../../context/widthContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { clearCurrentChat } from "../../features/chatReducer";

function ChatBox() {
  const currentUser = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat);
  const { user, chatId } = currentChat;
  const [isModalOpen, setModalOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const windowWidth = useWindowWidth();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("u_id");

  const params = useParams();
  const urlChatId = params.chatId;

  const currentChatId = windowWidth > 768 ? chatId : urlChatId;

  useEffect(() => {
    dispatch(clearCurrentChat());

    return () => {
      dispatch(clearCurrentChat());
    };
  }, [dispatch]);

  useEffect(() => {
    if (windowWidth > 768 && Object.keys(user).length === 0) {
      navigate("/");
      return;
    }

    if (windowWidth <= 768) {
      const getChatUser = async () => {
        try {
          const userData = await getUser(userId);
          setChatUser(userData);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };

      getChatUser();
    } else {
      setLoading(false);
      if (user) {
        setChatUser(user);
      }
    }
  }, [windowWidth, navigate, userId, user]);

  const handleClearChat = async () => {
    try {
      await clearChat(currentChatId);
      await updateLastMessage(currentUser.uid, chatUser, currentChatId, "");

      setModalOpen(false);
    } catch (error) {
      console.log(error);
      setModalOpen(false);
    }
  };

  return (
    <MainContainer>
      {chatId === null && windowWidth > 767 ? (
        <DefaultPage>
          <div></div>
          <div className="mid-container">
            <img
              src={chatWaitingImg}
              alt="chat-waiting"
              loading="lazy"
              onError={handleErrImage}
            />
            <p>
              Hey {currentUser.displayName} !, Lets get ready to chat with our
              loved one's .
            </p>
          </div>
          <DevContact>
            <p>Checkout developer's profile</p>
            <div>
              <a
                href="https://www.linkedin.com/in/manikanta8/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/manikantaPitla"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </DevContact>
        </DefaultPage>
      ) : (
        <>
          {loading ? (
            <PageLoader />
          ) : (
            <>
              <>
                <Header>
                  <div className="user-chat-profile">
                    <PreviewPopup
                      modal
                      trigger={
                        <img
                          src={chatUser?.photoURL}
                          loading="lazy"
                          alt={chatUser?.displayName}
                          onError={handleErrImage}
                        />
                      }
                    >
                      {(close) => (
                        <MediaPopContainer>
                          <div>
                            <button onClick={close}>
                              <IoClose />
                            </button>
                          </div>
                          <img
                            loading="lazy"
                            src={chatUser?.photoURL}
                            alt={chatUser?.displayName}
                          />
                        </MediaPopContainer>
                      )}
                    </PreviewPopup>

                    <div>
                      <h1>{chatUser?.displayName}</h1>
                    </div>
                  </div>
                  <HeaderMenu>
                    <button onClick={() => setModalOpen((prev) => !prev)}>
                      <HiDotsVertical />
                    </button>

                    {isModalOpen && (
                      <div>
                        <ul>
                          <StyledPopUp modal trigger={<li>Clear chat</li>}>
                            {(close) => (
                              <DeletePopUp>
                                <p>Confirm clear chat?</p>
                                <div>
                                  <button onClick={close} type="button">
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleClearChat}
                                  >
                                    Clear
                                  </button>
                                </div>
                              </DeletePopUp>
                            )}
                          </StyledPopUp>
                        </ul>
                      </div>
                    )}
                  </HeaderMenu>
                </Header>
                <ChatBody />
                <ChatInput chatUser={chatUser} />
              </>
            </>
          )}
        </>
      )}
    </MainContainer>
  );
}

export default ChatBox;
