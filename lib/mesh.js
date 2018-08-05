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
 * Represents a collection of renderable objects.
 */
var Mesh = function (_Object) {
  _inherits(Mesh, _Object);

  function Mesh(gl, objects) {
    _classCallCheck(this, Mesh);

    var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || _object2.default.getPrototypeOf(Mesh)).call(this, gl));

    _this.objects = objects;
    return _this;
  }

  _createClass(Mesh, [{
    key: 'add_object',
    value: function add_object(object) {
      this.objects.push(object);
    }

    /**
     * Render each object in the mesh.
     *
     * @param {Matrix} model Model matrix for this context.
     */

  }, {
    key: 'render',
    value: function render(model) {
      model = model.multiply(this.transform);
      this.objects.forEach(function (object) {
        return object.render(model);
      });
    }
  }]);

  return Mesh;
}(_object2.default);

exports.default = Mesh;