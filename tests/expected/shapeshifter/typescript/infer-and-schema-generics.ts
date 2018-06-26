/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import PropTypes from 'prop-types';
import Schema from 'shapeshifter';

export const KeyShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export type Key = string | number;

export const multipleChildrenSchema = new Schema<MultipleChildrenShape>('multiple-children', 'uuid');

export const singleChildSchema = new Schema<SingleChildShape>('single-child');

export const parentSchema = new Schema<ParentShape>('parents');

singleChildSchema
  .hasOne({
    self: singleChildSchema,
  });

parentSchema
  .morphTo({
    Single: singleChildSchema,
    'Model::Multiple': multipleChildrenSchema,
  }, 'polymorph', '_type', '_fk')
  .belongsToMany({
    children: multipleChildrenSchema,
  })
  .hasOne({
    orphan: singleChildSchema,
  });

export const MultipleChildrenShape = PropTypes.shape({
  uuid: PropTypes.string,
});

export interface MultipleChildrenShape {
  uuid?: string;
}

export const SingleChildShape = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  self: (...args) => SingleChildShape(...args),
});

export interface SingleChildShape {
  id?: number;
  active?: boolean;
  self?: SingleChildShape;
}

export const ParentShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.arrayOf(MultipleChildrenShape),
  orphan: SingleChildShape,
  polymorph: PropTypes.oneOfType([
    SingleChildShape,
    MultipleChildrenShape,
  ]),
  polymorph_fk: KeyShape,
  polymorph_type: PropTypes.string,
});

export interface ParentShape {
  id?: number;
  name?: string;
  children?: Array<MultipleChildrenShape>;
  orphan?: SingleChildShape;
  polymorph?: SingleChildShape | MultipleChildrenShape;
  polymorph_fk?: Key;
  polymorph_type?: string;
}
