/* eslint-disable */
// Automatically generated by shapeshifter. Do not modify!
// @flow
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
