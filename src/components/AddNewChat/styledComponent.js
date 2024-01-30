import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 350px;
  height: 100vh;
  background-color: var(--secondary);
  overflow-y: auto;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-primary);

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 14px;
  }

  button {
    height: var(--height35);
    width: var(--width80);
    background-color: var(--primary);
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: var(--radius);
    font-size: 12px;
  }
`;

export const SearchContainer = styled.form`
  border: var(--border);
  height: var(--height);
  border-radius: var(--radius);
  padding: 0px 15px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;

  input {
    padding: 0px 10px;
    background-color: transparent;
    height: 100%;
    flex-grow: 1;
    border: 0;
    outline: 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-primary);
  }

  button {
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }

  svg {
    font-size: 18px;
    transform: rotate(90deg);
    color: var(--text-secondary);
  }
`;

export const SearchLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200;
  }
`;

export const SearchUsersList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    background-color: var(--secondary);
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    color: var(--text-primary);

    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;

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
  }
`;

export const ResponseMsg = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
`;
