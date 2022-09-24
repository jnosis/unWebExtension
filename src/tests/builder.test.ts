import { assertEquals } from 'testing/asserts.ts';
import { beforeEach, describe, it } from 'testing/bdd.ts';
import { Builder } from '../builder/builder.ts';
import { makeArgsAndOptions, makeUnnecessaryArgs } from './args_utils.ts';

describe('Builder', () => {
  let builder: Builder;

  beforeEach(() => {
    builder = new Builder();
  });

  describe('Set options based on argument values', () => {
    it('initializes options with default values when no arguments are present', () => {
      assertEquals(builder.options, {
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
      });
    });

    it('sets all options when all arguments are present', () => {
      const { args, options } = makeArgsAndOptions();
      builder.parse(args);

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
        'src-dir': './src',
        'dist-dir': './dist',
        'import-map': './import_map.json',
      });
    });
  });
});
