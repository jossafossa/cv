class SmoothBuffer {
  constructor(size) {
    this.buffer = [];
    this.size = size;
  }
  smooth(value) {
    this.buffer.push(value);
    if (this.buffer.length > this.size) {
      this.buffer.shift();
    }
    let sum = this.buffer.reduce((a, c) => [a[0] + c[0], a[1] + c[1]]);
    return sum.map((v) => v / this.buffer.length);
  }
}

export default class Bulge {
  constructor(element, settings = {}) {
    settings = Object.assign(
      {
        size: 1000,
      },
      settings
    );
    this.size = settings.size;
    this.radius = this.size / 2;
    this.element = element;
    this.smoothBuffer = new SmoothBuffer(10);

    this.element.style.setProperty("--bulge-size", this.size + "px");

    this.bulge = this.getElement();
    this.element.appendChild(this.bulge);
    this.element.classList.add("bulge-container");

    let position = window
      .getComputedStyle(element)
      .getPropertyValue("position");
    if (!(position in ["absolute", "relative", "fixed"])) {
      this.element.style.position = "relative";
    }

    document.addEventListener("mousemove", (e) => this.setPos(e));
    document.addEventListener("touchstart", (e) => this.setPos(e));
    document.addEventListener("touchend", (e) => this.setPos(e));
    document.addEventListener("mousedown", (e) => this.setPos(e));
    document.addEventListener("mouseup", (e) => this.setPos(e));

    this.loop();
  }

  loop() {
    this.update();
    requestAnimationFrame((e) => this.loop());
  }

  getElement() {
    let el = document.createElement("span");
    el.classList.add("bulge");
    return el;
  }

  setPos(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }

  update() {
    let [x, y] = this.smoothBuffer.smooth([this.x, this.y]);
    let box = this.element.getBoundingClientRect();
    if (
      x - this.radius < box.right &&
      x + this.radius > box.left &&
      y - this.radius < box.bottom &&
      y + this.radius > box.top
    ) {
      let relX = x - box.left;
      let relY = y - box.top;
      this.hover(relX, relY);
      this.bulge.classList.add("is-active");
    } else {
      this.bulge.classList.remove("is-active");
    }
  }

  hover(x, y) {
    this.bulge.style.transform = `translate(${x}px, ${y}px )`;
  }
}
