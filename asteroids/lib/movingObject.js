(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.movingObject = function (game, pos, vel, radius, color) {
    this.game = game;
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  Asteroids.movingObject.prototype.isCollidedWith = function (otherMoving) {
    var ourPos = this.pos;
    var theirPos = otherMoving.pos;
    var minDist = this.radius + otherMoving.radius;
    var currDist = Math.sqrt(Math.pow(ourPos[0] - theirPos[0], 2) + Math.pow(ourPos[1] - theirPos[1], 2));
    return currDist < minDist;
  };

  Asteroids.movingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }

  Asteroids.movingObject.prototype.draw = function (ctx) {
    var size = this.radius * 2;
    var halfSize = this.radius;
    ctx.translate(this.pos[0] + halfSize, this.pos[1] + halfSize);
    ctx.drawImage(this.img, -size, -size, size, size);
    ctx.translate(-(this.pos[0] + halfSize), -(this.pos[1] + halfSize));
  };

  Asteroids.movingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };

})()
