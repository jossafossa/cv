// ripple
export default class Ripple {
  constructor(element, settings = {}) {
    settings = Object.assign(
      {
        doBounce: true,
        bounceOpacity: 0.2,
        time: 1600,
      },
      settings
    );
    this.doBounce = settings.doBounce;
    this.bounceOpacity = settings.bounceOpacity;
    this.time = settings.time;
    this.element = element;

    this.element.addEventListener("click", (e) => {
      this.doRipples(e);
    });
  }

  doRipples(e, bounce = true) {
    let box = this.element.getBoundingClientRect();
    let x = e.clientX - box.left;
    let y = e.clientY - box.top;
    this.element.classList.add("ripple-container");
    this.ripple(x, y);
    if (this.doBounce) {
      for (let i = 0; i < 1; i++) {
        this.ripple(box.width * i + box.width * 2 - x, y, this.bounceOpacity);
        this.ripple(box.width * -i + -x, y, this.bounceOpacity);
        this.ripple(x, box.height * i + box.height * 2 - y, this.bounceOpacity);
        this.ripple(x, box.height * -i + -y, this.bounceOpacity);
      }
    }
  }

  ripple(x, y, t = 1) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.element.appendChild(ripple);

    ripple.style.top = y + "px";
    ripple.style.left = x + "px";
    ripple.style.backgroundColor = `rgba(255,255,255,${0.05 * t})`;

    setTimeout((e) => {
      ripple.remove();
    }, this.time);
  }
}
