module.exports = {
  name: 'Union',
  imports: [{ default: 'UnionDefault', named: ['UnionClassName'], path: '../stub' }],
  attributes: {
    arrayField: {
      type: 'union',
      valueTypes: [
        {
          type: 'array',
          valueType: 'string',
        },
        {
          type: 'array',
          valueType: {
            type: 'object',
            valueType: 'string',
          },
        },
      ],
    },
    primitiveFields: {
      type: 'union',
      valueTypes: ['bool', 'integer'],
    },
    enumField: {
      type: 'union',
      valueTypes: [
        {
          type: 'enum',
          valueType: 'string',
          values: ['foo', 'bar', 'baz'],
        },
        {
          type: 'enum',
          valueType: 'number',
          values: [789, 456, 123],
        },
      ],
    },
    instanceField: {
      type: 'union',
      valueTypes: [
        {
          type: 'instance',
          contract: 'UnionClassName',
        },
        {
          type: 'inst',
          contract: 'UnionDefault',
          nullable: true,
        },
      ],
    },
    objectField: {
      type: 'union',
      valueTypes: [
        {
          type: 'object',
          valueType: 'number',
        },
        {
          type: 'obj',
          valueType: {
            type: 'array',
            valueType: 'str',
          },
        },
      ],
    },
    shapeField: {
      type: 'union',
      valueTypes: [
        {
          type: 'shape',
          attributes: {
            foo: 'string',
            bar: 'bool',
          },
        },
        {
          type: 'struct',
          attributes: {
            qux: {
              type: 'union',
              valueTypes: ['string', 'bool'],
            },
          },
        },
      ],
    },
    unionField: {
      type: 'union',
      valueTypes: [
        {
          type: 'union',
          valueTypes: [
            {
              type: 'string',
            },
            {
              type: 'enum',
              valueType: 'number',
              values: [1, 2, 3],
            },
          ],
        },
        {
          type: 'union',
          valueTypes: ['bool', 'int'],
        },
      ],
    },
  },
};
