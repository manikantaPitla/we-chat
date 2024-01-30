import React, { createContext, useContext, useState, useEffect } from "react";

const WindowWidthContext = createContext(null);

export const useWindowWidth = () => {
  const context = useContext(WindowWidthContext);
  if (!context) {
    throw new Error("useWindowWidth must be used within a WindowWidthProvider");
  }
  return context;
};

const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export default WindowWidthProvider;
