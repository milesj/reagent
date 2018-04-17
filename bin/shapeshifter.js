#! /usr/bin/env node

/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

/* eslint-disable */

const app = require('yargs');
const Transpiler = require('../lib/Transpiler').default;

app
  .usage(
    '$0 <paths..>',
    'Transpile source files or folder.',
    {
      attributes: {
        boolean: true,
        default: false,
        description: 'Include an attribute list in the schema class export.',
      },
      definitions: {
        boolean: true,
        default: false,
        description: 'Include type annotations and definitions in the output.',
      },
      'disable-eslint': {
        boolean: true,
        default: false,
        description: 'Prepend an eslint-disable comment to the top of the output.',
      },
      flow: {
        boolean: true,
        default: false,
        description: 'Generate Flow definitions.',
      },
      indent: {
        default: '  ',
        description: 'The indentation characters to use.',
        string: true,
      },
      import: {
        default: 'shapeshifter',
        description: 'The default import path to a Schema class.',
        string: true,
      },
      nullable: {
        boolean: true,
        default: false,
        description: 'Mark attributes as nullable by default (recommended).',
      },
      'prop-types': {
        boolean: true,
        default: false,
        description: 'Generate PropTypes definitions.',
      },
      schemas: {
        boolean: true,
        default: false,
        description: 'Include schema class exports in the output.',
      },
      'strip-prop-types': {
        boolean: true,
        default: false,
        description: 'Strip PropTypes shapes in production.',
      },
      typescript: {
        boolean: true,
        default: false,
        description: 'Generate TypeScript definitions.',
      },
      'typescript-schema-generics': {
        boolean: true,
        default: false,
        description: 'Types the schemas with the type interface',
      },
      'use-define': {
        boolean: true,
        default: false,
        description: 'Reduce the output of schema ORM definitions.',
      },
    },
    function(options) {
      const renderers = [
        options.flow ? 'flow' : '',
        options.propTypes ? 'prop-types' : '',
        options.typescript ? 'typescript' : '',
      ];

      new Transpiler({
        defaultNullable: options.nullable,
        disableEslint: options.disableEslint,
        importPath: options.import,
        includeAttributes: options.attributes,
        includeDefinitions: options.definitions,
        includeSchemas: options.schemas,
        indentCharacter: options.indent,
        renderers: renderers.filter(Boolean),
        stripPropTypes: options.stripPropTypes,
        useDefine: options.useDefine,
        typeScriptSchemaGenerics: options.typeScriptSchemaGenerics,
      })
        .transpile(options.paths)
        .then(function(output) {
          console.log(output);
        })
        .catch(function(error) {
          console.error(error.message);
          process.exitCode = 1;
        });
    },
  )
  .help().argv;
