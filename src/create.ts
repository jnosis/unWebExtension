import type { CreateOptions } from './types.ts';
import { basename, resolve } from './deps.ts';
import {
  apiTemplate,
  backgroundTemplate,
  configTemplate,
  contentScriptTemplate,
  optionsTemplate,
  packageTemplate,
  readmeTemplate,
  staticTemplate,
  typesTemplate,
  uiTemplate,
  webpackTemplate,
  zipTemplate,
} from './template/index.ts';
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

    await this.#createStatic();
    await this.#createUi();
    await this.#createChore();

    const t1 = performance.now();
    logger.end(t1 - t0);
  }

  async #createTypes() {
    logger.start('types');
    const types = typesTemplate(this.#options);

    await this.#writeTextFile('src/types.ts', types);
  }

  async #createAPIs() {
    logger.start('APIs');

    const [platformText, apiText, indexText, manifestText] = apiTemplate(
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
    const [script, index, listener, load] = backgroundTemplate(this.#options);

    await this.#writeTextFile('src/background.ts', script);

    await this.#mkdir('src/background');
    await this.#writeTextFile('src/background/index.ts', index);
    await this.#writeTextFile('src/background/listener.ts', listener);
    await this.#writeTextFile('src/background/load.ts', load);
  }

  async #createContentScripts() {
    logger.start('Content Scripts');
    const [script, css] = contentScriptTemplate();

    await this.#writeTextFile('src/content-script.ts', script);
    await this.#writeTextFile('src/my-styles.ts', css);
  }

  async #createOption() {
    logger.start('options');
    const [html, script, storage, change] = optionsTemplate(this.#name);

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

    const [localeTemplate, localeScriptTemplate, changelogTemplate] =
      staticTemplate(this.#name, this.#options);

    await this.#mkdir('static/_locales');
    await Promise.all(
      this.#options.locales.map(async (locale) => {
        await this.#mkdir(`static/_locales/${locale}`);
        await this.#writeTextFile(
          `static/_locales/${locale}/message.json`,
          localeTemplate,
        );
      }),
    );

    await this.#writeTextFile('src/locale.ts', localeScriptTemplate);
    await this.#writeTextFile('static/changelog.html', changelogTemplate);
  }

  async #createUi() {
    logger.start('UIs');

    const { contextMenus, notification } = uiTemplate;

    await this.#mkdir('src/ui');
    await this.#writeTextFile('src/ui/notification.ts', notification);
    this.#options.apis.includes('contextMenus') &&
      await this.#writeTextFile('src/ui/contextMenus.ts', contextMenus);
  }

  async #createChore() {
    logger.start('chores');

    const [packageJson, pnpmLock] = packageTemplate(name);

    await this.#writeTextFile('package.json', packageJson);
    await this.#writeTextFile('pnpm-lock.yaml', pnpmLock);

    const [gitignore, tsconfig] = configTemplate();

    await this.#writeTextFile('.gitignore', gitignore);
    await this.#writeTextFile('tsconfig.json', tsconfig);

    const readme = readmeTemplate(name);

    await this.#writeTextFile('readme.md', readme);

    const [
      webpackConfig,
      webpackCommon,
      webpackDev,
      webpackProd,
      apiLoader,
      devCodeDisabler,
      manifestLoader,
    ] = webpackTemplate(this.#options);

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

    const zipScript = zipTemplate(name);

    await this.#writeTextFile('zip.js', zipScript);
  }

  async #mkdir(path: string) {
    const resolved = this.#resolve(path);
    await Deno.mkdir(resolved);
    logger.make(this.#root, path);
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
