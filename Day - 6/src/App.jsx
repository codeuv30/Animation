import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimateOnX from "./components/AnimateOnX";
import { AnimatePresence, motion } from "motion/react";

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? "Close" : "Open"}</button>
        <AnimatePresence>
      {show && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0, y: 300 }}
            className="box"
          ></motion.div>
        )}
        </AnimatePresence>
    </div>
  );
};

export default App;
