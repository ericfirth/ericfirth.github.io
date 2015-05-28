(function() {
  if (!window.Snake) {
    window.Snake = {};
  }



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
    startCoord = new window.Snake.Coord(startPos, this.direction);
    this.segments.push(startCoord);
    this.board = board;
    this.appleTurns = 0;
  };



  Snake.prototype.nextCoord = function () {
    var nextCoord = new window.Snake.Coord(this.segments[0].pos(), this.direction)
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













})();

// (function() {
//   if (window.Coord == "undefined"){
//     window.Coord = {};
//   }
//
// })();
