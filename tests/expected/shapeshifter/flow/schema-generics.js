/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */
/* @flow */

import Schema from 'shapeshifter';

export type Key = string | number;

export const multipleChildrenSchema = new Schema<MultipleChildrenType>('multiple-children', 'uuid');

export const singleChildSchema = new Schema<SingleChildType>('single-child');

export const parentSchema = new Schema<ParentType>('parents');

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

export type MultipleChildrenType = {
  uuid: ?string,
};

export type SingleChildType = {
  id: ?number,
  active: ?boolean,
  self: ?SingleChildType,
};

export type ParentType = {
  id: ?number,
  name: ?string,
  children: ?Array<?MultipleChildrenType>,
  orphan: ?SingleChildType,
  polymorph: SingleChildType | MultipleChildrenType | null,
  polymorph_fk: ?Key,
  polymorph_type: ?string,
};