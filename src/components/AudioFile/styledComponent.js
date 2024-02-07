import styled from "styled-components";

export const AudioContainer = styled.div`
  display: flex;
  align-items: center;
  width: 250px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px !important;
    flex: 1;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: 400;
        font-size: 10px;
        color: var(--text-secondary);
      }
    }

    input {
      -webkit-appearance: none;
      height: 5px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const AudioManager = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: var(--shadow);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary);

  svg {
    color: var(--primary);
    font-size: 22px;
  }
`;
