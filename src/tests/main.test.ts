import { assertEquals } from 'testing/asserts.ts';
import { beforeAll, describe, it } from 'testing/bdd.ts';
import { Main } from '../main.ts';

describe('main', () => {
  let main: Main;

  beforeAll(() => {
    main = new Main();
  });

  it('Initialize options with default values when no arguments are present', () => {
    assertEquals(main.options, {
      'src-dir': './src',
      'dist-dir': './dist',
      'import-map': './import_map.json',
    });
  });
});
