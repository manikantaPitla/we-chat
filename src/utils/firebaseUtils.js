import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  arrayUnion,
  Timestamp,
  or,
  and,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import {
  addMessage,
  updateMessage,
  setMessages,
} from "../features/messagesReducer";
import { getFileSrc } from "./componentUtils";

export const handleUserIdentification = async (user) => {
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  const userDocRef = doc(collection(db, "users"), user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    try {
      await setDoc(userDocRef, userData);
      await setDoc(doc(db, "userChats", user.uid), {});
    } catch (error) {
      console.error(error.message);
    }
  }

  return userData;
};

export const signInUsingRedirect = async () => {
  await signInWithRedirect(auth, new GoogleAuthProvider());
};

export const updateUserProfileData = async (currentUser, dataToUpdate) => {
  if (currentUser) {
    try {
      await updateProfile(currentUser, dataToUpdate);

      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, dataToUpdate);
    } catch (error) {
      console.error(error.message);
    }
  }
};

export const updateUserProfile = async (profilePic) => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        await updateUserProfileData(currentUser, { photoURL: profilePic });
      } catch (error) {
        console.error("Error updating user profile:", error.message);
      } finally {
        unsubscribe();
      }
    }
  });
};

export const updateUserName = async (displayName) => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        await updateUserProfileData(currentUser, { displayName });
      } catch (error) {
        console.error("Error updating user name:", error.message);
      } finally {
        unsubscribe();
      }
    }
  });
};

export const updateUserNameAndProfile = async (displayName, profilePic) => {
  onAuthStateChanged(auth, async (currentUser) => {
    await updateUserProfileData(currentUser, {
      photoURL: profilePic,
      displayName,
    });
  });
};

export const uploadProfileImage = async (
  file,
  displayName,
  progressCallback
) => {
  const date = new Date().getTime();
  const joinName = displayName.replace(/\s/g, "");
  const storageRef = ref(storage, `userProfiles/${joinName}/${date}`);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: "image/jpeg",
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (progressCallback) {
          progressCallback(progress);
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(downloadURL);
      }
    );
  });
};

