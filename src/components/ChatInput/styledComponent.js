import styled from "styled-components";
import Popup from "reactjs-popup";
export const MainContainer = styled.form`
  /* margin: 10px; */
  /* border: var(--border); */
  /* height: 70px; */
  /* overflow: hidden; */

  height: 60px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  gap: 3px;
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  background-color: var(--secondary);
  /* padding: 0px 10px; */

  input {
    background-color: transparent;
    flex: 1;
    padding-left: 20px;
    height: 100%;
    outline: none;
    border: none;
    font-size: 14px;
    border-radius: var(--radius);
    color: var(--text-primary);
  }

  button {
    flex-shrink: 0;
    background-color: transparent;
    border: none;
    outline: none;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-primary);
    border-radius: var(--radius);

    &:hover {
      background-color: var(--primary-light);
    }
  }

  .submit-btn {
    background-color: var(--primary);
    color: #fff;
  }
`;

export const PreviewFile = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  display: flex;
  justify-content: center;
  align-items: center;

  .preview-image {
    border: var(--border);
    width: 30px;
    height: 30px;
    border-radius: 50px;
    object-fit: cover;
  }

  .preview-video {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    width: 30px;
    height: 30px;
    border-radius: 50px;

    svg {
      color: var(--primary);
    }
  }
`;

export const StyledPopUp = styled(Popup)`
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

export const UploadingStatusContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-light);
  color: white;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  font-size: 10px;
`;

export const Attachmentbutton = styled.div`
  position: relative;
`;

export const AttachmentContainer = styled.div`
  background-color: var(--secondary);
  border: var(--border);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  position: absolute;
  top: -80px;
  right: 20px;

  display: flex;
  padding: 5px;
  align-items: center;
  gap: 10px;

  label {
    color: var(--text-primary);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: var(--radius);
    cursor: pointer;
  }

  label:hover {
    transition: all 0.4s;
    background-color: var(--primary-light);
  }
`;
