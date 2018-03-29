/* eslint-disable */
// Automatically generated by shapeshifter. Do not modify!
export enum ShapeStringEnumEnum {
  FOO,
  BAR,
  BAZ,
  QUX
}

export interface ShapeBasicStructInterface {
  foo: string;
}

export interface ShapePrimitiveStructInterface {
  string: string;
  bool: boolean;
  number: number;
}

export interface ShapeArrayStructInterface {
  numberArray: number[];
  stringArray: string[];
  shapeArray: Array<ShapeBasicStructInterface>;
}

export interface ShapeEnumStructInterface {
  stringEnum: ShapeStringEnumEnum;
}

export interface ShapeUnionStructInterface {
  multiUnion: number | boolean | ShapeEnumStructInterface;
}

export interface ShapeInterface {
  structAlias: ShapeBasicStructInterface;
  primitiveFields: ShapePrimitiveStructInterface;
  arrayFields: ShapeArrayStructInterface;
  enumFields: ShapeEnumStructInterface;
  unionFields: ShapeUnionStructInterface;
}
