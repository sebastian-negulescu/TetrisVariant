function collisionDetect(cPiece, dir) {
  const pieceHeight = cPiece.orientation.length;
  const pieceLength = cPiece.orientation[0].length;

  const refY = Math.ceil(pieceHeight / 2 - 1);
  const refX = Math.floor(pieceLength / 2);

  // simulate the rotation (for cases 4 & 5)
  let newOrientation = new Array(pieceHeight);
  for (let i = 0; i < newOrientation.length; i ++) {
    newOrientation[i] = new Array(pieceLength);
  }

  for (let i = 0; i < pieceHeight; i ++) {
    for (let j = 0; j < pieceLength; j ++) {
      newOrientation[newOrientation[j].length - 1 - j][i] = cPiece.orientation[i][j];
    }
  }

  switch (dir) {
  case 0: // up, not possible
    break;
  case 1: // right
    // individually check that each block can be moved 1 right
    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        if (cPiece.orientation[i][j] === 1) { // there is a block there, check if it can move
          // get its position in the entire array
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);
          if (posX >= space[posY].length - 1) {
            return false;
          } else if (space[posY][posX + 1] !== 0) {
            return false;
          }
        }
      }
    }
    break;
  case 2: // down
    // individually check that each block can be moved 1 down
    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        if (cPiece.orientation[i][j] === 1) { // there is a block there, check if it can move
          // get its position in the entire array
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);
          if (posY >= space.length - 1) { // checks if it's possible to move there, why is it only space.length - 1
            return false;
          } else if (space[posY + 1][posX] !== 0) { // checks if space is occupied or not
            return false;
          }
        }
      }
    }
    break;
  case 3: // left
    // individually check that each block can be moved 1 left
    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        if (cPiece.orientation[i][j] === 1) { // there is a block there, check if it can move
          // get its position in the entire array
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);
          if (posX <= 0) {
            return false;
          } else if (space[posY][posX - 1] !== 0) {
            return false;
          }
        }
      }
    }
    break;
  case 4: // rotate right
    for (let i = 0; i < pieceHeight; i ++) { // orientation is the same dimensions as newOrientation, can use pieceHeight and Length
      for (let j = 0; j < pieceLength; j ++) {
        // get the x and y values
        if (newOrientation[i][j] === 1) { // there is a block there, check if it's legal
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);

          if (posX < 0 || posX > space[0].length - 1 || posY > space.length - 1 || posY < 0) { // check if entire matrix is within bounds
            return false;
          } else if (space[posY][posX] === 1) { // check space
            return false;
          }
        }
      }
    }
    break;
  case 5: // rotate left
    for (let i = 0; i < pieceHeight; i ++) { // orientation is the same dimensions as newOrientation, can use pieceHeight and Length
      for (let j = 0; j < pieceLength; j ++) {
        // get the x and y values
        if (newOrientation[i][j] === 1) { // there is a block there, check if it's legal
          const posY = (cPiece.y - pWindow.y) / scale - (refY - i); // hard maths
          const posX = (cPiece.x - pWindow.x) / scale - (refX - j);
          // how to check if it's going to interfere? NEW COLLISION SYSTEM
          if (posX < 0 || posX > space[0].length - 1 || posY > space.length - 1 || posY < 0) { // check if entire matrix is within bounds
            return false;
          } else if (space[posY][posX] === 1) { // check space
            return false;
          }
        }
      }
    }
    break;
  }
  return true;
}
