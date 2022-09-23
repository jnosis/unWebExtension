import { assertEquals } from 'testing/asserts.ts';
import { beforeEach, describe, it } from 'testing/bdd.ts';
import { Main } from '../main.ts';
import { makeArgsAndOptions, makeUnnecessaryArgs } from './args_utils.ts';

describe('main', () => {
  let main: Main;

  beforeEach(() => {
    main = new Main();
  });

  describe('Set options based on argument values', () => {
    it('initializes options with default values when no arguments are present', () => {
      assertEquals(main.options, {
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
      });
    });

    it('sets all options when all arguments are present', () => {
      const { args, options } = makeArgsAndOptions();
      main.parse(args);

      assertEquals(main.options, options);
    });

    it('sets all options except "src-dir" when only argument "src-dir" is absent', () => {
      const { args, options } = makeArgsAndOptions({ srcDirFiltered: true });
      main.parse(args);

      assertEquals(main.options['src-dir'], './src');
      assertEquals(main.options, options);
    });

    it('sets all options except "dist-dir" option when only argument "dist-dir" is absent', () => {
      const { args, options } = makeArgsAndOptions({ distDirFiltered: true });
      main.parse(args);

      assertEquals(main.options['dist-dir'], './dist');
      assertEquals(main.options, options);
    });

    it('sets all options except "import-map" option when only argument "import-map" is absent', () => {
      const { args, options } = makeArgsAndOptions({ importMapFiltered: true });
      main.parse(args);

      assertEquals(main.options['import-map'], './import_map.json');
      assertEquals(main.options, options);
    });

    it('Set all options except "platform" option when only argument "platform" is absent', () => {
      const { args, options } = makeArgsAndOptions({ platformFiltered: true });
      main.parse(args);

      assertEquals(main.options['platform'], undefined);
      assertEquals(main.options, options);
    });

    it('does not set options with unnecessary arguments', () => {
      const { args, options } = makeArgsAndOptions();
      const n = Math.floor(Math.random() * 5);
      const unnecessaryArgs = makeUnnecessaryArgs(n);
      main.parse([...args, ...unnecessaryArgs]);

      assertEquals(main.options, options);
    });
  });

  describe('Init', () => {
    it('initializes options with default values when Main.init()', () => {
      const { args, options } = makeArgsAndOptions();
      main.parse(args);
      assertEquals(main.options, options);

      main.init();

      assertEquals(main.options, {
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
      });
    });
  });
});
