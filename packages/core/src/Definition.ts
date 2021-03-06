import optimal, { bool, string, shape, union, UnionPredicate } from 'optimal';
import normalizeType from './helpers/normalizeType';
import { Config, Options } from './types';

export default class Definition<T extends Config> {
  options: Options;

  attribute: string;

  config: T;

  /**
   * Represents a type definition for an attribute.
   */
  constructor(
    options: Options,
    attribute: string,
    config: Partial<T> = {},
    validate: boolean = true,
  ) {
    this.options = options;
    this.attribute = attribute;
    // @ts-expect-error
    this.config = {
      nullable: options.defaultNullable,
      optional: options.defaultOptional,
      ...config,
    };

    if (validate) {
      this.validateConfig();
    }
  }

  /**
   * Create an option for type definitions that can be a string or object.
   */
  createUnionType(
    defaultValue: string | { type: string } = '',
  ): UnionPredicate<string | { type: string }> {
    return union<string | { type: string }>(
      [
        string().notEmpty(),
        shape({
          type: string().notEmpty().required(),
        }),
      ],
      defaultValue,
    ).required();
  }

  /**
   * Returns true if the attribute allows nulls.
   */
  isNullable(): boolean {
    return this.config.nullable || false;
  }

  /**
   * Returns true if the attribute is not required.
   */
  isOptional(): boolean {
    return this.config.optional || false;
  }

  /**
   * Validate the definition configuration.
   */
  validateConfig() {
    const { name } = this.constructor;

    this.config = optimal(
      this.config,
      {
        nullable: bool(),
        optional: bool(),
        type: string(
          normalizeType(name.replace('Definition', '').toLowerCase() || 'unknown'),
        ).notEmpty(),
      },
      {
        name: name || 'Definition',
        unknown: true,
      },
    ) as T;
  }
}
