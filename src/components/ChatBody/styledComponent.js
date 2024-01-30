import styled from "styled-components";
import Popup from "reactjs-popup";

export const MainContainer = styled.ul`
  flex: 1;
  box-shadow: var(--shadow);
  background-color: var(--secondary);

  border-radius: var(--radius);
  padding: 15px;
  list-style: none;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 12px;
    line-break: anywhere;
    font-weight: 500;
    width: fit-content;
    max-width: 75%;
    position: relative;

    div {
      display: flex;
      gap: 6px;
      justify-content: flex-end;

      .options {
        background-color: var(--primary);
        box-shadow: var(--boxShadow);
        border: none;
        outline: none;
        display: none;
        height: 30px;
        width: 30px;
        border-radius: 50px;
        svg {
          /* color: var(--text-primary); */
          color: #fff;
          font-size: 16px;
        }
      }
    }

    &:hover .options {
      display: block;
    }

    .text-item {
      padding: 10px;
      box-shadow: var(--shadow);
    }
  }

  .time {
    font-size: 10px;
    color: var(--text-secondary);
  }

  .sender-message {
    align-self: flex-end;

    .text-item {
      background-color: var(--primary);
      color: #ffffff;
      border-radius: 15px 15px 0px 15px;
      order: 1;
    }

    .time {
      align-self: flex-end;
    }

    .progress {
      order: 1;
      align-self: flex-end;

      svg {
        color: var(--text-primary);
      }
    }
  }

  .user-message {
    align-self: flex-start;

    .progress {
      display: none;
    }

    .text-item {
      background-color: #ffffff;
      color: #000000;
      border-radius: 15px 15px 15px 0px;
    }

    div {
      justify-content: flex-start;
    }
    .options {
      display: none !important;
    }

    .time {
      align-self: flex-start;
    }
  }
`;

export const MediaFile = styled.span`
  display: flex;
  flex-direction: column;
  gap: 8px;

  img {
    border-radius: 15px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
`;

export const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);

  img {
    width: 200px;
  }

  p {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const StyledPopUp = styled(Popup)`
  &-content {
    /* margin: 0 0 !important; */
    width: 250px;
    height: 100px;
    border: none;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    background-color: var(--secondary);
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
    color: var(--text-primary);
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
      border: 1px solid var(--primary);

      font-size: 12px;
      background-color: transparent;
      outline: none;
      color: var(--primary);
    }

    button:nth-child(2) {
      background-color: var(--primary);
      color: #ffffff;
    }
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
