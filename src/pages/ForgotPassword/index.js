import React from "react";
import {
  FormCardLayout,
  LogoLayout,
  MainBgLayout,
  InputLayout,
  FlexColumnLayout,
  ButtonLayout,
} from "../../utils/LayoutUtils";

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MainBgLayout>
      <div></div>
      <FormCardLayout onSubmitForm={handleSubmit}>
        <LogoLayout>Forgot Password</LogoLayout>
        <FlexColumnLayout>
          <InputLayout>
            <input type="email" placeholder="Enter your registered email" />
          </InputLayout>
          <ButtonLayout>Send OTP</ButtonLayout>
        </FlexColumnLayout>
      </FormCardLayout>
    </MainBgLayout>
  );
};

export default ForgotPassword;
