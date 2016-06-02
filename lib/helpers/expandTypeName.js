'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expandTypeName;
/**
 * Expand and return the valid type name for all aliases and shorthands.
 *
 * @param {String} type
 * @returns {String}
 */
function expandTypeName(type) {
  switch (type) {
    case 'bool':
      return 'boolean';

    case 'func':
      return 'function';

    case 'inst':
      return 'instance';

    case 'int':
    case 'integer':
    case 'num':
    case 'float':
      return 'number';

    case 'obj':
      return 'object';

    case 'struct':
      return 'shape';

    case 'str':
      return 'string';

    default:
      return type;
  }
}