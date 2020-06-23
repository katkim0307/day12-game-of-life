class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  // Create and return an 2D Array with `this.height` as rows and `this.width` as cols.
  makeBoard() {
    let array = [];
    for(let row=0; row<this.height; row++){
      let innerArr=[];
      for(let col=0; col<this.width; col++){
        innerArr.push(0);
      }
      array.push(innerArr);
    }
    return array;
  }

  // Returns the cell value for the given row and col coordinates. 
  getCell(row, col) {
    let board = this.board;
    if (row>=0 && col>=0 && row<this.height && col<this.width) {
      return board[row][col];
    }
  }

  // Sets a new value for a cell in the given row and col coordinates. 
  setCell(value, row, col) {
    let board = this.board;
    if (row>=0 && col>=0 && row<this.height && col<this.width) {
      board[row][col] = value;
    }
  }

  // toggle a cell value between dead (0) and alive (1).
  // i.e. change true to false, false to true, 1 to 0, 0 to 1 (like a switch).
  toggleCell(row, col) {
    this.getCell(row, col) === 0 ? this.setCell(1, row, col) : this.setCell(0, row, col);
 }

  //Return the number of living neighbors around a given coordinate.
  livingNeighbors(row, col) {
    let count = 0;
    
    for(let r=row-1; r<=row+1; r++){
      for(let c=col-1; c<=col+1; c++){
        if(r>=0 && c>=0 && r<this.height && c<this.width) {
          if(r !== row || c !== col) {
            if(this.getCell(r, c)!==0) {
              count++;
            }
          }
        }
      }
    }
    return count;
  }

  // Given the present board, apply the rules to generate a new board
  // 1. Count alive neighbors for all cells
  // 2. Set the next state of all cells in newBoard based on their current alive neighbors
  tick() {
    const newBoard = this.makeBoard();

    for(let r=0; r<this.height; r++){
      for(let c=0; c<this.width; c++){
        newBoard[r][c] = this.getCell(r, c);
        if(this.getCell(r, c) === 0){
          if(this.livingNeighbors(r, c) === 3) {
            newBoard[r][c]=1;
          }
        }
        else{
          if(this.livingNeighbors(r, c)<2 || this.livingNeighbors(r, c)>3) {
            newBoard[r][c]=0;
          }
        }
      }
    }
    this.board = newBoard;
  }

  // Clear each cell of the board.
  clear() {
    let board = this.board;
    for(let r = 0; r<this.height; r++){
      for(let c =0; c<this.width; c++){
        board[r][c]=0;
      }
    }
  }
}


/*     TESTING     */
const game = new GameOfLife(3, 3);
game.board[1][0]=1;
game.board[1][1]=1;
game.board[1][2]=1;

console.log(game.board);
game.tick();
console.log(game.board);