import styled from "styled-components";
import Popup from "reactjs-popup";

export const MainContainer = styled.div`
  flex: 1;
  width: 300px;
  background-color: var(--secondary);
  color: var(--text-primary);
  flex-shrink: 0;
  box-shadow: var(--shadow);
  padding: 10px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const TopFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  hr {
    border: none;
    height: 1px;
    background-color: var(--line);
  }
`;

export const SearchContainer = styled.div`
  border: var(--border);
  height: var(--height);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  padding: 0px 15px;
  input {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    height: 100%;
    padding: 0px 15px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text-primary);
  }

  svg {
    font-size: 18px;
    color: var(--text-secondary);
  }
`;

export const ButtonContainer = styled.button`
  height: var(--height);
  border-radius: var(--radius);
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: var(--primary);
  color: #fff;

  p {
    font-size: 12px;
    font-weight: 500;
  }

  svg {
    font-size: 18px;
  }
`;

export const UserChatList = styled.ul`
  flex: 1;
  list-style: none;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 5px;

  .active {
    border-radius: var(--radius);
    background-color: var(--primary-light);
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
    }

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h1 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      p {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-secondary);
      }
    }
    p {
      font-size: 10px;
      font-weight: 500;
      color: var(--text-secondary);
    }
  }
`;

export const NoUserChats = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    padding: 10px;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: var(--text-secondary);
  }
`;

export const ErrorMessage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  p {
    padding: 10px;
    font-size: 12px;
    text-align: center;
    color: var(--text-secondary);
  }

  button {
    height: var(--height35);
    width: var(--width80);
    background-color: var(--primary);
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: var(--radius);
    font-size: 12px;
  }
`;

export const StyledPopUp = styled(Popup)`
  &-content {
    margin: 0 0 !important;
    width: inherit;
    box-shadow: var(--shadow);
    padding: 0;
    border: none;

    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`;
