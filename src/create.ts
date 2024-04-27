import type { CreateOptions } from './types.ts';
import { basename, resolve } from '@std/path';
import * as template from './template/index.ts';
import logger from './util/logger.ts';

export class CreateWebExtension {
  #name: string;
  #options: CreateOptions;
  #root: string;
  constructor(name: string, options: CreateOptions) {
    this.#name = name;
    this.#options = { ...options };
    this.#root = basename(options.directory);
  }

  async create() {
    const t0 = performance.now();
    logger.start(this.#name);

    (this.#options.directory !== './') && await this.#mkdir('');
    await this.#mkdir('src');
    await this.#mkdir('static');

    await this.#createTypes();
    await this.#createAPIs();

    this.#options.createBackground && await this.#createBackground();
    this.#options.createContentScripts && await this.#createContentScripts();
    this.#options.createOptions && await this.#createOption();
    this.#options.createPopup && await this.#createPopUp();

    await this.#createImages();
    await this.#createStatic();
    await this.#createUi();
    await this.#createChore();

    const t1 = performance.now();
    logger.end(t1 - t0);
  }

  async #createTypes() {
    logger.start('types');
    const types = template.types(this.#options);

    await this.#writeTextFile('src/types.ts', types);
  }

  async #createAPIs() {
    logger.start('APIs');

    const [platformText, apiText, indexText, manifestText] = template.api(
      this.#options,
    );

    await this.#mkdir('src/api');
    await this.#writeTextFile('src/api/platform.ts', platformText);
    await Promise.all(
      this.#options.apis.map((api) =>
        this.#writeTextFile(`src/api/${api}.ts`, apiText)
      ),
    );
    await this.#writeTextFile('src/api/api.ts', indexText);

    await this.#writeTextFile('static/manifest.json', manifestText);
  }

  async #createBackground() {
    logger.start('backgrounds');
    const [script, index, listener, load] = template.background(this.#options);

    await this.#writeTextFile('src/background.ts', script);

    await this.#mkdir('src/background');
    await this.#writeTextFile('src/background/index.ts', index);
    await this.#writeTextFile('src/background/listener.ts', listener);
    await this.#writeTextFile('src/background/load.ts', load);
  }

  async #createContentScripts() {
    logger.start('Content Scripts');
    const [script, css] = template.contentScript();

    await this.#writeTextFile('src/content-script.ts', script);
    await this.#writeTextFile('src/my-styles.ts', css);
  }

  async #createImages() {
    logger.start('Images');
    const [chrome, firefox, icons] = template.images();

    await this.#mkdir('image');
    await this.#writeImageFile('image/chrome-web-store.png', chrome);
    await this.#writeImageFile('image/get-the-addon.png', firefox);

    await this.#mkdir('image/icons');
    for (const mode in icons) {
      await this.#mkdir(`image/icons/${mode}`);
      const icon = icons[mode as keyof typeof icons];
      for (const size in icon) {
        await this.#writeImageFile(
          `image/icons/${mode}/icon${size}.png`,
          icon[size as keyof typeof icon],
        );
      }
    }
  }

  async #createOption() {
    logger.start('options');
    const [html, script, storage, change] = template.options(this.#name);

    await this.#writeTextFile('static/options.html', html);
    await this.#writeTextFile('src/options.ts', script);

    await this.#mkdir('src/option');
    await this.#writeTextFile('src/option/storage.ts', storage);
    await this.#writeTextFile('src/option/changeOption.ts', change);
  }

  async #createPopUp() {
    logger.start('popup');

    await this.#writeTextFile('static/popup.html', '');
    await this.#writeTextFile('src/popup.ts', '');
  }

  async #createStatic() {
    logger.start('static');

    const [localeTemplate, localeScriptTemplate, changelogTemplate] = template
      .statics(this.#name, this.#options);

    await this.#mkdir('static/_locales');
    await Promise.all(
      this.#options.locales.map(async (locale) => {
        await this.#mkdir(`static/_locales/${locale}`);
        await this.#writeTextFile(
          `static/_locales/${locale}/messages.json`,
          localeTemplate,
        );
      }),
    );

    await this.#writeTextFile('src/locale.ts', localeScriptTemplate);
    await this.#writeTextFile('static/changelog.html', changelogTemplate);
  }

  async #createUi() {
    logger.start('UIs');

    const { contextMenus, notification } = template.ui;

    await this.#mkdir('src/ui');
    await this.#writeTextFile('src/ui/notification.ts', notification);
    this.#options.apis.includes('contextMenus') &&
      await this.#writeTextFile('src/ui/contextMenus.ts', contextMenus);
  }

  async #createChore() {
    logger.start('chores');

    const [packageJson, pnpmLock] = template.packages(this.#name);

    await this.#writeTextFile('package.json', packageJson);
    await this.#writeTextFile('pnpm-lock.yaml', pnpmLock);

    const [gitignore, tsconfig] = template.config();

    await this.#writeTextFile('.gitignore', gitignore);
    await this.#writeTextFile('tsconfig.json', tsconfig);

    const readme = template.readme(this.#name);

    await this.#writeTextFile('readme.md', readme);

    const [
      webpackConfig,
      webpackCommon,
      webpackDev,
      webpackProd,
      apiLoader,
      devCodeDisabler,
      manifestLoader,
    ] = template.webpack(this.#options);

    await this.#writeTextFile('webpack.config.js', webpackConfig);
    await this.#mkdir('webpack');
    await this.#writeTextFile('webpack/webpack.common.js', webpackCommon);
    await this.#writeTextFile('webpack/webpack.dev.js', webpackDev);
    await this.#writeTextFile('webpack/webpack.prod.js', webpackProd);
    await this.#writeTextFile('webpack/api-loader.js', apiLoader);
    await this.#writeTextFile(
      'webpack/dev-code-disabler.js',
      devCodeDisabler,
    );
    await this.#writeTextFile('webpack/manifest-loader.js', manifestLoader);

    const zipScript = template.zip(this.#name);

    await this.#writeTextFile('zip.js', zipScript);
  }

  async #mkdir(path: string) {
    const resolved = this.#resolve(path);
    await Deno.mkdir(resolved);
    logger.make(this.#root, path);
  }

  async #writeImageFile(path: string, url: string) {
    const resolved = this.#resolve(path);
    const response = await fetch(url);
    const data = new Uint8Array(await response.arrayBuffer());
    await Deno.writeFile(resolved, data);
    logger.create(path, resolved);
  }

  async #writeTextFile(path: string, text: string) {
    const resolved = this.#resolve(path);
    await Deno.writeTextFile(resolved, text);
    logger.create(path, resolved);
  }

  #resolve(path: string) {
    return resolve(this.#options.directory ?? './', path);
  }
}

new CreateWebExtension('test', {
  apis: ['commands', 'contextMenus'],
  permissions: ['contextMenus'],
  locales: [],
  directory: './testdata',
  createBackground: true,
  createContentScripts: false,
  createOptions: true,
  createPopup: true,
});
