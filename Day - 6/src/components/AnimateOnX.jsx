import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const AnimateOnX = ({ children }) => {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.to(containerRef.current, {
      x: 200,
      duration: 1,
      delay: 0.5,
    });
  }, { scope: containerRef.current });

  return <div ref={containerRef}>{children}</div>;
};

export default AnimateOnX;
