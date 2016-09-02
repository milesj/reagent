import { PropTypes } from 'react';

export const SetsBasicShape = PropTypes.shape({
  foo: PropTypes.string,
  baz: PropTypes.bool.isRequired,
});

export const SetsWithRequiredShape = PropTypes.shape({
  bar: PropTypes.number.isRequired,
  baz: PropTypes.bool,
  qux: PropTypes.func,
});

export const SetsWithNullShape = PropTypes.shape({
  foo: PropTypes.string,
  qux: PropTypes.func,
});

export const SetsWithBothShape = PropTypes.shape({
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func.isRequired,
});

export const SetsShape = PropTypes.shape({
  foo: PropTypes.string,
  bar: PropTypes.number,
  baz: PropTypes.bool.isRequired,
  qux: PropTypes.func,
});
