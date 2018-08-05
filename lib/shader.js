'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a shader.
 */
var Shader = function () {

  /**
   * @param {WebGL2RenderingContext} gl
   * @param {string} source
   * @param {integer} type
   */
  function Shader(gl, source, type) {
    _classCallCheck(this, Shader);

    this.shader = gl.createShader(type);
    gl.shaderSource(this.shader, source);
    gl.compileShader(this.shader);
    if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(this.shader);
      gl.deleteShader(this.shader);
      throw 'unable to create shader. gl said: ' + log;
    }
  }

  /**
   * @return {WebGLShader}
   */


  _createClass(Shader, [{
    key: 'ref',
    value: function ref() {
      return this.shader;
    }
  }]);

  return Shader;
}();

/**
 * Convenience class representing a vertex shader.
 */


exports.default = Shader;

var VertexShader = exports.VertexShader = function (_Shader) {
  _inherits(VertexShader, _Shader);

  function VertexShader(gl, source) {
    _classCallCheck(this, VertexShader);

    return _possibleConstructorReturn(this, (VertexShader.__proto__ || Object.getPrototypeOf(VertexShader)).call(this, gl, source, gl.VERTEX_SHADER));
  }

  return VertexShader;
}(Shader);

/**
 * Convenience class representing a fragment shader.
 */


var FragmentShader = exports.FragmentShader = function (_Shader2) {
  _inherits(FragmentShader, _Shader2);

  function FragmentShader(gl, source) {
    _classCallCheck(this, FragmentShader);

    return _possibleConstructorReturn(this, (FragmentShader.__proto__ || Object.getPrototypeOf(FragmentShader)).call(this, gl, source, gl.FRAGMENT_SHADER));
  }

  return FragmentShader;
}(Shader);

/**
 * Represents a linked shader program
 */


var ShaderProgram = exports.ShaderProgram = function () {

  /**
   * Construct the shader program by linking the given shaders.
   *
   * @param {WebGL2RenderingContext} gl
   * @param {VertexShader} vertex_shader
   * @param {FragmentShader} fragment_shader
   */
  function ShaderProgram(gl, vertex_shader, fragment_shader) {
    _classCallCheck(this, ShaderProgram);

    this.gl = gl;
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertex_shader.ref());
    gl.attachShader(this.program, fragment_shader.ref());
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      gl.deleteProgram(this.program);
      throw 'unable to link shader program.';
    }
  }

  /**
   * Set a 4x4 matrix uniform value.
   *
   * @param {string} name
   * @param {Float32Array} value
   */


  _createClass(ShaderProgram, [{
    key: 'set_uniform_mat4',
    value: function set_uniform_mat4(name, value) {
      var location = this.gl.getUniformLocation(this.program, name);
      this.gl.useProgram(this.program);
      this.gl.uniformMatrix4fv(location, false, value);
    }

    /**
     * Set a 2x1 vector uniform value.
     *
     * @param {string} name
     * @param {Vector} value
     */

  }, {
    key: 'set_uniform_vec2',
    value: function set_uniform_vec2(name, value) {
      var location = this.gl.getUniformLocation(this.program, name);
      this.gl.useProgram(this.program);
      this.gl.uniform2f(location, value.x, value.y);
    }

    /**
     * Set a float uniform value.
     *
     * @param {string} name
     * @param {float} value
     */

  }, {
    key: 'set_uniform_float',
    value: function set_uniform_float(name, value) {
      var location = this.gl.getUniformLocation(this.program, name);
      this.gl.useProgram(this.program);
      this.gl.uniform1f(location, value);
    }

    /**
     * @return {WebGLProgram}
     */

  }, {
    key: 'ref',
    value: function ref() {
      return this.program;
    }
  }]);

  return ShaderProgram;
}();