import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MainContainer,
  MediaFile,
  EmptyChat,
  DeletePopUp,
  StyledPopUp,
  MediaPopContainer,
  PreviewPopup,
} from "./styledComponent";
import {
  getUserMessages,
  deleteMessage,
  convertToTimestamp,
} from "../../utils/firebaseUtils";
import { PageLoader, getTime } from "../../utils/componentUtils";
import { useWindowWidth } from "../../context/widthContext";

import { Trash } from "iconsax-react";
import { IoClose } from "react-icons/io5";
import { Send2 } from "iconsax-react";

import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import emptyChat from "../../assets/svg/empty-chat.svg";

function ChatBody({ chatUser }) {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat);
  const messageDataList = useSelector((state) => state.messages.messageList);

  const windowWidth = useWindowWidth();
  const params = useParams();
  const urlChatId = params?.chatId;
  const dispatch = useDispatch();
  const chatContainerScroll = useRef();
  const messageScroll = useRef();

  //   useEffect(() => {
  //     if (chatContainerScroll.current) {
  //       chatContainerScroll.current.scrollTop =
  //         chatContainerScroll.current.scrollHeight;
  //         chatContainerScroll.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, [messageList]);

  useEffect(() => {
    messageScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const chatId = windowWidth > 768 ? currentChat?.chatId : urlChatId;

  useEffect(() => {
    setLoading(true);

    try {
      const unSub = getUserMessages(dispatch, chatId);

      return () => {
        unSub();
      };
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [setMessageList, urlChatId, chatId, dispatch]);

  useEffect(() => {
    if (messageDataList) {
      setMessageList(messageDataList);
      setLoading(false);
    }
  }, [messageDataList]);

  const handleDeleteMessage = async (messageId, closeModal) => {
    try {
      await deleteMessage(chatId, messageId, currentUser.uid);
      closeModal();
    } catch (error) {
      console.error(error.message);
      closeModal();
    }
  };

  return (
    <MainContainer ref={chatContainerScroll}>
      {loading ? (
        <PageLoader relative={true} />
      ) : (
        <>
          {messageDataList.length > 0 ? (
            <>
              {messageDataList.map((eachMessage) => {
                const { id, message, time, senderId, image, video } =
                  eachMessage;

                console.log(eachMessage);
                // console.log(eachMessage);
                return (
                  <li
                    ref={messageScroll}
                    key={id}
                    className={
                      senderId === currentUser.uid
                        ? "sender-message"
                        : "user-message"
                    }
                  >
                    <div>
                      <div className="text-item">
                        {image && (
                          <MediaFile>
                            <PreviewPopup
                              modal
                              trigger={
                                <img src={image} alt="file" loading="lazy" />
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
                                    className="preview-image"
                                    src={image}
                                    alt="file"
                                    loading="lazy"
                                  />
                                </MediaPopContainer>
                              )}
                            </PreviewPopup>
                            <p>{message}</p>
                          </MediaFile>
                        )}
                        {video && (
                          <MediaFile>
                            <ReactPlayer
                              width="200px"
                              light
                              controls
                              url={video}
                            />
                            <p>{message}</p>
                          </MediaFile>
                        )}
                        {!image && !video && (
                          <p
                            style={{
                              fontStyle: eachMessage?.deletedBy
                                ? "italic"
                                : "normal",

                              color:
                                eachMessage?.deletedBy &&
                                "var(--text-secondary)",
                              fontWeight: eachMessage?.deleted && 400,
                            }}
                          >
                            {message !== ""
                              ? message
                              : eachMessage?.deletedBy === currentUser.uid
                              ? "You deleted this message"
                              : "This message was deleted"}
                          </p>
                        )}
                      </div>
                      {eachMessage?.status === "sending" && (
                        <div className="progress">
                          <Send2 size={12} />
                        </div>
                      )}

                      <StyledPopUp
                        modal
                        trigger={
                          <button type="button" className="options">
                            <Trash size={16} />
                          </button>
                        }
                      >
                        {(close) => (
                          <DeletePopUp>
                            <p>Delete message?</p>
                            <div>
                              <button onClick={close} type="button">
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteMessage(id, close)}
                              >
                                Delete
                              </button>
                            </div>
                          </DeletePopUp>
                        )}
                      </StyledPopUp>
                    </div>
                    <p className="time">{getTime(convertToTimestamp(time))}</p>
                  </li>
                );
              })}
            </>
          ) : (
            <EmptyChat>
              <img src={emptyChat} alt="Empty chat" />
              <p>Let's get started with your first message.</p>
            </EmptyChat>
          )}
        </>
      )}
    </MainContainer>
  );
}

export default ChatBody;
