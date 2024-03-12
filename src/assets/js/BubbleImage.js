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
    let sum = this.buffer.reduce((a, c) => a + c);
    return sum / this.buffer.length;
  }
}

/**
 * SmoothVectorBuffer
 * Same as SmoothBuffer but for vectors
 */
class SmoothVectorBuffer {
  constructor(size) {
    this.x = new SmoothBuffer(size);
    this.y = new SmoothBuffer(size);
  }
  smooth({ x, y }) {
    return { x: this.x.smooth(x), y: this.y.smooth(y) };
  }
}

export default class BubbleImage {
  constructor(root, settings = {}) {
    settings = Object.assign(
      {
        size: 1000,
        images: [],
      },
      settings
    );

    this.root = root;
    this.images = [...this.root.children];
    this.current = 0;
    this.next = 1;
    this.positions = new SmoothVectorBuffer(10);

    this.init();
    this.loop();

    document.addEventListener("pointermove", (e) => this.setPos(e));
    document.addEventListener("pointerdown", (e) => this.spawnNext(e));
  }

  // initial spawn
  init() {
    this.root.classList.add("bubble-image");
    this.pos = this.getRandomPos();
    this.image = this.spawn(this.pos);

    this.spawnNext();
  }

  loop() {
    this.update();
    requestAnimationFrame((e) => this.loop());
  }

  update() {
    let pos = this.positions.smooth(this.pos);
    this.move(this.image, pos);
  }

  setPos(e) {
    let box = this.root.getBoundingClientRect();
    this.pos = {
      x: e.clientX - box.left,
      y: e.clientY - box.top,
    };
  }

  spawnNext() {
    this.grow(this.image);
    this.image = this.spawn(this.pos);
  }

  getNext() {
    this.current = this.next;
    this.next++;
    this.next = this.next % this.images.length;
    console.log(this.next, this.images.length);
    let element = this.images[this.next].cloneNode(true);
    element.classList.add("inner");
    console.log(element);
    return element;
  }

  getRandomPos() {
    let box = this.root.getBoundingClientRect();
    let pos = {
      x: Math.random() * box.width,
      y: Math.random() * box.height,
    };
    return pos;
  }

  spawn(pos) {
    let image = this.getNext();
    this.root.append(image);

    this.move(image, pos);
    return image;
  }

  move(image, pos) {
    image.style.setProperty("--x", `${pos.x}px`);
    image.style.setProperty("--y", `${pos.y}px`);
  }

  grow(image) {
    image.classList.add("is-active");
    image.style.removeProperty("--x");
    image.style.removeProperty("--y");

    this.lastImage = image;
    setTimeout(() => {
      if (this.lastImage !== image) {
        image.remove();
      }
    }, 5000);
  }
}
