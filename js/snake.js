(function() {
  if (!window.Snake) {
    window.Snake = {};
  }


  var DIM_X = 20;
  var DIM_Y = 20;
  var DELTAS = {
    "N": [-1, 0],
    "S": [1, 0],
    "E": [0, -1],
    "W": [0, 1]
  };
  var APPLE_TURNS = 3;

  var Snake = window.Snake.Snake = function(board, startPos) {
    this.direction = "N";
    this.segments = [];
    startCoord = new Coord(startPos, this.direction);
    this.segments.push(startCoord);
    this.board = board;
    this.appleTurns = 0;
  };



  Snake.prototype.nextCoord = function () {
    var nextCoord = new Coord(this.segments[0].pos(), this.direction)
    nextCoord.plus(DELTAS[this.direction]);
    return nextCoord
    // console.log(nextCoord.plus(DELTAS[this.direction]));
  };

  Snake.prototype.move = function() {
    var nextCoord = this.nextCoord();
    // debugger
    this.checkCollision(nextCoord);
    this.appleCheck(nextCoord);
    this.segments.unshift(nextCoord);
    this.board.addSnakeCoord(nextCoord)
    if (this.appleTurns > 0) {
      this.appleTurns--;
    } else {
      this.board.removeSnakeCoord(this.segments[this.segments.length - 1])
      this.segments.pop();
    }
  };

  Snake.prototype.turn = function(dir) {
    if (!(this.direction === "N" && dir === "S")
    && !(this.direction === "S" && dir === "N")
    && !(this.direction === "E" && dir === "W")
    && !(this.direction === "W" && dir === "E")) {
      this.direction = dir;
    }
  };

  Snake.prototype.appleCheck = function (nextCoord) {
    if (this.board.grid[nextCoord.x][nextCoord.y] === "A") {
      this.board.appleCount++;
      this.board.apple = null;
      this.board.generateApple();
      this.appleTurns = APPLE_TURNS;
    }
  };

  Snake.prototype.checkCollision = function (nextCoord) {
    if (this.board.grid[nextCoord.x][nextCoord.y] === "W" ||
    this.board.grid[nextCoord.x][nextCoord.y] === "S") {
      this.board.gameOver = true;
    }
  };

  var Apple = window.Snake.Apple = function(board, pos) {
    this.board = board;
    this.pos = pos;
  }




  var Coord = window.Snake.Coord = function (pos, dir) {
    this.x = pos[0];
    this.y = pos[1];
    this.dir = dir;
  };

  Coord.prototype.plus = function (delta) {
    this.x += delta[0];
    this.y += delta[1];
    return this
  };

  Coord.prototype.pos = function() {
    return [this.x, this.y];
  }

  var Board = window.Snake.Board = function () {
    this.grid = this.newGrid();
    this.snake = new window.Snake.Snake(this, [Math.round(DIM_X / 2), Math.round(DIM_Y / 2)]);
    this.generateApple();
    this.dimX = DIM_X;
    this.dimY = DIM_Y;
    this.gameOver = false;
    this.appleCount = 0;

  };

  Board.prototype.newGrid = function() {
    var grid = [];
    for (var i = 0; i < DIM_X; i++) {
      var row = [];
      for (var j = 0; j < DIM_Y; j++) {
        if (j === (DIM_Y - 1) || j === 0 || i === 0 || i === (DIM_X - 1)) {
          row.push("W");
        } else {
          row.push(".");
        }
      }
      grid.push(row);
    }
    return grid;
  };


  Board.prototype.render = function() {
    this.grid = this.newGrid();
    for (var i = 0; i < this.snake.segments.length; i++) {
      var x = this.snake.segments[i].x;
      var y = this.snake.segments[i].y;
      this.grid[x][y] = "S";
    }
    var applePos = this.apple.pos;
    this.grid[applePos[0]][applePos[1]] = "A"
    return this.display();
  };

  Board.prototype.addSnakeCoord = function(coord) {
    this.grid[coord.x][coord.y] = "S"
  }

  Board.prototype.removeSnakeCoord = function(coord) {
    this.grid[coord.x][coord.y] = "."
  }

  Board.prototype.display = function() {
    var display = ""
    for (var j = 0; j < this.grid.length; j++) {
      for (var k = 0; k < this.grid[j].length; k++) {
        display += " " + this.grid[j][k];
      }
      display += "\n";
    }
    return display;
  }


  Board.prototype.randomPos = function() {
    var x = Math.floor(Math.random() * DIM_X);
    var y = Math.floor(Math.random() * DIM_Y);
    return [x,y];
  }


  Board.prototype.generateApple = function() {
    var isApple = false;
    while (!isApple) {
      var pos = this.randomPos();
      var x = pos[0];
      var y = pos[1];
      if (this.grid[x][y] !== "S" && this.grid[x][y] !== "W") {
        isApple = true
        var apple = new window.Snake.Apple(this, [x,y]);
        this.grid[x][y] = "A"
      }
    }
    this.apple = apple;
  };










})();

// (function() {
//   if (window.Coord == "undefined"){
//     window.Coord = {};
//   }
//
// })();
