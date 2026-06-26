import "./style.css";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const img = document.querySelector(".specialImage");
const img2 = document.querySelector(".imageShow img");

img.addEventListener("click", () => {
  const state = Flip.getState(img);
  const state2 = Flip.getState(img2);

  document.querySelector(".imageGallery").appendChild(img2);
  document.querySelector(".imageShow").appendChild(img);

  Flip.from(state, {
    duration: 1.3,
    ease: "power3.inOut",
    scale: true
  });

  Flip.from(state2, {
    duration: 1.3,
    ease: "power3.inOut",
    scale: true
  })
});
