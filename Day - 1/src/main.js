import "./style.css";
import gsap from "gsap";


let count = 0;

const loaderCount = document.querySelector(".loaderCount h1");

const interval = setInterval(() => {
  count++;
  loaderCount.innerHTML = `${count}%`

  if(count === 100) {
    clearInterval(interval);
    landingAnimation();
  }
}, 20);

function landingAnimation() {
  const tl = gsap.timeline();

  tl.to(".loaderCount", {
    opacity: 0,
    duration: 1.6,
    ease: "power3.out"
  }).to(".loader", {
    yPercent: -100,
    duration: 1.2,
    ease: 'expo.out'
  }, "-=0.9").from(".background img", {
    scale: 1.2,
    duration: 1.3,
    ease: 'expo.out'
  }, "-=0.87").from('.heading h1', {
    yPercent: 100,
    duration: 1.2,
    ease: "expo.out"
  }, "-=0.8").from('.subheading h2', {
    yPercent: 100,
    duration: 1.2,
    ease: "expo.out"
  }, "-=0.77");
}