import Definition from '../src/Definition';
import { options } from '../../../tests/mocks';

describe('Definition', () => {
  it('inherits default config and sets attribute', () => {
    const def = new Definition(options, 'foo', { key: 'value' });

    expect(def.attribute).toBe('foo');
    expect(def.config).toEqual({
      nullable: true,
      key: 'value',
      type: 'unknown',
    });
  });

  it('allows for nullable to be customized', () => {
    const def = new Definition(options, 'foo', { nullable: false });

    expect(def.isNullable()).toBe(false);
  });

  it('validates nullable', () => {
    expect(() => new Definition(options, 'foo', { nullable: 'string' })).toThrowError(
      'Invalid Definition field "nullable". Must be a boolean.',
    );
  });
});