export const getSearchUsers = async (searchValue, currentUserUid) => {
  const searchQueryLower = searchValue.toLowerCase();
  try {
    const q = query(
      collection(db, "users"),
      and(
        where("displayName", ">=", searchValue),
        where("displayName", "<=", searchValue + "\uf8ff"),
        or(
          where("displayName", ">=", searchQueryLower),
          where("displayName", "<=", searchQueryLower + "\uf8ff")
        )
      )
    );

    const querySnapshot = await getDocs(q);

    const resultList = querySnapshot.docs
      .filter((doc) => doc.data().uid !== currentUserUid)
      .map((doc) => doc.data());

    return resultList;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
export const setUserToChats = async (currentUser, user) => {
  const combinedId = generateCombineId(currentUser.uid, user.uid);

  const response = await getDoc(doc(db, "chats", combinedId));
  if (!response.exists()) {
    //create an empty chat in chats collection
    await setDoc(doc(db, "chats", combinedId), { messages: [] });

    //create user chats
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", user.uid), {
      [combinedId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });
  }
};

const updateUserChatList = async (combinedId, currentUserId, dataToUpdate) => {
  try {
    await updateDoc(doc(db, "userChats", currentUserId), {
      [combinedId + ".userInfo"]: dataToUpdate,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserChats = (currentUserId, setUsersList, setLoading) => {
  const unSub = onSnapshot(doc(db, "userChats", currentUserId), (doc) => {
    const data = doc.data();
    if (data && Object.keys(doc.data()).length !== 0) {
      setUsersList(doc.data());

      const dataList = Object.entries(doc.data());
      dataList.map(async (eachUser) => {
        const { userInfo } = eachUser[1];
        const userId = userInfo.uid;

        const combinedId = generateCombineId(userId, currentUserId);
        try {
          const userData = await getUser(userId);

          if (userInfo.displayName !== userData.displayName) {
            await updateUserChatList(combinedId, currentUserId, {
              ...userInfo,
              displayName: userData.displayName,
            });
          } else if (userInfo.photoURL !== userData.photoURL) {
            await updateUserChatList(combinedId, currentUserId, {
              ...userInfo,
              photoURL: userData.photoURL,
            });
          }
        } catch (error) {
          console.error(error);
        }
      });

      setLoading(false);
    } else {
      setLoading(false);
    }
  });

  return unSub;
};

export const generateCombineId = (currentUserId, userId) => {
  return currentUserId > userId
    ? currentUserId + userId
    : userId + currentUserId;
};

export const uploadMedia = async (mediaFile, chatId, progressCallback) => {
  const date = new Date().getTime();

  const storageRef = ref(storage, `chats/${chatId}/${date}`);
  const uploadTask = uploadBytesResumable(storageRef, mediaFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (progressCallback) {
          progressCallback(progress);
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(downloadURL);
      }
    );
  });
};

export const convertToTimestamp = (milliSeconds) => {
  return Timestamp.fromMillis(milliSeconds);
};

export const convertToTime = (timeStamp) => {
  return timeStamp.toMillis();
};

export const sendMessage = async (chatId, messageData) => {
  const newMessage = messageData;

  try {
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion(newMessage),
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const handleSendMessage = async (
  media,
  setFileUploadingStatus,
  dispatch,
  currentUserId,
  currentChatId,
  currentChatUser
) => {
  const { imageFile, videoFile, audioFile, message } = media;

  const newMessage = {
    id: nanoid(),
    senderId: currentUserId,
    message,
    time: Timestamp.now(),
  };

  const updateLastMessageStatus = async (updatedMessage) => {
    await updateLastMessage(
      currentUserId,
      currentChatUser,
      currentChatId,
      updatedMessage
    );
  };

  const messageStatus = {
    ...newMessage,
    time: Timestamp.now().toMillis(),
    status: "sending",
  };

  try {
    if (imageFile) {
      const imageSrc = await getFileSrc(imageFile);

      dispatch(addMessage({ ...messageStatus, image: imageSrc }));

      const mediaLink = await uploadMedia(
        imageFile,
        currentChatId,
        (uploadingStatus) => {
          setFileUploadingStatus(uploadingStatus + "%");
        }
      );

      await sendMessage(currentChatId, {
        ...newMessage,
        image: mediaLink,
      });

      dispatch(
        updateMessage({ ...messageStatus, image: mediaLink, status: "sent" })
      );
      //   console.log("SENDING IMAGE FILE");

      updateLastMessageStatus("📷Image");
    }

    if (videoFile) {
      dispatch(
        addMessage({
          ...messageStatus,
          videoData: { video: videoFile, name: videoFile.name },
        })
      );

      const mediaLink = await uploadMedia(
        videoFile,
        currentChatId,
        (uploadingStatus) => {
          setFileUploadingStatus(uploadingStatus + "%");
        }
      );

      await sendMessage(currentChatId, {
        ...newMessage,
        videoData: { video: mediaLink, name: videoFile.name },
      });

      dispatch(
        updateMessage({
          ...messageStatus,
          videoData: { video: mediaLink, name: videoFile.name },
          status: "sent",
        })
      );
      //   console.log("SENDING VIDEO FILE");
      updateLastMessageStatus("📹 video");
    }

    if (audioFile) {
      dispatch(
        addMessage({
          ...messageStatus,
          audioData: { audio: audioFile, name: audioFile.name },
        })
      );

      const mediaLink = await uploadMedia(
        audioFile,
        currentChatId,
        (uploadingStatus) => {
          setFileUploadingStatus(uploadingStatus + "%");
        }
      );

      //   console.log("CLOUD AUDIO FILE:", mediaLink);
      await sendMessage(currentChatId, {
        ...newMessage,
        audioData: { audio: mediaLink, name: audioFile.name },
      });

      dispatch(
        updateMessage({
          ...messageStatus,
          message: "",
          audioData: { audio: mediaLink, name: audioFile.name },
          status: "sent",
        })
      );
      //   console.log("SENDING AUDIO FILE");
      updateLastMessageStatus("🎵 audio");
    }

    if (!videoFile && !imageFile && !audioFile && message) {
      dispatch(addMessage({ ...messageStatus }));

      await sendMessage(currentChatId, {
        ...newMessage,
      });

      dispatch(
        updateMessage({
          ...messageStatus,
          status: "sent",
        })
      );
      //   console.log("SENDING TEXT MESSAGE");
      updateLastMessageStatus(message);
    }
  } catch (error) {
    dispatch(
      updateMessage({
        ...messageStatus,
        status: "failed",
      })
    );

    console.log("ERROR Message :", error);
  }
};

export const updateLastMessage = async (
  currentUserId,
  user,
  chatId,
  message
) => {
  await updateDoc(doc(db, "userChats", currentUserId), {
    [chatId + ".lastMessage"]: {
      text: message,
      time: serverTimestamp(),
    },
    [chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", user.uid), {
    [chatId + ".lastMessage"]: {
      text: message,
      time: serverTimestamp(),
    },
    [chatId + ".date"]: serverTimestamp(),
  });
};

export const getUserMessages = (dispatch, chatId) => {
  const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
    if (doc.exists()) {
      const messages = doc.data().messages.map((message) => ({
        ...message,
        time: convertToTime(message.time),
      }));

      dispatch(setMessages(messages));
    }
  });

  return unsubscribe;
};

export const deleteMessage = async (chatId, messageId, currentUserId) => {
  const chatDocRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatDocRef);

  if (chatDoc.exists()) {
    const updatedMessages = chatDoc.data().messages.map((message) => {
      if (message.id === messageId) {
        const updatedMessage = { ...message };

        updatedMessage.deletedBy = currentUserId;

        if ("message" in updatedMessage) updatedMessage.message = "";
        if ("image" in updatedMessage) updatedMessage.image = null;
        if ("videoData" in updatedMessage) updatedMessage.videoData = null;
        if ("audioData" in updatedMessage) updatedMessage.audioData = null;

        return updatedMessage;
      } else {
        return message;
      }
    });

    await updateDoc(chatDocRef, {
      messages: updatedMessages,
    });
  }
};

export const clearChat = async (chatId) => {
  await updateDoc(doc(db, "chats", chatId), {
    messages: [],
  });
};
