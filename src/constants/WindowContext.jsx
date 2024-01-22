import { createContext, useEffect, useState } from "react";

export const Window = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', setWindowWidth);

    //clean up function
    return () => {
      window.removeEventListener('resize', setWindowWidth)
    };
  }, []);

  return (
    <Window.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </Window.Provider>
  );
}