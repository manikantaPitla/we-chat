import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoClose } from "react-icons/io5";
import { Send2, Trash } from "iconsax-react";
import emptyChat from "../../assets/svg/empty-chat.svg";

import {
  getUserMessages,
  deleteMessage,
  convertToTimestamp,
  updateLastMessage,
} from "../../utils/firebaseUtils";

import {
  PageLoader,
  getTime,
  handleErrImage,
} from "../../utils/componentUtils";
import { useWindowWidth } from "../../context/widthContext";

import AudioFile from "../AudioFile";
import VideoPlayer from "../VideoPlayer";
import {
  MainContainer,
  MediaFile,
  EmptyChat,
  DeletePopUp,
  StyledPopUp,
  MediaPopContainer,
  PreviewPopup,
} from "./styledComponent";

function ChatBody() {
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
  const messageScrollRef = useRef();

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

  useEffect(() => {
    if (chatContainerScroll.current) {
      chatContainerScroll.current.scrollTop =
        chatContainerScroll.current.scrollHeight;
    }
  }, [messageList]);

  const handleDeleteMessage = async (messageId, closeModal) => {
    try {
      await deleteMessage(chatId, messageId, currentUser.uid);
      await updateLastMessage(
        currentUser.uid,
        currentChat.user,
        chatId,
        "Message deleted"
      );
      closeModal();
    } catch (error) {
      console.error(error.message);
      closeModal();
    }
  };

  const RenderImageMessage = ({ image, message }) => (
    <MediaFile>
      <PreviewPopup
        modal
        trigger={
          <img src={image} alt="file" loading="lazy" onError={handleErrImage} />
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
              onError={handleErrImage}
            />
          </MediaPopContainer>
        )}
      </PreviewPopup>
      <p>{message}</p>
    </MediaFile>
  );

  const RenderVideoMessage = ({ video, message }) => (
    <MediaFile>
      {/* <ReactPlayer width="200px" light controls url={video.video} /> */}
      <VideoPlayer video={video.video} />
      <p>{message}</p>
    </MediaFile>
  );

  const RenderTextMessage = ({ eachMessage, message }) => (
    <p
      style={{
        fontStyle: eachMessage?.deletedBy ? "italic" : "normal",

        color: eachMessage?.deletedBy && "var(--text-secondary)",
        fontWeight: eachMessage?.deleted && 400,
      }}
    >
      {message !== ""
        ? message
        : eachMessage?.deletedBy === currentUser.uid
        ? "You deleted this message"
        : "This message was deleted"}
    </p>
  );

  const RenderAudioMessage = ({ audioData }) => (
    <MediaFile>
      <AudioFile audioData={audioData} />
    </MediaFile>
  );

  return (
    <MainContainer ref={chatContainerScroll}>
      {loading ? (
        <PageLoader relative={true} />
      ) : (
        <>
          {messageDataList.length > 0 ? (
            <>
              {messageDataList.map((eachMessage) => {
                const {
                  id,
                  message,
                  time,
                  senderId,
                  image,
                  videoData,
                  audioData,
                } = eachMessage;

                return (
                  <li
                    ref={messageScrollRef}
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
                          <RenderImageMessage image={image} message={message} />
                        )}
                        {videoData && (
                          <RenderVideoMessage
                            video={videoData}
                            message={message}
                          />
                        )}
                        {audioData && (
                          <RenderAudioMessage
                            audioData={audioData}
                            message={message}
                          />
                        )}
                        {!image && !videoData && !audioData && (
                          <RenderTextMessage
                            eachMessage={eachMessage}
                            message={message}
                          />
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
                          senderId === currentUser.uid && (
                            <button type="button" className="options">
                              <Trash size={16} />
                            </button>
                          )
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
