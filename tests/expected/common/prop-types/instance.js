/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import PropTypes from 'prop-types';
import InstanceDefault, { InstanceClassName } from '../stub';

export const INST_STR = 'foobar';
export const INST_ENABLED = true;

export const InstanceShape = PropTypes.shape({
  instField: PropTypes.instanceOf(InstanceClassName),
  instanceField: PropTypes.instanceOf(InstanceDefault),
});
