import styled from "styled-components";
import { toast } from "react-toastify";
import { ring, dotPulse } from "ldrs";
ring.register();
dotPulse.register();

const toastSettings = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const DotLoader = () => (
  <l-dot-pulse size="35" speed="1.3" color="#ffffff"></l-dot-pulse>
);

export const PageLoader = ({ loadingMsg, relative = false }) => (
  <Loader $relative={relative.toString()}>
    <l-ring
      size="30"
      stroke="2"
      bg-opacity="0"
      speed="2"
      color="var(--primary)"
    ></l-ring>
    <p>{loadingMsg}</p>
  </Loader>
);

const Loader = styled.div`
  background-color: var(--secondary);

  position: ${(props) =>
    props.$relative === "true" ? "relative" : "absolute"};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  p {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
  }
`;

export const toastError = (message) => {
  return toast.error(message, { ...toastSettings });
};
export const toastSuccess = (message) => {
  return toast.success(message, { ...toastSettings });
};

export const getTime = (date) => {
  if (date && date.toDate) {
    return date.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    return "";
  }
};

export const resizeLastMessage = (message) => {
  if (message.length > 15) {
    return message.substring(0, 15) + " ...";
  }
  return message;
};

export const getFileSrc = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileSrc = reader.result;
      resolve(fileSrc);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
