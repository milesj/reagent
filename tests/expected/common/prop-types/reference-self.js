/* Automatically generated by shapeshifter. Do not modify! */
/* eslint-disable */

import PropTypes from 'prop-types';

export const ReferenceSelfBasicShape = PropTypes.shape({
  stringField: PropTypes.string,
});

export const ReferenceSelfShape = PropTypes.shape({
  stringField: PropTypes.string,
  referenceField: (...args) => ReferenceSelfShape(...args),
  requiredRefField: (...args) => ReferenceSelfShape(...args),
  subsetRefField: PropTypes.arrayOf(ReferenceSelfBasicShape),
});
