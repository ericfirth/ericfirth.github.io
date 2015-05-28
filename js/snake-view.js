(function() {
  if (!window.Snake) {
    window.Snake = {};
  }
  var View = window.Snake.View = function($el) {
    this.speed = 1000/5;
    this.$el = $el;
    this.$gameBoard = $(".game-board")
    this.newGame();
  };

  View.prototype.newGame = function() {
    this.$gameBoard.empty()
    // $(this.$el).off("click", this.newGame.bind(this))

    $(".overlay").removeClass("visible game-over paused")
    this.board = new window.Snake.Board();
    this.$ul = this.makeAndFillUl();
    this.board.render();
    this.render();
    this.step();
    $(window).on("keydown", this.handleKeyEvent.bind(this));
    console.log(this.speed);
  }



  View.prototype.step = function() {
    this.gamePlay = setInterval(function() {
      if (!this.board.gameOver) {
        this.board.snake.move()
        this.update();
      } else {
        this.gameOver();
      }
    }.bind(this), this.speed);
  };

  View.prototype.handleKeyEvent = function(event) {
    if (event.keyCode === 38) {
      this.board.snake.turn("N");
    } else if (event.keyCode === 37) {
      this.board.snake.turn("E");
    } else if (event.keyCode === 40) {
      this.board.snake.turn("S");
    } else if (event.keyCode === 39) {
      this.board.snake.turn("W");
    } else if (event.keyCode === 32)
      this.togglePause();
  };

  View.prototype.makeAndFillUl = function() {
    var $ul = $('<ul class="game group">');
    var numSquares = this.board.dimX * this.board.dimY;
    for (var i = 0; i < numSquares; i++) {
      var $li = $('<li class="snake-square"</li>')
      $ul.append($li);
    }
    this.$gameBoard.append($ul);
    return $ul;
  };

  View.prototype.update = function() {
    $("li").removeClass("snake apple head-N head-S head-E head-W tail-S tail-N tail-W tail-E N S E W");
    var segments = this.board.snake.segments;
    for (var i = 0; i < segments.length; i++) {
      var liNum = (segments[i].x * this.board.dimX) + (segments[i].y)
      var $li = $("li").eq(liNum)
      if (i === 0) {
        $li.addClass("head-" + segments[i].dir)
      } else if (i === segments.length - 1) {
        $li.addClass("tail-" + segments[i-1].dir)
      } else {
        $li.addClass("snake " + segments[i].dir)
      }
    }
    var appleLiNum = (this.board.apple.pos[0] * this.board.dimX) + this.board.apple.pos[1]
    $("li").eq(appleLiNum).addClass("apple")

    $(".apple-count").text(this.board.appleCount)

  };

  View.prototype.render = function() {
    // debugger
    var count = 0;
    for (var i = 0; i < this.board.dimX; i++) {
      for (var j = 0; j < this.board.dimY; j++) {
        var currentItem = this.board.grid[i][j];
        var $li = $("li").eq(count)
        if (currentItem === "S") {
          $li.addClass("snake head-N");
        } else if (currentItem === "A") {
          $li.addClass("apple");
        } else if (currentItem === "W") {
          $li.addClass("wall");
        }
        count++;
      }
    };
  };

  View.prototype.gameOver = function() {
    clearInterval(this.gamePlay)
    $(".overlay").addClass("visible game-over")
    $(window).off("keydown");
    $(this.$el).one("click", ".game-over", this.newGame.bind(this))

  }

  View.prototype.togglePause = function() {
    if (this.paused) {
      this.step();
      this.paused = false;
      $(".overlay").removeClass("visible pause")

    } else {
      clearInterval(this.gamePlay);
      this.paused = true;
      $(".overlay").addClass("visible pause")
    }
  }


})();
