import styled from "styled-components";
import Popup from "reactjs-popup";

export const MainContainer = styled.div`
  background-color: var(--secondary);
  color: var(--text-primary);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  padding: 10px;
  cursor: pointer;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    h1 {
      font-size: 14px;
      font-weight: 500;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
    }
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
