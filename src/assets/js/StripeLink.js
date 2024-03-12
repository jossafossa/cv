export default class StripeEffect {
  constructor(elements, settings) {
    let defaultSettings = {
      time: 500,
      outDelay: 0,
      class: "stripe",
      inverted: false,
      copyContent: false,
      contentCallback: null,
    };

    settings = Object.assign(defaultSettings, settings);
    if (typeof elements === "string") {
      this.elements = document.querySelectorAll(elements);
    } else if (elements instanceof HTMLElement) {
      this.elements = [elements];
    } else if (elements instanceof NodeList) {
      this.elements = elements;
    }
    this.effects = {};
    let index = 0;
    this.time = settings["time"];
    this.outDelay = settings["outDelay"];
    this.class = settings.class;
    this.inverted = settings.inverted;
    this.copyContent = settings.copyContent;
    this.contentCallback = settings.contentCallback;
    for (let element of this.elements) {
      element.dataset.content = element.textContent;
      element.classList.add(this.class);
      element.dataset.effectIndex = index;
      if (!this.inverted) {
        element.addEventListener("pointerenter", () => this.enter(element));
        element.addEventListener("pointerleave", () => this.leave(element));
      } else {
        element.addEventListener("pointerenter", () => this.leave(element));
        element.addEventListener("pointerleave", () => this.enter(element));
      }
      index++;

      if (this.inverted) {
        this.enter(element);
      }
    }
  }

  enter(element) {
    let content = element.dataset.content;
    let span = document.createElement("span");
    if (this.copyContent) span.textContent = content;

    if (this.contentCallback) {
      span.innerHTML = this.contentCallback(element);
    }

    span.classList.add("effect");
    span.style.transitionDuration = this.time / 1000 + "s";
    span.style.setProperty("--time", this.time + "ms");
    element.appendChild(span);
    this.effects[element.dataset.effectIndex] = span;
    setTimeout((e) => {
      span.classList.add("animate-in");
    }, 10);
  }

  leave(element) {
    let index = element.dataset.effectIndex;
    if (index in this.effects) {
      let span = this.effects[index];
      setTimeout((e) => {
        span.classList.add("animate-out");
      }, this.outDelay);
      setTimeout((e) => {
        span.parentNode.removeChild(span);
      }, this.time + this.outDelay);
    }
  }
}
