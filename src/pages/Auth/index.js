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
  ButtonLayout,
  FlexColumnLayout,
  FormCardLayout,
  GoogleButtonLayout,
  LogoLayout,
  MainBgLayout,
} from "../../utils/LayoutUtils";

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
    <MainBgLayout>
      {loading ? (
        <PageLoader loadingMsg={loadingMsg} />
      ) : (
        <>
          <div></div>
          <FormCardLayout as="div">
            <LogoLayout>We Chat</LogoLayout>
            <FlexColumnLayout>
              <GoogleButtonLayout onClickButton={handleGoogleLogin}>
                <FcGoogle />
                <p>Sign In With Google</p>
              </GoogleButtonLayout>
              <ButtonLayout
                buttonType="button"
                style={{ color: "#ffffff", backgroundColor: "var(--primary)" }}
              >
                <Link to="/signin">
                  <p>Sign In With Email</p>
                </Link>
              </ButtonLayout>
            </FlexColumnLayout>
          </FormCardLayout>
        </>
      )}
    </MainBgLayout>
  );
};

export default Auth;
