import { esbuild } from './deps.ts';
import type { Platform } from './builder.ts';

export const webExtensionPlugin = (platform: Platform): esbuild.Plugin => {
  return {
    name: 'webExtension',
    setup(build) {
      build.onLoad({ filter: /\.ts$/ }, async (args) => {
        const content = await Deno.readTextFile(args.path);
        return {
          contents: content
            .replaceAll(`import browserAPI from 'browser';`, '')
            .replaceAll(`import browserAPI from "browser";`, '')
            .replaceAll(
              `import browserAPI from 'https://raw.githubusercontent.com/jnosis/unWebExtension/master/src/mod.ts';`,
              '',
            )
            .replaceAll(
              `import browserAPI from "https://raw.githubusercontent.com/jnosis/unWebExtension/master/src/mod.ts";`,
              '',
            )
            .replaceAll('browserAPI', platform),
          loader: 'ts',
        };
      });
    },
  };
};
