export class SmoothBuffer {
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
