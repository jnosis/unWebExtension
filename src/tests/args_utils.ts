import { faker } from 'faker';
import type { BuilderOptions, Platform } from '../builder/builder.ts';

type Filter = {
  staticDirFiltered?: boolean;
  srcDirFiltered?: boolean;
  distDirFiltered?: boolean;
  importMapFiltered?: boolean;
  platformFiltered?: boolean;
  modeFiltered?: boolean;
};

type ArgsAndOption = {
  args: string[];
  options: BuilderOptions;
};

export function makeArgsAndOptions(filter?: Filter): ArgsAndOption {
  const options = JSON.parse(
    JSON.stringify({
      'static-dir': filter?.staticDirFiltered
        ? 'static'
        : faker.system.directoryPath(),
      'src-dir': filter?.srcDirFiltered
        ? './src'
        : faker.system.directoryPath(),
      'dist-dir': filter?.distDirFiltered
        ? './dist'
        : faker.system.directoryPath(),
      'import-map': filter?.importMapFiltered
        ? './import_map.json'
        : faker.system.directoryPath(),
      'platform': filter?.platformFiltered ? undefined : fakePlatform(),
      'mode': filter?.modeFiltered ? 'dev' : fakeMode(),
    }),
  );
  const args = [
    !filter?.staticDirFiltered ? `--static-dir=${options['static-dir']}` : '',
    !filter?.srcDirFiltered ? `--src-dir=${options['src-dir']}` : '',
    !filter?.distDirFiltered ? `--dist-dir=${options['dist-dir']}` : '',
    !filter?.importMapFiltered ? `--import-map=${options['import-map']}` : '',
    options['platform'] ? `--platform=${options['platform']}` : '',
    !filter?.modeFiltered ? `--mode=${options['mode']}` : 'dev',
  ];

  return { args, options };
}

function makeUnnecessaryArg(argType: number): string {
  function fakeString(): string {
    return faker.random.alpha(Math.floor(Math.random() * 10) + 1);
  }

  return argType % 2 === 0 ? `--${fakeString()}=${fakeString()}` : fakeString();
}

export function makeUnnecessaryArgs(n = 1): string[] {
  let args: string[] = [];
  let cnt = 0;

  while (cnt++ < n) {
    args = [...args, makeUnnecessaryArg(cnt)];
  }

  return args;
}

function fakePlatform(): Platform {
  const platforms: Platform[] = ['chrome', 'firefox', 'deno'];
  const index = Math.floor(Math.random() * 3);

  return platforms[index];
}

function fakeMode(): 'prod' | 'dev' {
  const index = Math.floor(Math.random() * 2);

  return index ? 'prod' : 'dev';
}
