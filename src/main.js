import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import Ripple from "./assets/js/Ripple";
import Bulge from "./assets/js/Bulge";
import Bubble from "./assets/js/Bubble";

import { createApp } from "vue";
import App from "./App.vue";
import "font-awesome/css/font-awesome.min.css";
import "@/assets/css/style.scss";
// photoswipe
import "photoswipe/dist/photoswipe.css";

let app = createApp(App);
app.mount("#app");

let ripples = document.querySelectorAll(".has-ripple, .has-effect");
ripples.forEach((ripple) => {
  new Ripple(ripple, {
    doBounce: true,

    bounceOpacity: 0.5,
  });
});

let bulges = document.querySelectorAll(".has-bulge, .has-effect");
bulges.forEach((bulge) => {
  new Bulge(bulge, {
    size: 1000,
  });
});

const bubbles = 1;
const bubbleSmoothness = 1;
let i = 0;
// for (let i = 0; i < bubbles; i++) {
// const bubble = document.createElement("div");
// bubble.classList.add("bubble");
// document.body.append(bubble);

// new Bubble({
//   smoothFactor: bubbleSmoothness + i,
//   element: bubble,
//   delay: i,
//   background: (x, y) => {
//     return `rgba(255,255,255, ${1 - (1 / bubbles) * i})`;
//   },
// });
// }
document.body.addEventListener("pointerdown", (e) => {
  if (i > 20) return;
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  document.body.append(bubble);
  new Bubble({
    smoothFactor: bubbleSmoothness + i,
    element: bubble,
    delay: i,
    background: (x, y) => {
      return `rgba(255,255,255, ${1 - (1 / bubbles) * i})`;
    },
    startPosition: { x: e.x, y: e.y },
  });
  i++;
});

document.body.classList.remove("preload");
