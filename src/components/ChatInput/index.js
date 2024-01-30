import React, { useState, useRef, useEffect } from "react";

import { Send, Image, AttachSquare, Video, Play } from "iconsax-react";
import { IoClose } from "react-icons/io5";

import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useWindowWidth } from "../../context/widthContext";
import {
  uploadMedia,
  updateLastMessage,
  sendMessage,
  handleSendMessage,
} from "../../utils/firebaseUtils";

// import { addMessage, updateMessage } from "../../features/messagesReducer";

import {
  MainContainer,
  PreviewFile,
  UploadingStatusContainer,
  Attachmentbutton,
  AttachmentContainer,
  StyledPopUp,
  MediaPopContainer,
} from "./styledComponent";

function ChatInput({ chatUser }) {
  const [message, setMessage] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileUploadingStatus, setFileUploadingStatus] = useState("");
  const [isAttachmentRender, setAttachmentRender] = useState(false);

  const params = useParams();
  const urlChatId = params.chatId;

  const windowWidth = useWindowWidth();

  const currentUser = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const { user, chatId } = currentChat;

  useEffect(() => {
    return () => {
      setMessage("");
      setImageFile(null);
      setVideoFile(null);
      setFileUploadingStatus("");
      setAttachmentRender(false);
    };
  }, []);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    inputRef.current.focus();

    const currentChatId = windowWidth > 768 ? chatId : urlChatId;
    const currentChatUser = windowWidth > 786 ? user : chatUser;

    if (!imageFile && !message && !videoFile) {
      console.log("NO FILES SELECTED");
      return;
    }

    try {
      setAttachmentRender(false);

      const media = {
        imageFile,
        videoFile,
        message,
      };

      await handleSendMessage(
        media,
        setFileUploadingStatus,
        dispatch,
        currentUser.uid,
        currentChatId
      );

      //   if (imageFile) {
      //     const mediaLink = await uploadMedia(
      //       imageFile,
      //       currentChatId,
      //       (uploadingStatus) => {
      //         setFileUploadingStatus(uploadingStatus + "%");
      //       }
      //     );

      //     await sendMessage(dispatch, currentUser.uid, currentChatId, {
      //       message,
      //       image: mediaLink,
      //     });
      //     console.log("SENDING IMAGE FILE");
      //   }

      //   if (videoFile) {
      //     const mediaLink = await uploadMedia(
      //       videoFile,
      //       chatId,
      //       (uploadingStatus) => {
      //         setFileUploadingStatus(uploadingStatus + "%");
      //       }
      //     );

      //     await sendMessage(dispatch, currentUser.uid, currentChatId, {
      //       message,
      //       video: mediaLink,
      //     });
      //     console.log("SENDING VIDEO FILE");
      //   }

      //   if (!videoFile && !imageFile && message) {
      //     await sendMessage(dispatch, currentUser.uid, currentChatId, {
      //       message,
      //     });
      //     console.log("SENDING TEXT MESSAGE");
      //   }

      await updateLastMessage(
        currentUser.uid,
        currentChatUser,
        currentChatId,
        message
      );

      setMessage("");
      setImageFile(null);
      setVideoFile(null);
      setFileUploadingStatus("");
    } catch (error) {
      console.log(error);
    }
  };

  const RenderAttachments = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AttachmentContainer>
        <input
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
          id="video"
          accept="video/*"
          style={{ display: "none" }}
        />
        <label htmlFor="video">
          <Video />
        </label>
        <input
          onChange={(e) => setImageFile(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
        />
        <label htmlFor="image">
          <Image />
        </label>
      </AttachmentContainer>
    </motion.div>
  );

  return (
    <MainContainer onSubmit={handleMessageSent}>
      <input
        type="text"
        ref={inputRef}
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {imageFile && (
        <StyledPopUp
          modal
          trigger={
            <PreviewFile>
              <button type="button">
                <img
                  className="preview-image"
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                />
              </button>
              {fileUploadingStatus && (
                <UploadingStatusContainer>
                  <p>{fileUploadingStatus}</p>
                </UploadingStatusContainer>
              )}
            </PreviewFile>
          }
        >
          {(close) => (
            <MediaPopContainer>
              <div>
                <button onClick={close}>
                  <IoClose />
                </button>
              </div>
              <img src={URL.createObjectURL(imageFile)} alt="Preview" />
            </MediaPopContainer>
          )}
        </StyledPopUp>
      )}
      {videoFile && (
        <StyledPopUp
          modal
          trigger={
            <PreviewFile>
              <button type="button">
                <div className="preview-video">
                  <Play size={18} />
                </div>
              </button>
              {fileUploadingStatus && (
                <UploadingStatusContainer>
                  <p>{fileUploadingStatus}</p>
                </UploadingStatusContainer>
              )}
            </PreviewFile>
          }
        >
          {(close) => (
            <MediaPopContainer>
              <div>
                <button onClick={close}>
                  <IoClose />
                </button>
              </div>
              <video width={300} autoPlay={false} controls>
                <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </MediaPopContainer>
          )}
        </StyledPopUp>
      )}

      <Attachmentbutton>
        {isAttachmentRender && <RenderAttachments />}
        <button
          type="button"
          onClick={() => setAttachmentRender((prev) => !prev)}
        >
          <AttachSquare size={22} />
        </button>
      </Attachmentbutton>
      <button className="submit-btn" type="submit">
        <Send size={22} />
      </button>
    </MainContainer>
  );
}

export default ChatInput;
