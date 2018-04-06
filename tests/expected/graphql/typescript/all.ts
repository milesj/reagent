/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

export enum ArrayEnumFieldEnum {
  FOO,
  BAR,
  BAZ,
  QUX
}

export type Key = string | number;

export enum EnumFieldEnum {
  FOO,
  BAR,
  BAZ,
  QUX
}

export enum ShapeStringEnumEnum {
  FOO,
  BAR,
  BAZ,
  QUX
}

export enum UnionEnumField0Enum {
  FOO,
  BAR
}

export enum UnionEnumField1Enum {
  BAZ,
  QUX
}

export enum UnionUnionField10Enum {
  FOO,
  BAR
}

export enum UnionUnionField11Enum {
  BAZ,
  QUX
}

export interface ReferenceBarInterface {
  boolField: boolean | null;
}

export interface ReferenceFooInterface {
  numberField: number | null;
  refField: ReferenceBarInterface;
}

export interface ArrayShapeObjectInterface {
  foo: string | null;
  bar: boolean | null;
}

export interface ArrayInterface {
  arrayField: Array<Array<string | null> | null> | null;
  boolField: Array<boolean | null> | null;
  enumField: Array<ArrayEnumFieldEnum | null> | null;
  numberField: Array<number | null>;
  shapeField: Array<ArrayShapeObjectInterface | null> | null;
  stringField: Array<string | null> | null;
  unionField: Array<string | number> | null;
}

export interface CoreFooInterface {
  id: Key | null;
  name: string | null;
  foo: string | null;
}

export interface CoreBarInterface {
  id: Key | null;
  name: string | null;
  bar: number | null;
}

export interface CoreInterface {
  id: Key | null;
  name: string | null;
  foo: CoreFooInterface | null;
  fooWithArg: CoreFooInterface;
  bar: CoreBarInterface | null;
  barWithArg: CoreBarInterface;
}

export interface EnumInterface {
  field: EnumFieldEnum | null;
}

export interface PrimitiveInterface {
  boolField: boolean | null;
  boolFieldExpanded: boolean;
  numberField: number | null;
  numberFieldExpanded: number;
  floatField: number | null;
  floatFieldExpanded: number;
  stringField: string | null;
  stringFieldExpanded: string;
}

export interface ReferenceSelfInterface {
  stringField: string | null;
  referenceField: ReferenceSelfInterface | null;
  requiredRefField: ReferenceSelfInterface;
}

export interface ReferenceInterface {
  stringField: string | null;
  refField: ReferenceFooInterface;
  referenceField: ReferenceFooInterface | null;
}

export interface ShapeBasicStructInterface {
  foo: string | null;
}

export interface ShapePrimitiveStructInterface {
  string: string | null;
  bool: boolean;
  number: number;
}

export interface ShapeArrayStructInterface {
  numberArray: Array<number | null> | null;
  stringArray: Array<string | null> | null;
  shapeArray: Array<ShapeBasicStructInterface | null> | null;
}

export interface ShapeEnumStructInterface {
  stringEnum: ShapeStringEnumEnum | null;
}

export interface ShapeUnionStructInterface {
  multiUnion: number | boolean | ShapeEnumStructInterface | null;
}

export interface ShapeInterface {
  structAlias: ShapeBasicStructInterface | null;
  primitiveFields: ShapePrimitiveStructInterface | null;
  arrayFields: ShapeArrayStructInterface | null;
  enumFields: ShapeEnumStructInterface | null;
  unionFields: ShapeUnionStructInterface | null;
}

export interface UnionFooStructInterface {
  foo: string | null;
}

export interface UnionBarStructInterface {
  bar: boolean | null;
}

export interface UnionBazStructInterface {
  baz: boolean | number | null;
}

export interface UnionInterface {
  primitiveField: boolean | number | null;
  enumField: UnionEnumField0Enum | UnionEnumField1Enum | null;
  shapeField: UnionFooStructInterface | UnionBarStructInterface | UnionBazStructInterface | null;
  unionField: boolean | number | UnionUnionField10Enum | UnionUnionField11Enum | UnionFooStructInterface | UnionBarStructInterface | UnionBazStructInterface | null;
}