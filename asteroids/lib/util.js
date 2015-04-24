(function () {
  if (typeof window.Asteroids == "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function(vecLength) {
    var size = 10;
    var vec = [];
    for(var i=0; i<vecLength; i++) {
      vec.push( ((size * (Math.random() - 0.5))) );
    }
    return vec;
  }

  Asteroids.Util.dist = function(vec1, vec2) {

  };

  Asteroids.Util.vecWithChangedVel = function(vec, turnVec, length) {
    var x = vec[0];
    var y = vec[1];

    var norm = Math.sqrt(x*x + y*y);
    var sign = 1
    // if (x + y > 0) {
    //   sign = -1;
    // }
    var normed = [sign * turnVec[0], sign * turnVec[1]];
    return [x + length * normed[0], y + length * normed[1]];
  };

  Asteroids.Util.vecWithAddedVel = function(vec, length, vec2) {
    var x = vec[0];
    var y = vec[1];
    return [x * length + vec2[0], y * length + vec2[1]];
  };

  Asteroids.Util.add = function (vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
  };

  Asteroids.Util.rotateVec = function(vec, angle) {
    var x = vec[0];
    var y = vec[1];
    return [Math.cos(angle) * x - Math.sin(angle) * y, Math.sin(angle) * x + Math.cos(angle) * y ]
  }

  Asteroids.Util.vecAngle = function(vec) {
    return Math.atan2(vec[0],-vec[1]);
  }
})()
