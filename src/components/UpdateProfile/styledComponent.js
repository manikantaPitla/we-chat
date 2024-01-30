import styled from "styled-components";
export const MainContainer = styled.div`
  height: 100%;
  width: 400px;
  display: flex;
  background-color: var(--secondary);
  box-shadow: var(--shadow);
  overflow-y: auto;
  @media screen and (max-width: 500px) {
    width: 100%;
    align-items: center;
  }
`;

export const CardContainer = styled.div`
  flex: 1;
  padding: 20px 10px;
  color: var(--text-primary);

  h1 {
    text-transform: uppercase;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const ProfileForm = styled.form`
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 12px;
    font-weight: 500;
  }

  input,
  button {
    height: var(--height);
    border-radius: var(--radius);
    padding: 0px 15px;
    font-size: 12px;
    outline: none;
  }

  input {
    color: var(--text-primary);
    border: var(--border);
    background-color: transparent;
  }

  input:disabled {
    color: var(--text-secondary);
    cursor: no-drop;
  }

  button {
    margin-top: 10px;
    border: none;
    outline: none;
    background-color: var(--primary);
    color: #ffffff;
  }
`;

export const ProfileImgContainer = styled.div`
  align-self: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  label {
    cursor: pointer;
  }

  div {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    overflow: hidden;
    img {
      border-radius: 50px;
      width: inherit;
      height: inherit;
      object-fit: cover;
      object-position: center;
      align-self: center;
    }
  }

  p {
    width: 100%;
    height: 100%;
    background-color: var(--primary-light);
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 16px;
      color: #fff;
    }
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SuggestProfileUpdate = styled.div`
  background-color: var(--primary-light);
  padding: 10px 15px;
  height: var(--height);
  border-radius: var(--radius);

  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
`;

export const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    flex: 1;

    &.btn-outline {
      border: 1px solid var(--primary);
      background-color: transparent;
      color: var(--primary);
    }
  }
`;
