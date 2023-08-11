// Game state variables
const board = [];
const rows = 6;
const columns = 7;
let currentPlayer = 'red';

// Create the game board and add click event listeners
function makeBoard() {
  const boardElement = document.querySelector('.board');
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.column = col;
      cell.dataset.row = row;
      cell.addEventListener('click', () => makeMove(col));
      boardElement.appendChild(cell);
      board[row][col] = cell;
    }
  }
}

// Check for a win in all directions
function checkForWin(row, col) {
  const directions = [
    [-1, 0], // Up
    [-1, 1], // Up-right
    [0, 1],  // Right
    [1, 1],  // Down-right
    [1, 0],  // Down
    [1, -1], // Down-left
    [0, -1], // Left
    [-1, -1] // Up-left
  ];

  for (const direction of directions) {
    let count = 1;
    for (const [dx, dy] of [direction, direction.map(x => -x)]) {
      let newRow = row + dx;
      let newCol = col + dy;
      while (isValidCell(newRow, newCol) && board[newRow][newCol].classList.contains(currentPlayer)) {
        count++;
        newRow += dx;
        newCol += dy;
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

// Check if a cell is within the board boundaries
function isValidCell(row, col) {
  return row >= 0 && row < rows && col >= 0 && col < columns;
}

// Handle player move
function makeMove(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col].classList.contains('red') && !board[row][col].classList.contains('Blue')) {
      board[row][col].classList.add(currentPlayer);
      if (checkForWin(row, col)) {
        setTimeout(() => {
          alert(`${currentPlayer.toUpperCase()} wins!`);
          resetBoard();
        }, 100);
      } else {
        currentPlayer = currentPlayer === 'red' ? 'Blue' : 'red';
      }
      return;
    }
  }
}

// Resets the board
function resetBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      board[row][col].classList.remove('red', 'Blue');
    }
  }
  currentPlayer = 'red';
}

makeBoard();
  
  
  