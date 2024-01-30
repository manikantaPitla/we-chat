import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import pageLogo from "../../assets/svg/page-logo.svg";
import {
  MainContainer,
  FormContainer,
  InputElement,
  FlexColumn,
  ButtonEl,
  LinksContainer,
  LogoContainer,
} from "./styledComponent";

import { toastError, DotLoader } from "../../utils/componentUtils";
import { handleUserIdentification } from "../../utils/firebaseUtils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

function SignUp() {
  const [pwType, setPwType] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password && !name && !email) {
      toastError("All Fields Required!");
      return;
    } else if (!email) {
      toastError("Email is required!");
      return;
    } else if (!name) {
      toastError("Name is required!");
      return;
    } else if (!password) {
      toastError("Password is required!");
      return;
    }

    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      await updateProfile(user, {
        displayName: name,
      });

      await handleUserIdentification(user);

      setEmail("");
      setName("");
      setPassword("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        return toastError("Password should be at least 6 characters");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        return toastError("Email already in use");
      }
    }
  };

  return (
    <MainContainer>
      <div></div>
      <FormContainer onSubmit={handleSubmit}>
        <LogoContainer style={{ alignSelf: "center" }}>
          <img className="page-logo" src={pageLogo} alt="Logo" />
          <h1>Sign Up</h1>
        </LogoContainer>
        <FlexColumn>
          <InputElement>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputElement>
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
              {pwType === "password" ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </InputElement>
        </FlexColumn>
        <ButtonEl type="submit">
          {loading ? <DotLoader /> : "Create Account"}
        </ButtonEl>
        <LinksContainer>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </LinksContainer>
      </FormContainer>
    </MainContainer>
  );
}

export default SignUp;
