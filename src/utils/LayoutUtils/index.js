import React from "react";
import {
  FormContainer,
  InputElement,
  LogoContainer,
  MainContainer,
  FlexColumn,
  ButtonEl,
  GoogleButton,
  LinksContainer,
  Divider,
} from "./styledComponent";

import pageLogo from "../../assets/svg/page-logo.svg";

export const MainBgLayout = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

export const FormCardLayout = ({ onSubmitForm, children }) => {
  return <FormContainer onSubmit={onSubmitForm}>{children}</FormContainer>;
};

export const LogoLayout = ({ children }) => {
  return (
    <LogoContainer>
      <img className="page-logo" src={pageLogo} alt="Logo" />
      <h1>{children}</h1>
    </LogoContainer>
  );
};

export const InputLayout = ({ children }) => {
  return <InputElement>{children}</InputElement>;
};

export const ButtonLayout = ({ buttonType, children }) => {
  return <ButtonEl type={buttonType}>{children}</ButtonEl>;
};

export const GoogleButtonLayout = ({ onClickButton, children }) => {
  return (
    <GoogleButton type="button" onClick={onClickButton}>
      {children}
    </GoogleButton>
  );
};

export const FlexColumnLayout = ({ children }) => {
  return <FlexColumn>{children}</FlexColumn>;
};

export const LinksLayout = ({ children }) => {
  return <LinksContainer>{children}</LinksContainer>;
};

export const DividerLayout = () => {
  return (
    <Divider>
      <hr />
      <p>OR</p>
      <hr />
    </Divider>
  );
};
