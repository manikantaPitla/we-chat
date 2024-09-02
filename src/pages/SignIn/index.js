import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { PageLoader, toastError, DotLoader } from "../../utils/componentUtils";
import {
  handleUserIdentification,
  signInUsingRedirect,
} from "../../utils/firebaseUtils";

import {
  MainBgLayout,
  FormCardLayout,
  LogoLayout,
  FlexColumnLayout,
  InputLayout,
  ButtonLayout,
  GoogleButtonLayout,
  LinksLayout,
  DividerLayout,
} from "../../utils/LayoutUtils";

function SignIn() {
  const [pwType, setPwType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [signInLoader, setSignInLoader] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setLoadingMsg("Redirecting...");
    await signInUsingRedirect();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toastError("Email is required");
      return;
    } else if (!password) {
      toastError("Password is required");
      return;
    }
    setSignInLoader(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await handleUserIdentification(response.user);

      setEmail("");
      setPassword("");
      setSignInLoader(false);
      navigate("/");
    } catch (error) {
      setSignInLoader(false);
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        return toastError("Invalid email or password");
      } else {
        return toastError("Something went wrong");
      }
    }
  };

  return (
    <MainBgLayout>
      {loading ? (
        <PageLoader loadingMsg={loadingMsg} />
      ) : (
        <>
          <div></div>
          <FormCardLayout onSubmitForm={handleSubmit}>
            <LogoLayout>Sign In</LogoLayout>
            <FlexColumnLayout>
              <InputLayout>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputLayout>
              <InputLayout>
                <input
                  type={pwType}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    pwType === "password"
                      ? setPwType("text")
                      : setPwType("password");
                  }}
                >
                  {pwType === "password" ? (
                    <IoEyeOutline />
                  ) : (
                    <IoEyeOffOutline />
                  )}
                </button>
              </InputLayout>
            </FlexColumnLayout>
            <ButtonLayout buttonType="submit">
              {signInLoader ? <DotLoader /> : "Sign In"}
            </ButtonLayout>
            <LinksLayout>
              <p>
                <Link to="/forgotpassword">Forget Password ?</Link>
                <br />
                Don't have an account? <Link to="/signup"> Register</Link>
              </p>
            </LinksLayout>
            <DividerLayout />
            <GoogleButtonLayout onClickButton={handleGoogleLogin}>
              <FcGoogle />
              <p>Sign In With Google</p>
            </GoogleButtonLayout>
          </FormCardLayout>
        </>
      )}
    </MainBgLayout>
  );
}

export default SignIn;
