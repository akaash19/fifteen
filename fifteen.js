"use strict";

//Javascript for puzzle page. Creates puzzle, allows user to
//shuffle board and play the game.

(function() {
  let rows = 4;
  let columns = 4;
  let grid = [];
  let blanksquare = {row:3, column:3};
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
  }

  window.onload = loadPage;

  // shortcut to get a DOM element by id
  function $(id) {
    return document.getElementById(id);
  }

  //redraws the puzzle
  function redraw() {
    clearPieces();
    drawPieces();
  }

  //draws all the puzzle pieces
  function drawPieces() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (grid[i][j]) {
          if (grid[i][j].classList.contains("validpiece")) {
              grid[i][j].classList.remove("validpiece");
          }
          grid[i][j].style.top = i * 100 + "px";
          grid[i][j].style.left = j * 100 + "px";
          if (valid(i, j)) {
              grid[i][j].classList.add("validpiece");
          }
          $("puzzle-area").appendChild(grid[i][j]);
        }
      }
    }
  }

  // clears all the puzzle pieces
  function clearPieces() {
    let pieces = $("puzzle-area").children;
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].parentElement.removeChild(pieces[i]);
    }
  }

  // checks whether the piece at row i and column j is a valid piece
  // meaning it can slide into the empty square. A piece is considered valid if
  // it is horizontally or vertically adjacent to the empty slot.
  // @param i: row of the piece
  // @param j: column of the piece
  // @return true if piece is a valid piece
  function valid(i, j) {
    if (Math.abs(i - blanksquare.row) == 1 &&  Math.abs(j - blanksquare.column) === 0 ||
      Math.abs(i - blanksquare.row) === 0 &&  Math.abs(j - blanksquare.column) == 1) {
      return true;
    } else {
      return false;
    }
  }

  // loads the page
  function loadPage() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (i * rows + j + 1 < 16) {
          let piece = document.createElement("div");
          piece.className ="piece";
          piece.style.backgroundImage = "url('background.jpg')";
          piece.style.backgroundSize = "400px 400px";
          piece.style.backgroundPosition = (0 - j * 100) + "px " + (0 - i * 100) + "px";
          piece.style.overflow = "hidden";
          piece.style.fontSize = "40pt";
          piece.innerHTML = i * 4 + j + 1;
          piece.onclick = squareClicked;
          grid[i][j] = piece;
        } else {
          grid[i][j] === null;
        }
      }
    }
    $("shuffle-button").onclick = shuffle;
    addImage();
    drawPieces();
  }

  // checks whether the piece that was clicked is valid.
  // if it is valid, slide it into the empty slot.
  function squareClicked() {
    let row = parseInt(this.style.top) / 100;
    let column = parseInt(this.style.left) / 100;
    if (valid(row, column)) {
      makeMove(row, column);
    }
  }

  // move the piece at row row and column column into the empty slot
  function makeMove(row, column) {
    grid[blanksquare.row][blanksquare.column] = grid[row][column];
    grid[row][column] = null;
    blanksquare.row = row;
    blanksquare.column = column;
    redraw();
  }

  // shuffle the puzzle
  function shuffle() {
    for (let i = 0; i < 1000; i++) {
      let neighbors = [];
      if (blanksquare.row + 1 < rows) {
        neighbors.push({"row" : blanksquare.row + 1, "column" : blanksquare.column});
      }
      if (blanksquare.row - 1 >= 0) {
        neighbors.push({"row" : blanksquare.row - 1, "column" : blanksquare.column});
      }
      if (blanksquare.column + 1 < columns) {
        neighbors.push({"row" : blanksquare.row, "column" : blanksquare.column + 1});
      }
      if (blanksquare.column - 1 >= 0) {
        neighbors.push({"row" : blanksquare.row, "column" : blanksquare.column - 1});
      }
      let rand = parseInt(Math.random() * neighbors.length);
      makeMove(neighbors[rand].row, neighbors[rand].column);
    }
  }

  // adds the copyright info of the image
  function addImage() {
    $("copyright-info").innerHTML = "&copy; U.S. Soccer";
  }
})();
