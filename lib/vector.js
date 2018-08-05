"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  /**
   * @param {float} x
   * @param {float} y
   * @param {float} z
   * @param {float} w
   */
  function Vector(x, y, z, w) {
    _classCallCheck(this, Vector);

    // Initialise with the zeros.
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Computes the dot product with the given vector.
   *
   * @param {Vector} b
   *
   * @return {Vector}
   */


  _createClass(Vector, [{
    key: "dot",
    value: function dot(b) {
      return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
    }

    /**
     * Multiplies the vector by the given scalar.
     *
     * @param {float} s
     *
     * @return {Vector}
     */

  }, {
    key: "multiply",
    value: function multiply(s) {
      var a = this;
      return new Vector(a.x * s, a.y * s, a.z * s, a.w * s);
    }
  }]);

  return Vector;
}();

exports.default = Vector;