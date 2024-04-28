import { useLayoutEffect, useState } from "react";

export default function useWindowResize() {
  const [windowSize, setWindowSize] = useState(0);

  function handleResize() {
    setWindowSize(
      window.innerWidth,
    );
  }

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    console.log(windowSize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}