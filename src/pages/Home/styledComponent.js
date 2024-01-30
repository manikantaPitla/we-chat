import styled from "styled-components";
import Popup from "reactjs-popup";

export const MainContainer = styled.div`
  height: 100vh;
  background-color: var(--secondary-light);
  display: flex;
  align-items: stretch;
  padding: 15px;
  gap: 10px;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex: 1;
  }
  @media screen and (max-width: 500px) {
    overflow-y: auto;
    padding-bottom:2px ;
    flex: 1;
  }
`;

export const StyledPopUp = styled(Popup)`
  &-content {
    margin: 0 0 !important;
    width: inherit;
    box-shadow: var(--shadow);
    background-color: var(--secondary-light);
    border: none;

    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`;
