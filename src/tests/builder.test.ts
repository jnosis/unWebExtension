import { assert, assertEquals } from 'testing/asserts.ts';
import { beforeEach, describe, it } from 'testing/bdd.ts';
import { path } from '../builder/deps.ts';
import { Builder } from '../builder/builder.ts';
import { makeArgsAndOptions, makeUnnecessaryArgs } from './args_utils.ts';

const moduleDir = path.dirname(path.fromFileUrl(import.meta.url));
const testdataDir = path.resolve(moduleDir, 'testdata');

describe('Builder', () => {
  let builder: Builder;

  beforeEach(() => {
    builder = new Builder();
  });

  describe('Set options based on argument values', () => {
    it('initializes options with default values when no arguments are present', () => {
      assertEquals(builder.options, {
        'static-dir': 'static',
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
        'mode': 'dev',
      });
    });

    it('sets all options when all arguments are present', () => {
      const { args, options } = makeArgsAndOptions();
      builder.parse(args);

      assertEquals(builder.options, options);
    });

    it('sets all options except "static-dir" when only argument "static-dir" is absent', () => {
      const { args, options } = makeArgsAndOptions({ staticDirFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['static-dir'], 'static');
      assertEquals(builder.options, options);
    });

    it('sets all options except "src-dir" when only argument "src-dir" is absent', () => {
      const { args, options } = makeArgsAndOptions({ srcDirFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['src-dir'], './src');
      assertEquals(builder.options, options);
    });

    it('sets all options except "dist-dir" option when only argument "dist-dir" is absent', () => {
      const { args, options } = makeArgsAndOptions({ distDirFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['dist-dir'], './dist');
      assertEquals(builder.options, options);
    });

    it('sets all options except "import-map" option when only argument "import-map" is absent', () => {
      const { args, options } = makeArgsAndOptions({ importMapFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['import-map'], './import_map.json');
      assertEquals(builder.options, options);
    });

    it('Set all options except "platform" option when only argument "platform" is absent', () => {
      const { args, options } = makeArgsAndOptions({ platformFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['platform'], undefined);
      assertEquals(builder.options, options);
    });

    it('Set all options except "mode" option when only argument "mode" is absent', () => {
      const { args, options } = makeArgsAndOptions({ modeFiltered: true });
      builder.parse(args);

      assertEquals(builder.options['mode'], 'dev');
      assertEquals(builder.options, options);
    });

    it('does not set options with unnecessary arguments', () => {
      const { args, options } = makeArgsAndOptions();
      const n = Math.floor(Math.random() * 5);
      const unnecessaryArgs = makeUnnecessaryArgs(n);
      builder.parse([...args, ...unnecessaryArgs]);

      assertEquals(builder.options, options);
    });
  });

  describe('Init', () => {
    it('initializes options with default values when Main.init()', () => {
      const { args, options } = makeArgsAndOptions();
      builder.parse(args);
      assertEquals(builder.options, options);

      builder.init();

      assertEquals(builder.options, {
        'static-dir': 'static',
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
        'mode': 'dev',
      });
    });
  });

  describe('Copy static', () => {
    it('copies static to dist', async () => {
      const tempDir = await Deno.makeTempDir({ prefix: 'builder_copy_test' });

      const staticDir = path.join(testdataDir, 'static');
      const srcFile = path.join(staticDir, 'index.html');
      const destFile = path.join(tempDir, 'chrome', 'index.html');
      const srcNestFile = path.join(staticDir, '_locales/en', 'messages.json');
      const destNestFile = path.join(
        tempDir,
        'chrome',
        '_locales/en',
        'messages.json',
      );

      builder.parse([
        `--static-dir=${staticDir}`,
        `--dist-dir=${tempDir}`,
      ]);
      await builder.copyStatic('chrome');

      assert(await Deno.lstat(destFile));
      assert(await Deno.lstat(destNestFile));

      assertEquals(
        new TextDecoder().decode(await Deno.readFile(srcFile)),
        new TextDecoder().decode(await Deno.readFile(destFile)),
      );
      assertEquals(
        new TextDecoder().decode(await Deno.readFile(srcNestFile)),
        new TextDecoder().decode(await Deno.readFile(destNestFile)),
      );

      await Deno.remove(tempDir, { recursive: true });
    });
  });

  describe('Load manifest', () => {
    it('loads chrome manifest', async () => {
      const tempDir = await Deno.makeTempDir({
        prefix: 'builder_load_manifest_test',
      });

      const staticDir = path.join(testdataDir, 'static');
      const srcDir = path.join(testdataDir, 'src');
      const manifestFile = path.join(srcDir, 'manifest.json');
      const destFile = path.join(tempDir, 'chrome', 'manifest.json');

      builder.parse([
        `--static-dir=${staticDir}`,
        `--src-dir=${srcDir}`,
        `--dist-dir=${tempDir}`,
      ]);
      await builder.copyStatic('chrome');
      await builder.loadManifest('chrome');

      assert(await Deno.lstat(destFile));

      const raw = JSON.parse(
        new TextDecoder().decode(await Deno.readFile(manifestFile)),
      );
      const loaded = JSON.parse(
        new TextDecoder().decode(await Deno.readFile(destFile)),
      );

      assertEquals(raw.chrome.version_name, loaded.version_name);

      await Deno.remove(tempDir, { recursive: true });
    });

    it('loads firefox manifest', async () => {
      const tempDir = await Deno.makeTempDir({
        prefix: 'builder_load_manifest_test',
      });

      const staticDir = path.join(testdataDir, 'static');
      const srcDir = path.join(testdataDir, 'src');
      const manifestFile = path.join(srcDir, 'manifest.json');
      const destFile = path.join(tempDir, 'firefox', 'manifest.json');

      builder.parse([
        `--static-dir=${staticDir}`,
        `--src-dir=${srcDir}`,
        `--dist-dir=${tempDir}`,
      ]);
      await builder.copyStatic('firefox');
      await builder.loadManifest('firefox');

      assert(await Deno.lstat(destFile));

      const raw = JSON.parse(
        new TextDecoder().decode(await Deno.readFile(manifestFile)),
      );
      const loaded = JSON.parse(
        new TextDecoder().decode(await Deno.readFile(destFile)),
      );

      assertEquals(raw.firefox.description, loaded.description);

      await Deno.remove(tempDir, { recursive: true });
    });

    it('loads prod manifest', async () => {
      const tempDir = await Deno.makeTempDir({
        prefix: 'builder_load_manifest_test',
      });

      const staticDir = path.join(testdataDir, 'static');
      const srcDir = path.join(testdataDir, 'src');
      const destFile = path.join(tempDir, 'chrome', 'manifest.json');

      builder.parse([
        `--static-dir=${staticDir}`,
        `--src-dir=${srcDir}`,
        `--dist-dir=${tempDir}`,
        '--mode=prod',
      ]);
      await builder.copyStatic('chrome');
      await builder.loadManifest('chrome');

      assert(await Deno.lstat(destFile));

      const loaded = JSON.parse(
        new TextDecoder().decode(await Deno.readFile(destFile)),
      );

      assertEquals(loaded.options_ui.open_in_tab, undefined);
      assertEquals(loaded.commands.dev, undefined);

      await Deno.remove(tempDir, { recursive: true });
    });
  });

  describe('Compile background.ts', () => {
    it('compiles dev', async () => {
      const tempDir = await Deno.makeTempDir({ prefix: 'builder_build_test' });

      const srcDir = path.join(testdataDir, 'src');
      const importMapFile = path.join(testdataDir, 'import_map.json');
      const destFile = path.join(tempDir, 'chrome', 'background.js');

      builder.parse([
        `--src-dir=${srcDir}`,
        `--dist-dir=${tempDir}`,
        `--import-map=${importMapFile}`,
      ]);
      await builder.compile('chrome');

      assert(await Deno.lstat(destFile));

      assertEquals(
        new TextDecoder().decode(await Deno.readFile(destFile)),
        `// src/tests/testdata/src/background.ts\nconsole.log("logging");\nchrome.notifications.create("1", { title: "Test", message: "test" });\n`,
      );

      await Deno.remove(tempDir, { recursive: true });
    });

    it('compiles prod', async () => {
      const tempDir = await Deno.makeTempDir({ prefix: 'builder_build_test' });

      const srcDir = path.join(testdataDir, 'src');
      const importMapFile = path.join(testdataDir, 'import_map.json');
      const destFile = path.join(tempDir, 'chrome', 'background.js');

      builder.parse([
        `--src-dir=${srcDir}`,
        `--dist-dir=${tempDir}`,
        `--import-map=${importMapFile}`,
        '--mode=prod',
      ]);
      await builder.compile('chrome');

      assert(await Deno.lstat(destFile));

      assertEquals(
        new TextDecoder().decode(await Deno.readFile(destFile)),
        `chrome.notifications.create("1",{title:"Test",message:"test"});\n`,
      );

      await Deno.remove(tempDir, { recursive: true });
    });
  });
});
