/**
 * @copyright   2016-2018, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import fs from 'fs';
import path from 'path';
import optimal, { array, bool, string } from 'optimal';
import Builder from './Builder';
import RendererFactory from './RendererFactory';
import Schematic from './Schematic';
import readWithNode from './readers/node';
import readWithGraphQL from './readers/graphql';
import readWithYaml from './readers/yaml';
import { Options } from './types';

type ResolveUnit = {
  parentSchematic?: Schematic;
  refKey?: string;
  resolvePath: string;
};

export default class Transpiler {
  options: Options;

  constructor(options: Options) {
    this.options = optimal(options, {
      defaultNullable: bool(),
      disableEslint: bool(),
      importPath: string('shapeshifter'),
      includeAttributes: bool(),
      includeDefinitions: bool(),
      includeSchemas: bool(),
      indentCharacter: string('  '),
      renderers: array(string()).notEmpty(),
      stripPropTypes: bool(),
      useDefine: bool(),
      typescriptSchemaGenerics: bool(),
    });
  }

  /**
   * Transpile either a file or a folder by rendering each schematic file.
   */
  /* istanbul ignore next */
  transpile(targets: string[]): Promise<string> {
    return Promise.all(
      targets.map(target => {
        const stats = fs.statSync(target);
        const paths = [];

        if (stats.isDirectory()) {
          paths.push(...fs.readdirSync(target).map(file => path.resolve(target, file)));
        } else if (stats.isFile()) {
          paths.push(path.resolve(target));
        } else {
          throw new Error(`Unsupported file type: ${target}.`);
        }

        return paths;
      }),
    ).then(targetPaths =>
      this.generate(targetPaths.reduce((paths, target) => [...paths, ...target], [])),
    );
  }

  /**
   * Transpile a folder by looping over all JS and JSON files and rendering them.
   */
  transpileFolder(folderPath: string): string {
    return this.generate(fs.readdirSync(folderPath).map(file => path.join(folderPath, file)));
  }

  /**
   * Transpile a file by rendering the schematic at the defined path.
   */
  transpileFile(filePath: string): string {
    return this.generate([filePath]);
  }

  /**
   * Extract a list of file paths based on references defined within the schematic.
   */
  extractSchematics(filePath: string): Schematic[] {
    const basePath = path.dirname(filePath);
    const toResolve: ResolveUnit[] = [{ resolvePath: filePath }];
    const schematics = [];

    // Use `require()` as it handles JSON and JS files easily
    while (toResolve.length > 0) {
      const { resolvePath, parentSchematic, refKey } = toResolve.shift()!;
      const pathExt = path.extname(resolvePath);
      let data = null;

      /* istanbul ignore else */
      if (pathExt === '.js' || pathExt === '.json') {
        data = readWithNode(resolvePath);
      } else if (pathExt === '.gql' || pathExt === '.graphql') {
        data = readWithGraphQL(resolvePath);
      } else if (pathExt === '.yml' || pathExt === '.yaml') {
        data = readWithYaml(resolvePath);
      } else {
        // eslint-disable-next-line no-continue
        continue;
      }

      const schematic = new Schematic(resolvePath, data, this.options);

      schematics.unshift(schematic);

      // Assign to parent
      if (parentSchematic && refKey) {
        parentSchematic.referenceSchematics[refKey] = schematic;
      }

      // Extract child references
      Object.keys(schematic.references).forEach((ref: string) => {
        toResolve.push({
          parentSchematic: schematic,
          refKey: ref,
          resolvePath: path.normalize(path.join(basePath, schematic.references[ref])),
        });
      });
    }

    return schematics;
  }

  /**
   * Generate the output by locating a schematic for every defined file path.
   */
  generate(filePaths: string[]): string {
    return this.generateOutput(
      filePaths.reduce(
        (schematics: Schematic[], filePath: string) => [
          ...schematics,
          ...this.extractSchematics(filePath),
        ],
        [],
      ),
    );
  }

  /**
   * Generate the output by combining all schematics into a single output.
   */
  generateOutput(schematics: Schematic[]): string {
    const builder = new Builder();
    const rendered = new Set();

    if (this.options.disableEslint) {
      builder.comments.add('/* eslint-disable */');
    }

    // Wrap in a set to remove duplicates
    schematics.forEach((schematic: Schematic) => {
      if (rendered.has(schematic.path)) {
        return;
      }

      this.options.renderers.forEach(renderer => {
        RendererFactory.factory(renderer, this.options, builder, schematic).parse();

        rendered.add(schematic.path);
      });
    });

    // Combine and filter the chunks
    let output = '/* Automatically generated by shapeshifter. Do not modify! */\n';

    function addToOutput(set: Set<string>, length: number = 1) {
      const list = Array.from(set).filter(Boolean);

      if (list.length === 0) {
        return;
      }

      output += list.join('\n'.repeat(length));
      output += '\n\n';
    }

    addToOutput(builder.comments);
    addToOutput(builder.imports);
    addToOutput(builder.constants);
    addToOutput(builder.header, 2);
    addToOutput(builder.schemas, 2);
    addToOutput(builder.relations, 2);
    addToOutput(builder.sets, 2);

    return `${output.trim()}\n`;
  }
}
