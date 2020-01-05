// get canvas and context
const canvas = document.querySelector('#Canvas');
// make canvas width and height dependent on the scale
canvas.width = 250;
canvas.height = 500;
const ctx = canvas.getContext('2d');

// create the speed at which the block falls
let freq = 1000;

// game is running
let gameOn = false;

// create the scale of the game
const scale = 25;
const gap  = scale * 4;

let gameOver = false;
let score = 0;
let highScore = 0;

// create the player window
const pWindow = new GameWindow(scale * 10, scale * 20, 0, 0);

// EVERYTHING RELATIVE TO THE PLAYER WINDOW

// create the next piece window

/*
// create the score window
const sWindow = new DataWindow(scale * 10, scale * 5, pWindow.x + pWindow.width + gap, pWindow.y, 'score');
// create the lines cleared window
const lWindow = new DataWindow(scale * 10, scale * 5, pWindow.x + pWindow.width + gap, pWindow.y + sWindow.height + gap, 'lines');
*/

// create the types of pieces array
const types = ['l', 'j', 't', 's', 'z', 'i', 'o'];

function randEl(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/*
// declare & initialize the list of pieces
const pieces = [new Piece(pWindow.x + pWindow.width / 2, pWindow.y, randEl(types))];

// make the collision array
let space = new Array(pWindow.height / scale);
for (let i = 0; i < pWindow.height / scale; i ++) {
  let temp = new Array(pWindow.width / scale);
  for (let j = 0; j < pWindow.width / scale; j ++) {
    // put in all empty
    temp[j] = 0; // 0 is empty, 1 is occupied
  }
  space[i] = temp;
}
*/

let pieces = [];
let space = [];

function init() {
  score = 0;

  // declare & initialize the list of pieces
  pieces = [new Piece(pWindow.x + pWindow.width / 2, pWindow.y, randEl(types))];

  // make the collision array
  space = new Array(pWindow.height / scale);
  for (let i = 0; i < pWindow.height / scale; i ++) {
    let temp = new Array(pWindow.width / scale);
    for (let j = 0; j < pWindow.width / scale; j ++) {
      // put in all empty
      temp[j] = 0; // 0 is empty, 1 is occupied
    }
    space[i] = temp;
  }
}

function gameLoop() {
  const cPiece = pieces[pieces.length - 1];

  if (!collisionDetect(cPiece, 2)) {
    cPiece.moving = false;
  }

  if (cPiece.moving) { // move the piece
    cPiece.y += scale;
  } else { // create a new piece
    // if not moving, add it to the space array
    // space[(cPiece.y - pWindow.y) / scale][(cPiece.x - pWindow.x) / scale] = 1;

    // check if a line is full, if so, then clear it

    const pieceHeight = cPiece.orientation.length;
    const pieceLength = cPiece.orientation[0].length;

    const refY = Math.ceil(pieceHeight / 2 - 1);
    const refX = Math.floor(pieceLength / 2);

    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        // put a 1 in the space array
        if (cPiece.orientation[i][j] === 1) {
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);
          space[posY][posX] = 1;
        }
      }
    }
    // check if you CAN create a new piece
    // not perfect yet, need to check the spawn location for the next piece
    let nPiece = new Piece(pWindow.x + pWindow.width / 2, pWindow.y, randEl(types));
    let createable = true;

    const nPieceHeight = nPiece.orientation.length;
    const nPieceLength = nPiece.orientation[0].length;

    const nRefY = Math.ceil(nPieceHeight / 2 - 1);
    const nRefX = Math.floor(nPieceLength / 2);

    for (let i = 0; i < nPieceHeight; i ++) {
      for(let j = 0; j < nPieceLength; j ++) {
        if (nPiece.orientation[i][j] === 1) {
          const nPosY = (nPiece.y - pWindow.y) / scale - (nRefY - i); // hard maths
          const nPosX = (nPiece.x - pWindow.x) / scale - (nRefX - j);
          if (space[nPosY][nPosX] === 1) {
            createable = false;
          }
        }
      }
    }
    if (createable) {
      pieces.push(nPiece);
    } else {
      // player lost the game
      gameOn = false;
      updateScore();
    }
  }
}

function updateScore() {
  // find out how many squares were filled
  let cScore = 0;
  for (let i = 0; i < space.length; i ++) {
    for (let j = 0; j < space.length; j ++) {
      if (space[i][j] === 1) {
        cScore ++;
      }
    }
  }
  score = cScore;
  if (score > highScore) {
    highScore = score;
  }
}

const initDate = new Date();
let oldTime = initDate.getTime();
let currTime = oldTime;

setInterval(function() {
  if (gameOn) {
    const newDate = new Date();
    if (currTime - oldTime >= freq) {
      gameLoop(); // calls gameLoop() at the desired frequency
      oldTime = currTime;
    }
    currTime = newDate.getTime();
  }
}, 60/1000); // runs at 60 times per second
