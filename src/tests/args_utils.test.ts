import { assertEquals, assertMatch } from 'testing/asserts.ts';
import { describe, it } from 'testing/bdd.ts';
import { makeUnnecessaryArgs } from './args_utils.ts';

describe('args utils', () => {
  it('makes unnecessary arg ', () => {
    const n = Math.floor(Math.random() * 10);
    const args = makeUnnecessaryArgs(n);

    let cnt = 0;

    while (cnt < n) {
      cnt % 2 === 0
        ? assertMatch(args[cnt], /\w+/)
        : assertMatch(args[cnt], /--\w+=\w+/);
      cnt++;
    }
    assertEquals(args.length, n);
  });
});
