'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Compiler2 = require('../Compiler');

var _Compiler3 = _interopRequireDefault(_Compiler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCompiler = function (_Compiler) {
  _inherits(ReactCompiler, _Compiler);

  function ReactCompiler() {
    _classCallCheck(this, ReactCompiler);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCompiler).apply(this, arguments));
  }

  _createClass(ReactCompiler, [{
    key: 'compile',
    value: function compile() {
      var attributes = this.schema.attributes;

      return 'const ' + this.getSchemaName() + ' = ' + this.renderShape({ attributes: attributes }) + ';';
    }

    /**
     * Render a `React.PropType.arrayOf()` definition.
     *
     * @param {ArrayDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderArray',
    value: function renderArray(definition) {
      return this.wrapPropType(definition, this.wrapFunction('arrayOf', this.render(definition.valueType)));
    }

    /**
     * Render a `React.PropType.bool` definition.
     *
     * @param {BoolDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderBool',
    value: function renderBool(definition) {
      return this.wrapPropType(definition, 'bool');
    }

    /**
     * Render a `React.PropType.oneOf()` definition.
     *
     * @param {EnumDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderEnum',
    value: function renderEnum(definition) {
      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var _definition$config = definition.config;
      var values = _definition$config.values;
      var valueType = _definition$config.valueType;


      return this.wrapPropType(definition, this.wrapFunction('oneOf', this.formatArray(this.renderArrayItems(values, depth + 1, valueType), depth)));
    }

    /**
     * Render a `React.PropType.func` definition.
     *
     * @param {FuncDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderFunc',
    value: function renderFunc(definition) {
      return this.wrapPropType(definition, 'func');
    }

    /**
     * Render a `React.PropType.instanceOf()` definition.
     *
     * @param {InstanceDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderInstance',
    value: function renderInstance(definition) {
      var contract = definition.config.contract;


      return this.wrapPropType(definition, this.wrapFunction('instanceOf', this.format(contract, 'function')));
    }

    /**
     * Render a `React.PropType.number` definition.
     *
     * @param {NumberDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderNumber',
    value: function renderNumber(definition) {
      return this.wrapPropType(definition, 'number');
    }

    /**
     * Render a `React.PropType.arrayOf()` definition.
     *
     * @param {ObjectDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderObject',
    value: function renderObject(definition) {
      return this.wrapPropType(definition, this.wrapFunction('objectOf', this.render(definition.valueType)));
    }

    /**
     * Render a `React.PropType.shape()` definition.
     *
     * @param {ShapeDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderShape',
    value: function renderShape(definition) {
      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return this.wrapPropType(definition, this.wrapFunction('shape', this.formatObject(this.renderObjectProps(definition.attributes, depth + 1), depth)));
    }

    /**
     * Render a `React.PropType.oneOfType()` definition.
     *
     * @param {UnionDefinition} definition
     * @param {Number} depth
     * @returns {String}
     */

  }, {
    key: 'renderUnion',
    value: function renderUnion(definition) {
      var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      return this.wrapPropType(definition, this.wrapFunction('oneOfType', this.formatArray(this.renderArrayItems(definition.valueTypes, depth + 1), depth)));
    }

    /**
     * Render a `React.PropType.string` definition.
     *
     * @param {StringDefinition} definition
     * @returns {String}
     */

  }, {
    key: 'renderString',
    value: function renderString(definition) {
      return this.wrapPropType(definition, 'string');
    }

    /**
     * Render a definition into an React PropType representation.
     *
     * @param {Definition|Object} definition
     * @param {String} template
     * @returns {String}
     */

  }, {
    key: 'wrapPropType',
    value: function wrapPropType(definition, template) {
      var response = 'PropTypes.' + template;

      if (definition.isRequired && definition.isRequired()) {
        response += '.isRequired';
      }

      return response;
    }
  }]);

  return ReactCompiler;
}(_Compiler3.default);

exports.default = ReactCompiler;