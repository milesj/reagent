import { options } from '../mocks';
import ShapeDefinition from '../../src/definitions/Shape';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Shape', () => {
  it('doesnt error if a `reference` is defined', () => {
    expect(() => new ShapeDefinition(options, 'foo', { reference: 'foo' })).not.toThrow();
  });

  it('errors if neither `attributes` or `reference` is defined', () => {
    expect(() => new ShapeDefinition(options, 'foo', {})).toThrow(
      'ShapeDefinition. Only one of these fields may be defined: reference, attributes',
    );
  });

  it('errors if `reference` is not a string', () => {
    // @ts-expect-error
    expect(() => new ShapeDefinition(options, 'foo', { reference: 123 })).toThrow(
      'Invalid ShapeDefinition field "reference". Must be a string.',
    );
  });

  it('errors if `attributes` is a non-object', () => {
    // @ts-expect-error
    expect(() => new ShapeDefinition(options, 'foo', { attributes: 'foo' })).toThrow(
      'Invalid ShapeDefinition field "attributes". Must be a plain object.',
    );
  });

  it('errors if `attributes` has no properties', () => {
    expect(() => new ShapeDefinition(options, 'foo', { attributes: {} })).toThrow(
      'Invalid ShapeDefinition field "attributes". Object cannot be empty.',
    );
  });

  it('errors if `attributes` has the wrong values', () => {
    // @ts-expect-error
    expect(() => new ShapeDefinition(options, 'foo', { attributes: { foo: 123 } })).toThrow(
      'Invalid ShapeDefinition field "attributes.foo". Type must be one of: string, shape',
    );
  });

  it('creates an array of `Definition`s for `attributes`', () => {
    const def = new ShapeDefinition(options, 'foo', {
      attributes: {
        foo: 'string',
        bar: 'number',
      },
    });

    expect(def.attributes![0]).toBeInstanceOf(StringDefinition);
    expect(def.attributes![1]).toBeInstanceOf(NumberDefinition);
  });
});
