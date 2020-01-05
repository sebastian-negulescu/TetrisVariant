class Piece {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.orientation = [];
    this.colour = '#000000'; // default to black
    switch (this.type) {
    case 'l':
      this.colour = '#0000FF';
      this.orientation = [[0, 0, 0],
                          [1, 1, 1],
                          [1, 0, 0]]; // center is [1][1]
      break;
    case 'j':
      this.colour = '#FFA500';
      this.orientation = [[0, 0, 0],
                          [1, 1, 1],
                          [0, 0, 1]];
      break;
    case 't':
      this.colour = '#FF00FF';
      this.orientation = [[0, 0, 0],
                          [1, 1, 1],
                          [0, 1, 0]];
      break;
    case 's':
      this.colour = '#00FF00';
      this.orientation = [[0, 0, 0],
                          [0, 1, 1],
                          [1, 1, 0]];
      break;
    case 'z':
      this.colour = '#FF0000';
      this.orientation = [[0, 0, 0],
                          [1, 1, 0],
                          [0, 1, 1]];
      break;
    case 'i':
      this.colour = '#00FFFF';
      this.orientation = [[0, 0, 0, 0],
                          [1, 1, 1, 1],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0]]; // center is [2][2], make it [1][1]
      break;
    case 'o':
      this.colour = '#FFFF00';
      this.orientation = [[1, 1],
                          [1, 1]]; // center is [1][1], make it [0][0], spawns over the bound
    }
    this.moving = true;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = this.colour;

    const refY = Math.ceil(this.orientation.length / 2 - 1); // reference points to find the midpoint of the tetronimo
    const refX = Math.floor(this.orientation[0].length / 2); // can use 0 since it's a square matrix

    for (let i = 0; i < this.orientation.length; i ++) {
      for (let j = 0; j < this.orientation[i].length; j ++) {
        // draw the block
        if (this.orientation[i][j] === 1) { // draw
          ctx.fillRect(this.x - (refX - j) * scale, this.y - (refY - i) * scale, scale, scale);
        }
      }
    }
    ctx.stroke();
  }
}
