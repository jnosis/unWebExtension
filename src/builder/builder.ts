// import * as esbuild from 'esbuild';
import { parse } from 'std/flags/mod.ts';
import { copy } from 'std/fs/mod.ts';
import { zip } from './zip.ts';

export type Platform = 'chrome' | 'firefox' | 'deno';

export type BuilderOptions = {
  'static-dir'?: string;
  'src-dir'?: string;
  'dist-dir'?: string;
  'import-map'?: string;
  'platform'?: Platform;
};

export class Builder {
  private _options: BuilderOptions;

  constructor() {
    this._options = {
      'static-dir': 'static',
      'src-dir': './src',
      'dist-dir': './dist',
      'import-map': './import_map.json',
    };
  }

  init() {
    this._options = {
      'static-dir': 'static',
      'src-dir': './src',
      'dist-dir': './dist',
      'import-map': './import_map.json',
    };
  }

  parse(args: string[]) {
    const parsed = parse(args);

    const options = JSON.parse(
      JSON.stringify({
        'static-dir': parsed['static-dir'],
        'src-dir': parsed['src-dir'],
        'dist-dir': parsed['dist-dir'],
        'import-map': parsed['import-map'],
        'platform': parsed.platform,
      }),
    );

    this._options = { ...this._options, ...options };
  }

  build() {
    console.log(this._options);
  }

  async copyStatic(platform: Platform) {
    const options = { overwrite: true };
    await copy(
      this._options['static-dir']!,
      `${this._options['dist-dir']}/${platform}`,
      options,
    );
  }

  async zip(platform: Platform) {
    const src = `${this._options['dist-dir']!}/${platform}`;
    await zip(src, platform);
  }

  get options(): BuilderOptions {
    return this._options;
  }
}
