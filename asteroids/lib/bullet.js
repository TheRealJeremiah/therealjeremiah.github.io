(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function (game, pos, vel) {
    this.img = new Image();
    this.img.src = 'lib/squirtle.png';
    var halfShipSize = 25;
    var adjustedPos = [pos[0] + halfShipSize, pos[1] + halfShipSize]
    Asteroids.movingObject.call(this, game, adjustedPos, vel, 15, "#00FF00");
  };

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.movingObject);

  Asteroids.Bullet.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.outOfBounds(this.pos)) {
      this.game.remove(this);
    }
  };
})();
