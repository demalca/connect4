/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix arrayconst
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  const top = document.createElement("tr"); //sets top row
  top.setAttribute("id", "column-top"); //sets id as column top to top row
  top.addEventListener("click", handleClick); //handleClick func on click event

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //creates top row tds
    headCell.setAttribute("id", x); //sets id as x
    top.append(headCell); //appends td element to top
  }
  htmlBoard.append(top); //appends top (tr element) to htmlBoard

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //sets rows
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //sets cell for row
      cell.setAttribute("id", `${y}-${x}`); //sets id depending on y-x position
      row.append(cell); //appends cells(td) to row
    }
    htmlBoard.append(row); //appends row (tr)to htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let y;
  for (y = 5; y >= 0; y--) {
    if (board[y][x] === null) return y;
    //from bottom to top find x's first y and drop piece
  }
  return;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let emptyCell = document.getElementById(`${y}-${x}`);
  let newPiece = document.createElement("div");
  newPiece.classList.add("piece", "p" + currPlayer);
  // currPlayer = 1 ? (player = "p1") : (player = "p2");
  emptyCell.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  document
    .getElementById("column-top")
    .removeEventListener("click", handleClick);

  setTimeout(function () {
    if (msg) {
      alert(msg);
    } else {
      alert("No more plays. Game has ended. Play again");
    }
  }, 100);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  console.log(y, x);
  // place piece in board and add to HTML table

  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;

  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    endGame(`Player ${currPlayer} has won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // board.some((y) => y.some((x) => console.log(x)));

  if (board.every((y) => y.every(Number))) {
    endGame();
  }

  // endGame();
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
