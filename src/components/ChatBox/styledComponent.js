import styled from "styled-components";
import Popup from "reactjs-popup";
export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 768px) {
    height: 100vh;
    padding: 10px;
    background-color: var(--secondary-light);
  }
`;

export const Header = styled.header`
  padding: 10px 20px;
  height: 70px;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  background-color: var(--secondary);
  color: var(--text-primary);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-chat-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }

    h1 {
      font-size: 16px;
      font-weight: 500;
    }
  }

  svg {
    font-size: 20px;
    color: var(--text-primary);
  }
`;

export const DefaultPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: var(--shadow);
  background-color: var(--secondary);
  border-radius: var(--radius);
  color: var(--text-primary);
  padding: 10px;

  .mid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    img {
      width: 200px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const DevContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);

  p {
    font-size: 12px;
  }

  div {
    display: flex;
    gap: 10px;

    svg {
      font-size: 16px;
    }
  }
`;

export const HeaderMenu = styled.div`
  position: relative;

  div {
    position: absolute;
    right: 0px;
    top: 130%;
    z-index: 1;
    background-color: var(--secondary);
    box-shadow: var(--shadow);
    border: var(--border);
    border-radius: var(--radius);
    width: 150px;
    padding: 10px;

    ul {
      list-style: none;
      padding-left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;

      li {
        height: var(--height35);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;
        border-radius: var(--radius);

        &:hover {
          background-color: var(--primary-light);
        }
      }
    }
  }
`;

export const DeletePopUp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  p {
    font-size: 12px;
    font-weight: 500;
  }

  div {
    display: flex;
    gap: 10px;

    button {
      height: var(--height35);
      width: var(--width80);
      border-radius: var(--radius);

      padding: 5px 10px;
      font-size: 12px;
      background-color: transparent;
      border: 1px solid var(--primary);
      outline: none;
      color: var(--primary);
    }

    button:nth-child(2) {
      background-color: var(--primary);
      color: #ffffff;
    }
  }
`;

export const StyledPopUp = styled(Popup)`
  &-content {
    width: 250px;
    height: 100px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
  }
`;

export const PreviewPopup = styled(Popup)`
  &-content {
    /* width: 250px;
    height: 100px;
    box-shadow: var(--shadow);
    border-radius: var(--radius); */
    background-color: transparent;
    border: none;
    width: inherit;
  }
`;

export const MediaPopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  padding: 40px !important;

  div {
    align-self: flex-end;
    margin-bottom: 10px;
    button {
      height: 30px;
      width: 30px;
      border-radius: var(--radius);
      background-color: var(--primary);
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    border: var(--border);

    @media screen and (max-width: 768px) {
      width: 100%;
      height: fit-content;
    }
  }
`;
