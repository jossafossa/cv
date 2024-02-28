export default class Bubble {
  constructor(settings) {
    settings = Object.assign(
      {
        smoothFactor: 1,
        element: document.documentElement,
        delay: 0,
        background: false,
      },
      settings
    );
    this.element = settings.element;
    this.delay = settings.delay;
    this.smoothFactor = settings.smoothFactor;
    this.background = settings.background;

    this.delayBuffer = new Array(this.delay).fill([0, 0]);
    this.smoothBuffer = [];
    document.body.addEventListener("pointermove", (e) => {
      this.pos = {
        x: e.x,
        y: e.y,
      };

      if (this.smoothFactor === 1) {
        this.update(this.pos);
      }
    });

    if (this.smoothFactor > 1) {
      this.loop();
    }
  }

  loop() {
    this.update(this.pos);
    window.requestAnimationFrame((e) => this.loop());
  }

  smooth(x, y) {
    this.smoothBuffer.push([x, y]);
    if (this.smoothBuffer.length > this.smoothFactor) {
      this.smoothBuffer.shift();
    }
    return this.smoothBuffer.reduce((a, c) => [a[0] + c[0], a[1] + c[1]]);
  }

  update(pos = false) {
    if (pos === false) {
      return;
    }

    let { x, y } = pos;

    [x, y] = this.smooth(x, y);

    // setup delay
    this.delayBuffer.push([x, y]);
    [x, y] = this.delayBuffer.shift();

    [x, y] = [x / this.smoothFactor, y / this.smoothFactor];

    // 		// calc rotation using old and new pos
    // 		if ( this.oldPos ) {
    // 			const dx = x - this.oldPos.x;
    // 			const dy = y - this.oldPos.y;
    // 			const rotation = Math.atan2( dy, dx ) * 180 / Math.PI;
    // 			this.element.style.setProperty( '--angle', `${ rotation }deg` );
    // 		}

    // 		// calc width using old and new pos
    // 		if ( this.oldPos ) {
    // 			const dx = x - this.oldPos.x;
    // 			const dy = y - this.oldPos.y;
    // 			const width = Math.sqrt( dx * dx + dy * dy );
    // 			this.element.style.setProperty( '--width', `${ width }px` );
    // 		}

    this.element.style.setProperty("--x", `${x}px`);
    this.element.style.setProperty("--y", `${y}px`);

    this.element.style.setProperty("--delay", `${(1000 / 60) * this.delay}ms`);

    if (this.background) {
      this.element.style.setProperty("--background", this.background(x, y));
    }

    this.oldPos = { x, y };
  }
}
