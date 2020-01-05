// window object
class PlayerWindow {
  constructor (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}

class GameWindow extends PlayerWindow {
  constructor (width, height, x, y) {
    super (width, height, x, y);
  }

  // @override
  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // draw lines
    ctx.strokeStyle = '#FFFFFF';
    // vertical lines
    for (let i = 0; i <= this.width; i += scale) {
      ctx.moveTo(this.x + i, this.y);
      ctx.lineTo(this.x + i, this.y + this.height);
    }
    // horizontal lines
    for (let i = 0; i <= this.height; i += scale) {
      ctx.moveTo(this.x, this.y + i);
      ctx.lineTo(this.x + this.width, this.y + i);
    }
    ctx.stroke();
  }
}

class DataWindow extends PlayerWindow {
  constructor (width, height, x, y, title) {
    super (width, height, x, y);
    this.title = title;
    this.data = 0;
  }

  // @override
  draw() {
    ctx.beginPath();
    // draws box
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // draws text
    ctx.font = '20px Monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.title, this.x, this.y + 20); // make dependent on font size
    ctx.fillText(this.data, this.x, this.y + 20 * 3);
    ctx.stroke();
  }
}
