import { options } from '../mocks';
import UnionDefinition from '../../src/definitions/Union';
import BoolDefinition from '../../src/definitions/Bool';
import NumberDefinition from '../../src/definitions/Number';
import StringDefinition from '../../src/definitions/String';

describe('definitions/Union', () => {
  it('errors if `valueTypes` is not an array', () => {
    expect(() => (
      new UnionDefinition(options, 'foo', { valueTypes: 123 })
    )).toThrowError('Invalid UnionDefinition option "valueTypes". Must be an array.');
  });

  it('errors if `valueTypes` has no items', () => {
    expect(() => (
      new UnionDefinition(options, 'foo', { valueTypes: [] })
    )).toThrowError('Invalid UnionDefinition option "valueTypes". Array cannot be empty.');
  });

  it('creates an array of `Definition`s for `valueTypes`', () => {
    const def = new UnionDefinition(options, 'foo', {
      valueTypes: ['bool', 'number', 'string'],
    });

    expect(def.valueTypes[0]).toBeInstanceOf(BoolDefinition);
    expect(def.valueTypes[1]).toBeInstanceOf(NumberDefinition);
    expect(def.valueTypes[2]).toBeInstanceOf(StringDefinition);
  });
});
