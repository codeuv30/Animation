import "./style.css"
import gsap from "gsap";

let obj = {
  a: 0
};

gsap.to(".box", {
  delay: 0.6,
  duration: 1,
  onUpdate: function() {
    obj.a += 10;
    gsap.set(".box", { x: obj.a });
  }
});