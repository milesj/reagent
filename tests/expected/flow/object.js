// @flow
import ObjectDefault from '../stub';

export type ObjectSchema = {
  arrayField: { [key: string]: string[] },
  boolField: { [key: string]: boolean },
  enumField: { [key: string]: 'foo' | 'bar' | 'baz' },
  funcField: { [key: string]: () => string },
  instanceField: { [key: string]: ObjectDefault },
  numberField: { [key: string]: number },
  objectField: { [key: string]: { [key: string]: number } },
  shapeField: { [key: string]: {
    foo: string,
    bar: boolean,
    baz: () => void,
  } },
  stringField: { [key: string]: string },
  unionField: { [key: string]: number | string[] },
  objShorthandField: { [key: string]: string },
  objKeyTypeField: { [key: number]: string },
};