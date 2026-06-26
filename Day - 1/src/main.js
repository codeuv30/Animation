import "./style.css";
import gsap from "gsap";

let a = 0;

/* Callback functions */

gsap.to(".box", {
  x: 500,
  duration: 1.4,
  delay: 0.6,
  ease: "power2.inOut",

  onUpdate: () => {
    a+=1;
    console.log('FRAME', a);
  },
});
