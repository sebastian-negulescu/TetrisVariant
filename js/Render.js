function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOn) {
    pWindow.draw();
    // sWindow.draw();
    // lWindow.draw();
    // draw pieces
    for (let i = 0; i < pieces.length; i ++) {
      pieces[i].draw();
    }
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '50px pixellated';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Play Game?', pWindow.width / 2, pWindow.height / 2);
    ctx.font = '30px pixellated';
    ctx.fillText('score: ' + score, pWindow.width / 2, pWindow.height / 2 + 50);
    ctx.fillText('high score: ' + highScore, pWindow.width / 2, pWindow.height / 2 + 100);
  }
  /*
  if (gameOver) {
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', pWindow.x + pWindow.width / 2, pWindow.y + pWindow.height + 50);
    ctx.stroke();
  }
  */
  requestAnimationFrame(animate);
}

animate();
