(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Ship = function (game, pos) {
    this.turnVec = [0, -1];
    var d = new Date();
    this.firedLaserTime = d.getTime();
    this.img = new Image();
    this.img.src = 'lib/gengar.png';
    Asteroids.movingObject.call(this, game, pos, [0, 0.01], 20, "#0000FF");
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.movingObject);

  Asteroids.Ship.prototype.power = function(impulse) {
    this.vel = Asteroids.Util.vecWithChangedVel(this.vel, this.turnVec, impulse)
  };

  Asteroids.Ship.prototype.turn = function(impulse) {
    this.turnVec = Asteroids.Util.rotateVec(this.turnVec, impulse/10)
  };

  Asteroids.Ship.prototype.fireBullet = function () {
    var d = new Date();
    var currentTime = d.getTime();
    if ((currentTime - this.firedLaserTime) < 200) {
      // can't fire action (maybe sound)
    } else {
      var bulletVel = Asteroids.Util.vecWithAddedVel(this.turnVec, 20, this.vel);
      var bullet = new Asteroids.Bullet(this.game, [this.pos[0], this.pos[1]], bulletVel);
      this.game.addBullet(bullet);
      var d = new Date();
      this.firedLaserTime = d.getTime();
    }
  };

  Asteroids.Ship.prototype.draw = function(ctx) {
    var size = 50;
    var halfSize = size / 2;
    ctx.translate(this.pos[0] + halfSize, this.pos[1] + halfSize);
    ctx.rotate(Asteroids.Util.vecAngle(this.turnVec));
    ctx.drawImage(this.img, -halfSize, -halfSize, size, size);
    ctx.rotate(-Asteroids.Util.vecAngle(this.turnVec));
    ctx.translate(-(this.pos[0] + halfSize), -(this.pos[1] + halfSize));
  }
})();
