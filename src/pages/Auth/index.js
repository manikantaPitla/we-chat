import React, {
  useState,
  // useEffect
} from "react";
import {
  // useNavigate,
  Link,
} from "react-router-dom";
// import { getRedirectResult } from "firebase/auth";
// import { auth } from "../../firebase";
import {
  PageLoader,
  // toastError
} from "../../utils/componentUtils";
import {
  //   handleUserIdentification,
  signInUsingRedirect,
} from "../../utils/firebaseUtils";

import { FcGoogle } from "react-icons/fc";

import {
  MainContainer,
  LoginCard,
  ButtonContainer,
  Button,
} from "./styledComponent";

import pageLogo from "../../assets/svg/page-logo.svg";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const handleRedirectResult = async () => {
  //       console.log("running use effect code");
  //       try {
  //         const result = await getRedirectResult(auth);
  //         console.log(result);
  //         if (result !== null) {
  //           console.log("result exists");
  //           setLoadingMsg("Just a moment, we're getting you in!");
  //           const data = await handleUserIdentification(result.user);
  //           console.log(data);
  //           setLoading(false);
  //           navigate("/");
  //         } else {
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         setLoading(false);
  //         toastError("Something went wrong");
  //       }
  //       setLoadingMsg("");
  //     };

  //     handleRedirectResult();
  //   }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setLoadingMsg("Redirecting...");
    await signInUsingRedirect();
  };

  return (
    <MainContainer>
      {loading ? (
        <PageLoader loadingMsg={loadingMsg} />
      ) : (
        <>
          <div></div>
          <LoginCard>
            <div>
              <img className="page-logo" src={pageLogo} alt="Logo" />
              <h1>We Chat</h1>
            </div>
            <ButtonContainer>
              <Button onClick={handleGoogleLogin}>
                <FcGoogle />
                <p>Sign In With Google</p>
              </Button>
              <Button
                style={{ color: "#ffffff", backgroundColor: "var(--primary)" }}
              >
                <Link to="/signin">
                  <p>Sign In With Email</p>
                </Link>
              </Button>
            </ButtonContainer>
          </LoginCard>
        </>
      )}
    </MainContainer>
  );
};

export default Auth;
