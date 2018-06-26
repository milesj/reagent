/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */
/* @flow */

import PropTypes from 'prop-types';
import Schema from 'shapeshifter';

export const KeyShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export type Key = string | number;

export const multipleChildrenSchema = new Schema('multiple-children', 'uuid');

export const singleChildSchema = new Schema('single-child');

export const parentSchema = new Schema('parents');

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

export type MultipleChildrenType = {
  uuid?: string,
};

export const SingleChildShape = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  self: (...args) => SingleChildShape(...args),
});

export type SingleChildType = {
  id?: number,
  active?: boolean,
  self?: SingleChildType,
};

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

export type ParentType = {
  id?: number,
  name?: string,
  children?: Array<MultipleChildrenType>,
  orphan?: SingleChildType,
  polymorph?: SingleChildType | MultipleChildrenType,
  polymorph_fk?: Key,
  polymorph_type?: string,
};
