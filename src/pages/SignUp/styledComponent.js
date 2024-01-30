import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 700px) {
    background-image: url("https://res.cloudinary.com/df9fyawpk/image/upload/v1704901019/We%20Chat%20App/Bg%20Images/pexels-andrea-piacquadio-3771060_1_lqz8ei.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  @media screen and (max-width: 700px) {
    justify-content: center;
    background-color: var(--secondary);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h1 {
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 500;
  }
`;

export const FormContainer = styled.form`
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  padding: 0px 20px;
  width: 350px;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;

  h1 {
    font-size: 18px;
    align-self: center;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: red;
  }
`;

export const ButtonEl = styled.button`
  height: 40px;
  width: 100%;
  background-color: var(--primary);
  color: #ffffff;
  border-radius: var(--radius);
  font-size: 12px;
  border: none;
  box-shadow: 10px 10px 10px red;
  box-shadow: var(--shadow);
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
  border: var(--border);
  background-color: #ffffff;
  border-radius: var(--radius);
  padding: 0px 5px;
  height: var(--height);

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
    text-align: left;
    color: var(--text-secondary);
  }

  a {
    color: var(--primary);
  }
`;
