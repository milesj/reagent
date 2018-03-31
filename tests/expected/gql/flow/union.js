/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */
/* @flow */

export type UnionFooStructType = {
  foo: ?string,
};

export type UnionBarStructType = {
  bar: ?boolean,
};

export type UnionBazStructType = {
  baz: boolean | number | null,
};

export type UnionType = {
  primitiveField: boolean | number | null,
  enumField: 'FOO' | 'BAR' | 'BAZ' | 'QUX' | null,
  shapeField: UnionFooStructType | UnionBarStructType | UnionBazStructType | null,
  unionField: boolean | number | 'FOO' | 'BAR' | 'BAZ' | 'QUX' | UnionFooStructType | UnionBarStructType | UnionBazStructType | null,
};
