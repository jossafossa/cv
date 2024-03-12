import { SmoothBuffer } from "./SmoothBuffer";

export default class ScrollAnimate {
  constructor(settings) {
    this.container = settings?.root || [];
    this.transformContainers = settings?.elements || [];

    this.smoothX = new SmoothBuffer(1);
    this.smoothY = new SmoothBuffer(1);

    console.log({
      container: this.container,
      transformContainers: this.transformContainers,
    });

    if (!this.container || !this.transformContainers) return;

    this.inViewPort = {};

    // this.container.addEventListener("scroll", (e) => this.update());

    let observer = new IntersectionObserver(
      (entries, observer) => {
        for (let entry of entries) {
          let element = entry.target;
          let id = element.dataset.tfId;
          let rect = entry.intersectionRect;
          if (rect.height === 0) {
            delete this.inViewPort[id];
          } else {
            this.inViewPort[id] = element;
          }
        }
      },
      {
        threshold: 0,
        root: this.container,
        rootMargin: "0px",
      }
    );

    for (let i = 0; i < this.transformContainers.length; i++) {
      let tf = this.transformContainers[i];
      tf.dataset.tfId = i;
      observer.observe(tf);
    }

    this.loop();
  }

  loop() {
    this.update();
    requestAnimationFrame((e) => this.loop());
  }

  update() {
    for (let element of Object.values(this.transformContainers)) {
      let box = element.getBoundingClientRect();
      let containerBox = this.container.getBoundingClientRect();

      let y =
        (containerBox.height - box.y) / (box.height + containerBox.height);
      y = this.smoothY.smooth(y);
      element.style.setProperty("--y", y);

      let x = (containerBox.width - box.x) / (box.width + containerBox.width);
      x = this.smoothX.smooth(x);
      element.style.setProperty("--x", x);
    }
  }
}
