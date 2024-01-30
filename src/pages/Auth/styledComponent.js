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

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 360px;

  @media screen and (max-width: 700px) {
    backdrop-filter: blur(4px);
    height: 100%;
    width: 100%;
    padding: 0px 20px;
    justify-content: center;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
  }

  div {
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
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  height: var(--height);
  box-shadow: var(--shadow);
  border-radius: var(--radius);
  background-color: #fff;
  color: #000000;

  svg {
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
  }
`;
