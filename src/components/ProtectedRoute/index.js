import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { PageLoader } from "../../utils/componentUtils";
import { handleUserIdentification } from "../../utils/firebaseUtils";
import { setUser, removeUser } from "../../features/authReducer";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleUserIdentification(user);
        // console.log(user)
        const userDocRef = doc(db, "users", user.uid);

        const unsubscribeUserDoc = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            dispatch(setUser(docSnapshot.data()));
          }
        });

        return () => {
          unsubscribeUserDoc();
        };
      } else {
        dispatch(removeUser());
        navigate("/auth");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  if (loading) {
    return <PageLoader loadingMsg="Loading..." />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
