// import * as esbuild from 'esbuild';
import { parse } from 'std/flags/mod.ts';

type Platform = 'chrome' | 'firefox' | 'deno';

type Options = {
  'src-dir'?: string;
  'dist-dir'?: string;
  'import-map'?: string;
  'platform'?: Platform;
};

export class Main {
  private _options: Options;

  constructor() {
    this._options = {
      'src-dir': './src',
      'dist-dir': './dist',
      'import-map': './import_map.json',
    };
  }

  init() {
    this._options = {
      'src-dir': './src',
      'dist-dir': './dist',
      'import-map': './import_map.json',
    };
  }

  parse(args: string[]) {
    this._options = { ...this._options, ...parse(args) };
  }

  build() {
    console.log(this._options);
  }

  get options(): Options {
    return this._options;
  }
}

const main = new Main();
main.parse(Deno.args);
main.build();
