(function() {
  if (!window.Snake) {
    window.Snake = {};
  }

  var DIM_X = 20;
  var DIM_Y = 20;

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
