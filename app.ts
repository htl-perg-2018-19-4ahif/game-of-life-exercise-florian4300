window.onload = () => {
  const boardSize = 800;
  const cellSize = 4;
  let cells: number[][] = new Array(boardSize / cellSize);

  const intialAliveCellsPercentage = 3;


  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  prepareBoard();
  setInterval(draw, 500);


  function draw() {

    let help = new Array(boardSize / cellSize);
    for (let i = 0; i < help.length; i++) {
      help[i] = new Array(boardSize / cellSize);

    }

    for (let i = 0; i < help.length; i++) {
      for (let j = 0; j < help[i].length; j++) {
        help[i][j] = 0;
      }
    }


    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {

        let neighbors = countNeighbors(i, j);
        if (neighbors < 2 || neighbors > 3) {
          help[i][j] = 0;
        } else {
          help[i][j] = 1;
        }

      }
    }
    ctx.clearRect(0, 0, boardSize, boardSize);
    cells = help;
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j] == 1) {
          ctx.fillRect((i * cellSize), (j * cellSize), cellSize, cellSize);
        }
      }
    }

  }
  function countNeighbors(i, j) {
    let count = 0;

    if (j != 0) {
      count += cells[i][j - 1];

      if (i != 199) {
        count += cells[i + 1][j - 1];
      }


    }
    if (i != 199 && j != 199) {
      count += cells[i + 1][j + 1];
    }
    if (i != 199) {
      count += cells[i + 1][j];

    }

    if (j != 199) {
      count += cells[i][j + 1];

    }
    if (i != 0) {
      if (j != 199) {
        count += cells[i - 1][j + 1];
      }
      count += cells[i - 1][j];
    }


    return count;
  }
  function prepareBoard() {

    for (let i = 0; i < cells.length; i++) {
      cells[i] = new Array(boardSize / cellSize);

    }

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        cells[i][j] = 0;
      }
    }
    let aliveCells = 0;
    while (aliveCells < ((boardSize / cellSize) * (boardSize / cellSize)) * (intialAliveCellsPercentage / 100)) {
      let coordinate = { x: Math.floor(Math.random() * cells.length), y: Math.floor(Math.random() * cells.length) };
      if (cells[coordinate.x][coordinate.y] == 0) {
        cells[coordinate.x][coordinate.y] = 1;
        aliveCells++;

      }
    }
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j] == 1) {
          ctx.fillRect((i * cellSize), (j * cellSize), cellSize, cellSize);
        }
      }
    }

  }
};