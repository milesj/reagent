/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */
/* @flow */

import PropTypes from 'prop-types';
import Schema from 'shapeshifter';

export const multipleChildrenSchema = new Schema('multiple-children', 'uuid');

export const singleChildSchema = new Schema('single-child');

export const parentSchema = new Schema('parents');

singleChildSchema.hasOne({
  self: singleChildSchema,
});

parentSchema.hasOne({
  orphan: singleChildSchema,
}).belongsToMany({
  children: multipleChildrenSchema,
});

export const MultipleChildrenShape = PropTypes.shape({
  uuid: PropTypes.string,
});

export type MultipleChildrenType = {
  uuid: ?string,
};

export const SingleChildShape = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  self: (...args) => SingleChildShape(...args),
});

export type SingleChildType = {
  id: ?number,
  active: ?boolean,
  self: ?SingleChildType,
};

export const ParentShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.arrayOf(MultipleChildrenShape),
  orphan: SingleChildShape,
});

export type ParentType = {
  id: ?number,
  name: ?string,
  children: ?Array<?MultipleChildrenType>,
  orphan: ?SingleChildType,
};
