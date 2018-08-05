'use strict';

_object2.default.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _object2.default.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('./object.js');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _object2.default.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _object2.default.setPrototypeOf ? _object2.default.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a renderable quad.
 */
var Quad = function (_Object) {
  _inherits(Quad, _Object);

  /**
   * Construct using the given position and size.
   *
   * @param {WebGL2RenderingContext} gl
   * @param {float} x
   * @param {float} y
   * @param {float} width
   * @param {float} height
   */
  function Quad(gl, x, y, width, height) {
    _classCallCheck(this, Quad);

    var _this = _possibleConstructorReturn(this, (Quad.__proto__ || _object2.default.getPrototypeOf(Quad)).call(this, gl));

    _this.transform = _this.transform.scale(width, height, 1);
    _this.transform = _this.transform.translate(x, y, 1);
    _this.primitive = gl.get_super().get_quad_primitive();
    return _this;
  }

  /**
   * Render the quad.
   *
   * @param {Matrix} model Model for this context.
   */


  _createClass(Quad, [{
    key: 'render',
    value: function render(model) {
      this.gl.get_super().upload_model_matrix(model.multiply(this.transform));
      this.primitive.render();
    }
  }]);

  return Quad;
}(_object2.default);

exports.default = Quad;