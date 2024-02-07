import React, { useState, useRef, useEffect } from "react";

import {
  Send,
  Image,
  AttachSquare,
  Video,
  Play,
  Music,
  MusicPlay,
} from "iconsax-react";
import { IoClose } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useWindowWidth } from "../../context/widthContext";
import { handleSendMessage } from "../../utils/firebaseUtils";

import {
  MainContainer,
  PreviewFile,
  UploadingStatusContainer,
  Attachmentbutton,
  AttachmentContainer,
  StyledPopUp,
  MediaPopContainer,
} from "./styledComponent";
import { handleErrImage } from "../../utils/componentUtils";

function ChatInput({ chatUser }) {
  const [message, setMessage] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

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
      setAudioFile(null);
      setFileUploadingStatus("");
      setAttachmentRender(false);
    };
  }, []);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    inputRef.current.focus();

    const currentChatId = windowWidth > 768 ? chatId : urlChatId;
    const currentChatUser = windowWidth > 786 ? user : chatUser;

    if (!imageFile && !message && !videoFile && !audioFile) {
      console.log("NO FILES SELECTED");
      return;
    }

    try {
      setAttachmentRender(false);

      const media = {
        imageFile,
        videoFile,
        audioFile,
        message,
      };

      await handleSendMessage(
        media,
        setFileUploadingStatus,
        dispatch,
        currentUser.uid,
        currentChatId,
        currentChatUser
      );

      setMessage("");
      setImageFile(null);
      setVideoFile(null);
      setAudioFile(null);
      setFileUploadingStatus("");
    } catch (error) {
      console.log(error);
    }
  };

  const RenderAttachments = () => (
    <AttachmentContainer>
      <input
        type="file"
        onChange={(e) => {
          setVideoFile(e.target.files[0]);
          setAttachmentRender(false);
        }}
        id="video"
        accept="video/*"
        style={{ display: "none" }}
      />
      <label htmlFor="video">
        <Video />
      </label>
      <input
        onChange={(e) => {
          setImageFile(e.target.files[0]);
          setAttachmentRender(false);
        }}
        type="file"
        id="image"
        accept="image/*"
        style={{ display: "none" }}
      />
      <label htmlFor="image">
        <Image />
      </label>
      <input
        onChange={(e) => {
          setAudioFile(e.target.files[0]);
          setAttachmentRender(false);
        }}
        type="file"
        id="music"
        accept="audio/*"
        style={{ display: "none" }}
      />
      <label htmlFor="music">
        <Music />
      </label>
    </AttachmentContainer>
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
                  loading="lazy"
                  className="preview-image"
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  onError={handleErrImage}
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
      {audioFile && (
        <StyledPopUp
          modal
          trigger={
            <PreviewFile>
              <button type="button">
                <div className="preview-video">
                  <MusicPlay size={18} />
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
                <audio controls>
                  <source
                    src={URL.createObjectURL(audioFile)}
                    type="audio/ogg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
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
