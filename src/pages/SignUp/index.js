import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { toastError, DotLoader } from "../../utils/componentUtils";
import { handleUserIdentification } from "../../utils/firebaseUtils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import {
  MainBgLayout,
  FormCardLayout,
  LogoLayout,
  InputLayout,
  FlexColumnLayout,
  ButtonLayout,
  LinksLayout,
} from "../../utils/LayoutUtils";

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
    <MainBgLayout>
      <div></div>
      <FormCardLayout onSubmitForm={handleSubmit}>
        <LogoLayout>Sign Up</LogoLayout>
        <FlexColumnLayout>
          <InputLayout>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputLayout>
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
              {pwType === "password" ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </InputLayout>
        </FlexColumnLayout>
        <ButtonLayout buttonType="submit">
          {loading ? <DotLoader /> : "Create Account"}
        </ButtonLayout>
        <LinksLayout>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </LinksLayout>
      </FormCardLayout>
    </MainBgLayout>
  );
}

export default SignUp;
