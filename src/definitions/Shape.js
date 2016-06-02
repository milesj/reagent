import Definition from '../Definition';
import Factory from '../Factory';
import isObject from '../helpers/isObject';

export default class ShapeDefinition extends Definition {
  /**
   * {@inheritdoc}
   */
  validateConfig() {
    super.validateConfig();

    const { attributes } = this.config;

    if (!isObject(attributes) || !Object.keys(attributes).length) {
      throw new SyntaxError(
        'Shape definitions require an "attributes" property, ' +
        'which is an object mapping of attributes to type definitions.'
      );
    }

    this.attributes = Object.keys(attributes).map(attribute => (
      Factory.definition(attribute, attributes[attribute])
    ));
  }
}