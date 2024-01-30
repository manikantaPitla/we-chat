import React, { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { UserAdd } from "iconsax-react";
import { useSelector } from "react-redux";
import searchLogo from "../../assets/svg/search-img.svg";
import { getSearchUsers, setUserToChats } from "../../utils/firebaseUtils";
import { toastError, PageLoader } from "../../utils/componentUtils";
import {
  MainContainer,
  SearchContainer,
  Header,
  SearchLogo,
  SearchUsersList,
  ResponseMsg,
} from "./styledComponent";

function AddNewChat({ closeModal }) {
  const [searchValue, setSearchValue] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAddStatus, setUserAddStatus] = useState(null);
  const [response, setResponse] = useState("");
  const currentUser = useSelector((state) => state.auth.user);

  const handleSearch = async (e) => {
    e.preventDefault();
    setUsersList([]);
    setResponse("");

    if (!searchValue) {
      return;
    }
    setLoading(true);

    try {
      const data = await getSearchUsers(searchValue, currentUser.uid);
      setLoading(false);
      if (data.length === 0) {
        setResponse(" No results found");
        return;
      }

      setUsersList(data);
    } catch (err) {
      toastError("Something went wrong");
      setLoading(false);
    }
  };

  const handleClickUser = async (user) => {
    setUserAddStatus(user.uid);
    try {
      await setUserToChats(currentUser, user);
      setUserAddStatus(null);
      closeModal();
    } catch (error) {
      setUserAddStatus(null);
      toastError("Error: ", error.message);
    }
  };

  return (
    <MainContainer>
      <Header>
        <div>
          <UserAdd size={18} />
          <p>Add user</p>
        </div>
        <button onClick={closeModal}>Close</button>
      </Header>
      <SearchContainer onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          <CiSearch />
        </button>
      </SearchContainer>
      {usersList.length > 0 && (
        <SearchUsersList>
          {usersList.map((user) => (
            <li key={user.uid} onClick={() => handleClickUser(user)}>
              {userAddStatus !== null && userAddStatus === user.uid ? (
                <PageLoader relative={true} />
              ) : (
                <>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    loading="lazy"
                  />
                  <div>
                    <h1>{user.displayName}</h1>
                    <p>{user.email}</p>
                  </div>
                </>
              )}
            </li>
          ))}
        </SearchUsersList>
      )}
      {response && <ResponseMsg>{response}</ResponseMsg>}

      {loading && <PageLoader relative={true} />}
      {usersList.length === 0 && !loading && (
        <SearchLogo>
          <img width={200} src={searchLogo} alt="search user" loading="lazy" />
        </SearchLogo>
      )}
    </MainContainer>
  );
}

export default AddNewChat;
