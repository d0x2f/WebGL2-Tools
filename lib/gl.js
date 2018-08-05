'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shader = require('./shader.js');

var _quadPrimitive = require('./quad-primitive.js');

var _quadPrimitive2 = _interopRequireDefault(_quadPrimitive);

var _quad = require('./quad.js');

var _quad2 = _interopRequireDefault(_quad);

var _mesh = require('./mesh.js');

var _mesh2 = _interopRequireDefault(_mesh);

var _matrix = require('./matrix.js');

var _matrix2 = _interopRequireDefault(_matrix);

var _vector = require('./vector.js');

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing an OpenGL context.
 */
var GL = function () {
  /**
   * Construct from the GL context of the given canvas.
   *
   * @param {HTMLCanvasElement} canvas
   */
  function GL(canvas) {
    var _this = this;

    _classCallCheck(this, GL);

    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
    this.gl.get_super = function () {
      return _this;
    };

    this.render_hooks = [];

    this.objects = [];

    this.projection_matrix = _matrix2.default.identity();
    this.view_matrix = _matrix2.default.identity();

    this.camera_position = new _vector2.default(0, 0, 0, 1);
  }

  /**
   * @return {WebGL2RenderingContext} a raw reference to the WebGL2 api.
   */


  _createClass(GL, [{
    key: 'ref',
    value: function ref() {
      return this.gl;
    }

    /**
     * Add a callable hook to be run on each render pass.
     *
     * @param {callable} hook
     */

  }, {
    key: 'add_render_hook',
    value: function add_render_hook(hook) {
      this.render_hooks.push(hook);
    }

    /**
     * Create a vertex shader from the given source.
     *
     * @param {string} source
     *
     * @return {VertexShader}
     */

  }, {
    key: 'create_vertex_shader',
    value: function create_vertex_shader(source) {
      return new _shader.VertexShader(this.ref(), source);
    }

    /**
     * Create a fragment shader from the given source.
     *
     * @param {string} source
     *
     * @return {FragmentShader}
     */

  }, {
    key: 'create_fragment_shader',
    value: function create_fragment_shader(source) {
      return new _shader.FragmentShader(this.ref(), source);
    }

    /**
     * Create a shader program by linking the given shaders.
     *
     * @param {VertexShader} vertex_shader
     * @param {FragmentShader} fragment_shader
     */

  }, {
    key: 'create_shader_program',
    value: function create_shader_program(vertex_shader, fragment_shader) {
      return new _shader.ShaderProgram(this.ref(), vertex_shader, fragment_shader);
    }

    /**
     * Returns a quad primitive so it's sonstituent VBO can be resued.
     *
     * @return {QuadPrimitive}
     */

  }, {
    key: 'get_quad_primitive',
    value: function get_quad_primitive() {
      if (this.quad_primitive === undefined) {
        this.quad_primitive = new _quadPrimitive2.default(this.ref());
      }
      return this.quad_primitive;
    }

    /**
     * Create a quad with given position and size.
     *
     * @param {float} x
     * @param {float} y
     * @param {float} width
     * @param {float} height
     *
     * @return {Quad}
     */

  }, {
    key: 'create_quad',
    value: function create_quad(x, y, width, height) {
      return new _quad2.default(this.ref(), x, y, width, height);
    }

    /**
     * Create a mesh with the given objects.
     *
     * @param {array} objects
     */

  }, {
    key: 'create_mesh',
    value: function create_mesh(objects) {
      return new _mesh2.default(this.ref(), objects);
    }

    /**
     * Add an object to the scene in order to be rendered.
     *
     * @param {Object} object
     */

  }, {
    key: 'add_object_to_scene',
    value: function add_object_to_scene(object) {
      this.objects.push(object);
    }

    /**
     * Set the shader program to use when rendering.
     *
     * @param {ShaderProgram} shader_program
     */

  }, {
    key: 'set_shader_program',
    value: function set_shader_program(shader_program) {
      this.shader_program = shader_program;
    }

    /**
     * Fetch the currently active shader program.
     *
     * @return {ShaderProgram}
     */

  }, {
    key: 'get_shader_program',
    value: function get_shader_program() {
      return this.shader_program;
    }

    /**
     * Sets the position of the camera.
     *
     * @param {float} x
     * @param {float} y
     * @param {float} z
     */

  }, {
    key: 'set_camera_position',
    value: function set_camera_position(x, y, z) {
      this.camera_position = new _vector2.default(x, y, z);
      this.view_matrix = _matrix2.default.identity().translate(-x, -y, -z);
    }

    /**
     * Translates the position of the camera.
     *
     * @param {float} x
     * @param {float} y
     * @param {float} z
     */

  }, {
    key: 'translate_camera_position',
    value: function translate_camera_position(x, y, z) {
      this.camera_position = new _vector2.default(this.camera_position.x + x, this.camera_position.y + y, this.camera_position.z + z, 0);
      this.view_matrix = _matrix2.default.identity().translate(-this.camera_position.x, -this.camera_position.y, -this.camera_position.z);
    }

    /**
     * Computes world coordinates from given screen coordinates.
     *
     * @param {float} x
     * @param {float} y
     * @param {float} z
     */

  }, {
    key: 'unproject',
    value: function unproject(x, y, z) {
      return this.projection_matrix.inverse().multiply_vector(new _vector2.default(2 * x / this.canvas.clientWidth - 1, 2 * y / this.canvas.clientHeight - 1, 2 * z - 1, 1));
    }

    /**
     * Upload the current model matrix to the gpu.
     */

  }, {
    key: 'upload_model_matrix',
    value: function upload_model_matrix(model) {
      this.get_shader_program().set_uniform_mat4('model', model.transpose().as_float_array());
    }

    /**
     * Upload the current view and projection matrix to the gpu.
     */

  }, {
    key: 'upload_view_projection_matrix',
    value: function upload_view_projection_matrix() {
      this.get_shader_program().set_uniform_mat4('view_projection', this.projection_matrix.multiply(this.view_matrix).transpose().as_float_array());
    }

    /**
     * Resize the canvas and recalculate the projection to maintain the desired aspect ratio.
     */

  }, {
    key: 'resize',
    value: function resize() {
      var width = this.canvas.clientWidth;
      var height = this.canvas.clientHeight;

      // If the width & height haven't changed, don't bother resizing.
      if (this.canvas.width === width && this.canvas.height === height) {
        return false;
      }

      // Update canvas width and height.
      this.canvas.width = width;
      this.canvas.height = height;

      // Compute apparent aspect ratio.
      var canvas_aspect = width / height;

      // Compute appropriate orthographic projection matrix.
      var left = void 0,
          right = void 0,
          top = void 0,
          bottom = void 0;

      if (canvas_aspect > 1) {
        left = -canvas_aspect;
        right = canvas_aspect;
        top = 1;
        bottom = -1;
      } else {
        left = -1;
        right = 1;
        top = 1 / canvas_aspect;
        bottom = -1 / canvas_aspect;
      }

      this.projection_matrix = new _matrix2.default(new _vector2.default(2 / (right - left), 0, 0, -(right + left) / (right - left)), new _vector2.default(0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom)), new _vector2.default(0, 0, 1, 0), new _vector2.default(0, 0, 0, 1));

      return true;
    }

    /**
     * Render the scene.
     */

  }, {
    key: 'render',
    value: function render() {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      this.gl.useProgram(this.get_shader_program().ref());

      this.upload_view_projection_matrix();

      this.objects.forEach(function (object) {
        return object.render(_matrix2.default.identity());
      });
    }
    /**
     * The event loop executed for each tick.
     */

  }, {
    key: 'event_loop',
    value: function event_loop() {
      var _this2 = this;

      // Measure time delta for fps independant physics calculations
      var frame_time = Date.now();
      if (this.last_frame_time === undefined) {
        this.last_frame_time = frame_time;
      }
      var frame_delta = frame_time - this.last_frame_time;
      this.last_frame_time = frame_time;

      // Keep track of changes and only render if necessary.
      var scene_dirty = false;

      scene_dirty |= this.resize();

      this.render_hooks.forEach(function (hook) {
        scene_dirty |= hook(frame_delta);
      });

      if (scene_dirty) {
        this.render();
      }

      // Schedule another tick
      requestAnimationFrame(function () {
        return _this2.event_loop();
      });
    }
  }]);

  return GL;
}();

exports.default = GL;