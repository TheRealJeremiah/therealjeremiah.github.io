(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(this, this.randomPos());
  };

  Asteroids.Game.DIM_X = window.innerWidth;
  Asteroids.Game.DIM_Y = window.innerHeight;
  Asteroids.Game.NUM_ASTEROIDS = 20;

  Asteroids.Game.prototype.randomPos = function() {
    var x = Math.random();
    var y = Math.random();
    var x = (Asteroids.Game.DIM_X * x) | 0;
    var y = (Asteroids.Game.DIM_Y * y) | 0;
    return [x, y];
  };

  Asteroids.Game.prototype.addAsteroids = function () {
    for(var i = 0; i<Asteroids.Game.NUM_ASTEROIDS; i++) {
      var pos = this.randomPos();
      var asteroid = new Asteroids.Asteroid(this, pos);
      this.asteroids.push(asteroid);
    }
  };

  Asteroids.Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet)
  };

  Asteroids.Game.prototype.draw = function () {
    this.ship.draw(this.ctx);
    for(var i=0; i<this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    for(var i=0; i<this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }
  };

  Asteroids.Game.prototype.wrap = function (pos) {
    var x = pos[0];
    if (x < 0) {
      x += Asteroids.Game.DIM_X;
    } else if (x > Asteroids.Game.DIM_X) {
      x -= Asteroids.Game.DIM_X;
    }
    var y = pos[1];
    if (y < 0) {
      y += Asteroids.Game.DIM_Y;
    } else if (y > Asteroids.Game.DIM_Y) {
      y -= Asteroids.Game.DIM_Y;
    }
    return [x, y]
  };

  Asteroids.Game.prototype.outOfBounds = function (pos) {
    var x = pos[0];
    var y = pos[1];
    return (y > Asteroids.Game.DIM_Y) || (x > Asteroids.Game.DIM_X) || (x < 0) || (y < 0);
  };

  Asteroids.Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.asteroids.length; i++) {
      for(var j = 0; j < this.bullets.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
          this.asteroids[i].collideWith(this.bullets[j])
        }
      }
    }
  };

  Asteroids.Game.prototype.remove = function(object) {
    var idx = this.asteroids.indexOf(object);
    if (idx > -1) {
      this.asteroids.splice(idx, 1);
    }

    var idxb = this.bullets.indexOf(object);
    if (idxb > -1) {
      this.bullets.splice(idxb, 1);
    }
  };

  Asteroids.Game.prototype.moveObjects = function () {
    for(var i=0; i<this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
    for(var i=0; i<this.bullets.length; i++) {
      this.bullets[i].move();
    }
    this.ship.move();
  };

  Asteroids.Game.prototype.over = function () {
    return this.asteroids.length == 0;
  };

  Asteroids.Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

})()
