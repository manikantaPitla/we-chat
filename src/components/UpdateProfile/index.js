import React, { useEffect, useState } from "react";
import defaultUser from "../../assets/img/default-user.png";
import { useSelector } from "react-redux";
import {
  toastError,
  toastSuccess,
  DotLoader,
} from "../../utils/componentUtils";
import { Warning2 } from "iconsax-react";
import {
  updateUserName,
  updateUserProfile,
  updateUserNameAndProfile,
  uploadProfileImage,
} from "../../utils/firebaseUtils";

import { PageLoader, handleErrImage } from "../../utils/componentUtils";

import {
  MainContainer,
  CardContainer,
  ProfileForm,
  FlexColumn,
  ProfileImgContainer,
  SuggestProfileUpdate,
  ButtonFlex,
} from "./styledComponent";
function UpdateProfile({ closeModal }) {
  const [displayName, setDisplayName] = useState("");
  const [updateLoader, setUpdateLoader] = useState(false);
  const [imgUploadingStatus, setImgUploadingStatus] = useState("");
  const [profileImg, setProfileImg] = useState(defaultUser);
  const [fileForUpload, setFileForUpload] = useState(null);

  const [profile, setProfile] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      user.photoURL && setProfileImg(user.photoURL);
      setProfile(user);
      setDisplayName(user.displayName);

      setDataLoading(false);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
        setFileForUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (displayName === "") {
      toastError("Please enter your name");
      return;
    }

    if (user?.photoURL) {
      if (profileImg === user?.photoURL && displayName === user.displayName) {
        toastError("Please make some changes to update your profile");
        return;
      }
    } else {
      if (displayName === user.displayName && profileImg === defaultUser) {
        toastError("Please make some changes to update your profile");
        return;
      }
    }

    setUpdateLoader(true);
    try {
      let profileUploadedUrl;
      if (profileImg !== defaultUser && profileImg !== user?.photoURL) {
        profileUploadedUrl = await uploadProfileImage(
          fileForUpload,
          displayName,
          (progress) => {
            setImgUploadingStatus(`${progress}%`);
          }
        );
      }

      setImgUploadingStatus("");

      if (
        user.displayName !== displayName &&
        (profileImg === defaultUser || profileImg === user?.photoURL)
      ) {
        // console.log("updating name");
        await updateUserName(displayName);
      } else if (
        user.displayName === displayName &&
        (profileImg !== defaultUser || profileImg !== user?.photoURL)
      ) {
        // console.log("updating image");
        await updateUserProfile(profileUploadedUrl);
      } else if (
        user.displayName !== displayName &&
        (profileImg !== defaultUser || profileImg !== profile?.photoURL)
      ) {
        // console.log("updating name and image");
        await updateUserNameAndProfile(displayName, profileUploadedUrl);
      }

      setUpdateLoader(false);
      setFileForUpload(null);
      toastSuccess("Profile updated successfully");
      !user?.photoURL && closeModal();
    } catch (error) {
      toastError(error.message);
      setUpdateLoader(false);
      setImgUploadingStatus("");
    }
  };

  return (
    <MainContainer>
      {dataLoading ? (
        <PageLoader />
      ) : (
        <CardContainer>
          <h1>{profile?.photoURL ? "Profile" : "Update Profile"}</h1>
          <ProfileForm onSubmit={handleUpdateProfile}>
            {!profile?.photoURL && (
              <SuggestProfileUpdate>
                <Warning2 size={18} />
                <p>Complete your profile with a profile pic</p>
              </SuggestProfileUpdate>
            )}
            <ProfileImgContainer>
              <div>
                <img
                  src={profileImg}
                  alt="profile"
                  onError={handleErrImage}
                  loading="lazy"
                />
                {imgUploadingStatus && (
                  <p>
                    <span>{imgUploadingStatus}</span>
                  </p>
                )}
              </div>

              <input
                type="file"
                id="profile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="profile">
                {profile?.photoURL ? "Change Profile" : "Set Profile"}
              </label>
            </ProfileImgContainer>
            <FlexColumn>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FlexColumn>
            <FlexColumn>
              <label>Email</label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                placeholder="Email"
              />
            </FlexColumn>
            <ButtonFlex>
              {profile?.photoURL && (
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
              )}
              <button type="submit">
                {updateLoader ? <DotLoader /> : "Update"}
              </button>
            </ButtonFlex>
          </ProfileForm>
        </CardContainer>
      )}
    </MainContainer>
  );
}

export default UpdateProfile;
