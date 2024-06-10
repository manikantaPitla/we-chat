import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import pageLogo from "../../assets/svg/page-logo.svg";
import { PageLoader, toastError, DotLoader } from "../../utils/componentUtils";
import {
  handleUserIdentification,
  signInUsingRedirect,
} from "../../utils/firebaseUtils";

import {
  MainContainer,
  FormContainer,
  InputElement,
  FlexColumn,
  ButtonEl,
  LinksContainer,
  Button,
  Divider,
  LogoContainer,
} from "./styledComponent";

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
    <MainContainer>
      {loading ? (
        <PageLoader loadingMsg={loadingMsg} />
      ) : (
        <>
          <div></div>
          <FormContainer onSubmit={handleSubmit}>
            <LogoContainer>
              <img className="page-logo" src={pageLogo} alt="Logo" />
              <h1>Sign In</h1>
            </LogoContainer>
            <FlexColumn>
              <InputElement>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputElement>
              <InputElement>
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
              </InputElement>
            </FlexColumn>

            <ButtonEl type="submit">
              {signInLoader ? <DotLoader /> : "Sign In"}
            </ButtonEl>
            <LinksContainer>
              {/* <p>Forgot Password?</p> */}
              <p>
                Don't have an account? <Link to="/signup"> Register</Link>
              </p>
            </LinksContainer>
            <Divider>
              <hr />
              <p>OR</p>
              <hr />
            </Divider>
            <Button type="button" onClick={handleGoogleLogin}>
              <FcGoogle />
              <p>Sign In With Google</p>
            </Button>
          </FormContainer>
        </>
      )}
    </MainContainer>
  );
}

export default SignIn;
