import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import Ripple from "./assets/js/Ripple";
import Bulge from "./assets/js/Bulge";
import Bubble from "./assets/js/Bubble";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

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

const bubbles = 4;
const bubbleSmoothness = 5;

for (let i = 0; i < bubbles; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  document.body.append(bubble);

  const opacity = (1 / bubbles) * (bubbles - i);

  new Bubble({
    smoothFactor: bubbleSmoothness + i,
    element: bubble,
    delay: i,
    background: (x, y) => {
      return `rgba(255,255,255, ${1 - (1 / bubbles) * i})`;

      // let h =  Math.floor((x / 20) % 360);
      // let s =  Math.floor((x / 50) % 100);
      // let l = Math.floor((x+y / 80) % 100);
      // return `hsl(${h},${s}%,${l}%)`
    },
  });
}
