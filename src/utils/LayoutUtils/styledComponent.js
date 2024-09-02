import styled from "styled-components";
import authBg from "../../assets/img/auth_bg.jpg";

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (min-width: 700px) {
    background-image: url(${authBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    lazy-load: true;
  }

  @media screen and (max-width: 700px) {
    justify-content: center;
    background-color: var(--secondary);
  }
`;

export const FormContainer = styled.form`
  @media screen and (max-width: 500px) {
    width: 100%;
  }

  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 20px;
  padding: 0px 20px;

  h1 {
    font-size: 18px;
    align-self: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h1 {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-primary);
  }
`;

// ----------------------------------------------------------------

export const ButtonEl = styled.button`
  height: var(--height);
  width: 100%;
  background-color: var(--primary);
  color: #ffffff;
  border-radius: var(--radius);
  font-size: 12px;
  border: none;
  box-shadow: 10px 10px 10px red;
  box-shadow: var(--shadow);
`;

export const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  height: var(--height);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  background-color: #ffffff;
  color: #000;

  svg {
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputElement = styled.div`
  /* box-shadow: var(--shadow); */
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #fff;
  border-radius: var(--radius);
  padding: 0px 5px;
  height: var(--height);
  border: var(--border);

  button {
    border: none;
    outline: none;
    background: transparent;
  }

  svg {
    font-size: 18px;
    flex-shrink: 0;
    margin-right: 10px;
  }

  input {
    height: 100%;
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 0px 10px;
    font-size: 12px;
    font-weight: 500;
    background-color: transparent;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  p {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  a {
    color: var(--primary);
  }
`;

export const Divider = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  hr {
    flex: 1;
    height: 1px;
    border: none;
    background-color: var(--line);
  }

  p {
    font-size: 12px;
    font-weight: 500;
    color: var(--line);
  }
`;
