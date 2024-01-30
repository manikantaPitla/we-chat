import styled from "styled-components";
import Popup from "reactjs-popup";

export const MainContainer = styled.div`
  background-color: var(--secondary);
  width: 80px;
  padding: 15px 0;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  box-shadow: var(--shadow);

  @media screen and (max-width: 500px) {
    order: 1;
    flex-direction: row;
    width: 100%;
    padding: 10px 15px;
  }
`;

export const MenuItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 0;
  list-style: none;
  flex-shrink: 0;
  color: var(--text-primary);

  @media screen and (max-width: 500px) {
    flex-direction: row;
    gap: 15px;
  }

  .active {
    color: #ffffff;
    background-color: var(--primary);
  }
`;

export const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius);
  color: var(--text-primary);

  &:hover {
    background-color: var(--primary-light);
  }
`;

export const StyledPopUp = styled(Popup)`
  &-content {
    width: 300px;
    height: 150px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    background-color: var(--secondary);
    border: none;
  }
`;

export const LogoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  p {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-primary);
  }

  div {
    display: flex;
    gap: 10px;

    button {
      height: var(--height35);
      width: var(--width80);
      border-radius: var(--radius);
      border: 1px solid var(--primary);
      color: var(--primary);
      background-color: transparent;
      font-size: 12px;
      font-weight: 500;
      outline: none;

      &:hover {
        
      }
    }

    button:nth-child(2) {
      background-color: var(--primary);
      color: #ffffff;
    }
  }
`;
