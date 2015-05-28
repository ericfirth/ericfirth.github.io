(function() {
  if (!window.Snake) {
    window.Snake = {};
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



})();
