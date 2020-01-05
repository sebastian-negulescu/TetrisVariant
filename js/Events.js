document.addEventListener('keydown', function(e) {
  let cPiece;
  let pieceHeight;
  let pieceLength;

  if (gameOn) {
    cPiece = pieces[pieces.length - 1];
    pieceHeight = cPiece.orientation.length;
    pieceLength = cPiece.orientation[0].length;
  }

  if (e.keyCode === 13) { // enter
    if (!gameOn) {
      gameOn = true;
      init();
    }
  }

  if (e.keyCode === 37) { // left
    // see if it goes out of bounds
    if (collisionDetect(cPiece, 3)) {
      cPiece.x -= scale;
    }
  }

  if (e.keyCode === 39) { // right
    // see if it will go out of bounds
    if (collisionDetect(cPiece, 1)){
      cPiece.x += scale;
    }
  }

  if (e.keyCode === 83) { // s
    freq = 50;
  }

  if (e.keyCode === 87) { // w
    // store tetronimo
  }

  if (e.keyCode === 65) { // a
    // rotate left
    let newOrientation = new Array(pieceHeight);
    for (let i = 0; i < newOrientation.length; i ++) {
      newOrientation[i] = new Array(pieceLength);
    }

    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        newOrientation[newOrientation[j].length - 1 - j][i] = cPiece.orientation[i][j];
      }
    }

    if (collisionDetect(cPiece, 5)) {
      // deep copy the array
      cPiece.orientation = Array.from(newOrientation);
    }
  }

  if (e.keyCode === 68) { // d
    // rotate the piece right
    let newOrientation = new Array(pieceHeight);
    for (let i = 0; i < newOrientation.length; i ++) {
      newOrientation[i] = new Array(pieceLength);
    }

    for (let i = 0; i < pieceHeight; i ++) {
      for (let j = 0; j < pieceLength; j ++) {
        newOrientation[j][newOrientation[j].length - 1 - i] = cPiece.orientation[i][j];
      }
    }
    if (collisionDetect(cPiece, 4)) {
      // deep copy the array
      cPiece.orientation = Array.from(newOrientation);
    }
  }
});

document.addEventListener('keyup', function (e) {
  if (e.keyCode === 83) {
    freq = 1000;
  }
});
