/**
 * @copyright   2016-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable complexity */

import fs from 'fs';
import { extname } from 'path';
import {
  parse,
  Kind,
  DefinitionNode,
  DocumentNode,
  FieldDefinitionNode,
  NamedTypeNode,
  TypeNode,
  TypeDefinitionNode,
  ListTypeNode,
  NonNullTypeNode,
  EnumTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  UnionTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from 'graphql';
import {
  AttributesField,
  ReferencesField,
  SchemaStructure,
  ShapesField,
  TypeDefinition,
} from 'shapeshifter';

class GraphQLParser {
  document: DocumentNode;

  schematic: DefinitionNode;

  fileExt: string = '';

  name: string = '';

  primaryKey: string = '';

  attributes: AttributesField = {};

  references: ReferencesField = {};

  enums: { [key: string]: (string | number)[] } = {};

  scalars: { [key: string]: boolean } = {};

  shapes: ShapesField = {};

  unions: { [key: string]: TypeDefinition[] } = {};

  constructor(doc: DocumentNode, ext: string) {
    this.fileExt = ext;
    this.document = doc;
    this.schematic = Array.from(this.document.definitions).pop()!;

    if (!this.schematic) {
      /* istanbul ignore next No need to cover */
      throw new SyntaxError('The schematic must be defined as the last GraphQL type.');
    } else if (this.schematic.kind !== Kind.OBJECT_TYPE_DEFINITION) {
      /* istanbul ignore next No need to cover */
      throw new TypeError('The schematic must be an object type.');
    }

    this.name = this.schematic.name.value;

    this.parseDefinitions();
    this.parseAttributes();
  }

  buildAttribute(
    field: FieldDefinitionNode | TypeDefinitionNode,
    type: TypeNode,
    nullable: boolean = true,
    schematic: boolean = false,
  ): TypeDefinition | null {
    const kind = String(type.kind);

    // Non-nullable
    if (kind === Kind.NON_NULL_TYPE) {
      const refinedType = type as NonNullTypeNode;

      return this.buildAttribute(field, refinedType.type, false, schematic);

      // List
    } else if (kind === Kind.LIST_TYPE) {
      const refinedType = type as ListTypeNode;

      return {
        nullable,
        type: 'array',
        valueType: this.buildAttribute(field, refinedType.type, true, schematic)!,
      };

      // Named
    } else if (kind === Kind.NAMED_TYPE) {
      const refinedType = type as NamedTypeNode;
      const { value } = refinedType.name;

      switch (value) {
        case 'ID':
          if (schematic) {
            if (this.primaryKey) {
              /* istanbul ignore next Hard to test */
              throw new SyntaxError(`A primary key for ${this.name} has already been defined.`);
            }

            this.primaryKey = field.name.value;
          }

          return {
            nullable,
            type: 'key',
          };

        case 'Int':
        case 'Float':
        case 'Number':
        case 'String':
        case 'Boolean':
          return {
            nullable,
            type: value.toLowerCase(),
          };

        default:
          // Scalar
          if (this.scalars[value]) {
            return null;
          }

          // Enum
          if (this.enums[value]) {
            return {
              nullable,
              type: 'enum',
              values: this.enums[value],
              valueType: typeof this.enums[value][0],
            };
          }

          // Shapes
          if (this.shapes[value]) {
            return {
              nullable,
              reference: value,
              type: 'shape',
            };
          }

          // Unions
          if (this.unions[value]) {
            return {
              nullable,
              type: 'union',
              valueTypes: this.unions[value],
            };
          }

          // Self references
          if (value === this.name) {
            return {
              nullable,
              self: true,
              type: 'reference',
            };
          }

          // References
          this.references[value] = `./${value}${this.fileExt}`;

          return {
            nullable,
            reference: value,
            type: 'reference',
          };
      }
    }

    return null;
  }

  extractEnum(definition: EnumTypeDefinitionNode) {
    if (!definition.values) {
      return;
    }

    this.enums[definition.name.value] = definition.values.map(({ name: { value } }) =>
      value.match(/^\d+$/u) ? Number(value) : String(value),
    );
  }

  extractShape(definition: ObjectTypeDefinitionNode) {
    const attributes: { [key: string]: TypeDefinition } = {};

    (definition.fields || []).forEach((field: FieldDefinitionNode) => {
      const attr = this.buildAttribute(field, field.type);

      if (attr) {
        attributes[field.name.value] = attr;
      }
    });

    this.shapes[definition.name.value] = attributes;
  }

  extractUnion(definition: UnionTypeDefinitionNode) {
    if (!definition.types) {
      return;
    }

    const values: TypeDefinition[] = [];

    definition.types.forEach((type: NamedTypeNode) => {
      const attr = this.buildAttribute(definition, type);

      if (attr) {
        values.push(attr);
      }
    });

    this.unions[definition.name.value] = values;
  }

  parseAttributes() {
    // @ts-expect-error
    const { fields = [] } = this.schematic;

    fields.forEach((fieldDefinition: FieldDefinitionNode) => {
      const attr = this.buildAttribute(fieldDefinition, fieldDefinition.type, true, true);

      if (attr) {
        this.attributes[fieldDefinition.name.value] = attr;
      }
    });
  }

  parseDefinitions() {
    this.document.definitions.forEach((definition: DefinitionNode) => {
      if (definition === this.schematic) {
        return;
      }

      switch (definition.kind) {
        case Kind.ENUM_TYPE_DEFINITION:
          this.extractEnum(definition as EnumTypeDefinitionNode);
          break;

        case Kind.OBJECT_TYPE_DEFINITION:
          this.extractShape(definition as ObjectTypeDefinitionNode);
          break;

        case Kind.UNION_TYPE_DEFINITION:
          this.extractUnion(definition as UnionTypeDefinitionNode);
          break;

        case Kind.SCALAR_TYPE_DEFINITION:
          this.scalars[(definition as ScalarTypeDefinitionNode).name.value] = true;
          break;

        case Kind.INTERFACE_TYPE_DEFINITION:
          // Ignore interfaces
          break;

        default:
          break;
      }
    });
  }

  toSchematic(): SchemaStructure {
    return {
      attributes: this.attributes,
      meta: {
        primaryKey: this.primaryKey || 'id',
      },
      name: this.name,
      references: this.references,
      shapes: this.shapes,
    };
  }
}

export default function parseGraphQL(path: string): SchemaStructure {
  return new GraphQLParser(parse(fs.readFileSync(path, 'utf8')), extname(path)).toSchematic();
}
