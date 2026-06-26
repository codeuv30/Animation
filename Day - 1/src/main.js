import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.set('.imageDiv', { scale: 0.3 });

gsap.set(".content", { gap: "20rem" });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "top top",
    end: "top -100%",
    scrub: true,
    pin: true    
  }
});

tl.to(".imageDiv", {
  scale: 1,
  ease: "power4.out",
}).to(".content", {
  gap: "1rem"
}, "<");