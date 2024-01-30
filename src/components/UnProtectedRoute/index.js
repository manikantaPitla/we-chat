// UnProtectedRoute.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { PageLoader } from "../../utils/componentUtils";
import { useNavigate } from "react-router-dom";

function UnProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);

      if (user) {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <PageLoader loadingMsg="Loading..." />;
  }

  return <>{children}</>;
}

export default UnProtectedRoute;
