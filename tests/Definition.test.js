import { expect } from 'chai';
import Definition from '../lib/Definition';

describe('Definition', () => {
  it('inherits default config and sets attribute', () => {
    const def = new Definition('foo', { key: 'value' });

    expect(def.attribute).to.equal('foo');
    expect(def.config).to.deep.equal({
      null: true,
      required: false,
      key: 'value',
    });
  });

  it('allows for null and required to be customized', () => {
    const def = new Definition('foo', { null: false, required: true });

    expect(def.isNullable()).to.equal(false);
    expect(def.isRequired()).to.equal(true);
  });

  it('validates null and required', () => {
    expect(() => (
      new Definition('foo', { null: 'string' })
    )).to.throw(TypeError, 'Invalid type detected, "null" property must be a boolean.');

    expect(() => (
      new Definition('foo', { required: 'string' })
    )).to.throw(TypeError, 'Invalid type detected, "required" property must be a boolean.');
  });
});