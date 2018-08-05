'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _matrix = require('./matrix.js');

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a renderable object.
 */
var Object = function () {
  function Object(gl) {
    _classCallCheck(this, Object);

    this.gl = gl;
    this.transform = _matrix2.default.identity();
  }

  /**
   * Apply a transform to this object.
   *
   * @param {Matrix} matrix Transformation matrix.
   */


  _createClass(Object, [{
    key: 'transform',
    value: function transform(matrix) {
      this.transform = this.transform.multiply(matrix);
    }

    /**
     * Render the object.
     */

  }, {
    key: 'render',
    value: function render() {
      throw 'render method not implemented on object.';
    }
  }]);

  return Object;
}();

exports.default = Object;