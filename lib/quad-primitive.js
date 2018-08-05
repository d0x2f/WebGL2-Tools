"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a quad primitive which can be reused by quad objects
 * to avoid a new VAO for each quad.
 */
var QuadPrimitive = function () {
  /**
   * @param {WebGL2RenderingContext} gl
   */
  function QuadPrimitive(gl) {
    _classCallCheck(this, QuadPrimitive);

    this.gl = gl;

    this.buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    var positions = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    this.recreate();
  }

  /**
   * Recreate the vertex array object.
   * May be necessary when switching shader programs.
   */


  _createClass(QuadPrimitive, [{
    key: "recreate",
    value: function recreate() {
      // Delete an existing vao if one exists.
      if (this.vao !== undefined) {
        this.gl.deleteVertexArray(this.vao);
      }

      this.vao = this.gl.createVertexArray();
      this.gl.bindVertexArray(this.vao);

      // Throw if there's no shader program set.
      var program = this.gl.get_super().get_shader_program();
      if (program === undefined) {
        throw "cannot recreate quad without a shader program loaded";
      }

      // Describe vertex packing.
      var attribute_location = this.gl.getAttribLocation(program.ref(), "position");
      this.gl.enableVertexAttribArray(attribute_location);

      this.gl.vertexAttribPointer(attribute_location, 2, // size
      this.gl.FLOAT, // type
      false, // normalize
      0, // stride
      0 //offset
      );
    }

    /**
     * Render the quad.
     */

  }, {
    key: "render",
    value: function render() {
      this.gl.bindVertexArray(this.vao);

      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, // primitive
      0, // offset
      4 // count
      );
    }
  }]);

  return QuadPrimitive;
}();

exports.default = QuadPrimitive;