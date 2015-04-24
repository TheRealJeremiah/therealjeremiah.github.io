(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.gameView = function (canvas) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.ctx = canvas.getContext("2d");
    this.game = new Asteroids.Game(this.ctx);
  };

  Asteroids.gameView.prototype.start = function() {
    this.game.addAsteroids();
    this.game.draw();
    setInterval((function () {
      this.ctx.clearRect ( 0 , 0 , this.width, this.height );
      this.game.step();
      this.game.draw();
      this.bindKeyHandlers();
    }).bind(this), 1000/60);
  };

  Asteroids.gameView.prototype.bindKeyHandlers = function() {
    if (key.isPressed("W")) {
      this.game.ship.power(1/4);
    }
    if (key.isPressed("S")) {
      this.game.ship.power(-1/4);
    }
    if (key.isPressed("A")) {
      this.game.ship.turn(-1);
    }
    if (key.isPressed("D")) {
      this.game.ship.turn(1);
    }
    if (key.isPressed("space")) {
      this.game.ship.fireBullet();
    }
  };

})()
