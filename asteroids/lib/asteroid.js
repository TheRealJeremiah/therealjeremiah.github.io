(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function (game, pos) {
    var randVel = Asteroids.Util.randomVec(2);
    this.img = new Image();
    this.img.src = 'lib/grumpy.png';
    Asteroids.movingObject.call(this, game, pos, randVel, 40, "#FF0000");
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.movingObject);

  // Asteroids.Asteroid.draw =
})();
