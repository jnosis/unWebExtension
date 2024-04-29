/**
 * Some code from https://github.com/c4spar/deno-cliffy
 * It will be removed when JsrProvider is added to @cliffy/command.
 */
import type { ArgumentValue } from '@cliffy/command';
import { Table } from 'jsr:@cliffy/table@1.0.0-rc.4';
import {
  bold,
  brightBlue,
  cyan,
  green,
  red,
  yellow,
} from 'jsr:/@std/fmt@0.221/colors';
import VERSION from './version.ts';

type Semver =
  | `${number}.${number}.${number}`
  | `${number}.${number}.${number}-${string}`;

type PackageMetadata = {
  scope: string;
  name: string;
  latest: Semver;
  versions: {
    [version: Semver]: { yanked?: boolean };
  };
};

type UpgradeArgs = {
  version?: Semver | 'latest';
  name: string;
  force?: boolean;
};

function isSemver(value: string): value is Semver {
  return /^v?(\d+(?:\.\d+){2})(?:-[a-zA-Z0-9]+)?$/.test(value);
}

export function versionType(
  { label, name, value }: ArgumentValue,
): Semver | 'latest' {
  if (value === 'latest' || isSemver(value)) {
    return value;
  }

  throw new Error(
    `${label} "${name}" must be a valid version, but got "${value}". Possible values are: 1.0.0, 1.0.0-rc4, latest`,
  );
}

export async function printListVersions() {
  let { versions } = await getVersions();
  versions = versions.slice();
  if (versions?.length) {
    versions = versions.map((version: string) =>
      VERSION && VERSION === version ? green(`* ${version}`) : `  ${version}`
    );

    if (versions.length > 8) {
      const table = new Table().indent(0);
      const rowSize = Math.ceil(versions.length / 8);
      const colSize = Math.min(versions.length, 8);
      let versionIndex = 0;
      for (let colIndex = 0; colIndex < colSize; colIndex++) {
        for (let rowIndex = 0; rowIndex < rowSize; rowIndex++) {
          if (!table[rowIndex]) {
            table[rowIndex] = [];
          }
          table[rowIndex][colIndex] = versions[versionIndex++];
        }
      }
      console.log(table.toString());
    } else {
      console.log(
        versions.map((version) => ' '.repeat(0) + version).join('\n'),
      );
    }
  }
  Deno.exit(0);
}

export async function upgradeTo({ version: to, name, force }: UpgradeArgs) {
  if (force || !to || await isOutdated(VERSION, to)) {
    if (to === 'latest') {
      const { latest } = await getVersions();
      to = latest;
    }
    const registry = 'jsr:@unface/unwebext';

    const cmdArgs = [
      'install',
      '--force',
      '--allow-read',
      '--allow-write',
      '--allow-net=jsr.io,storage.googleapis.com,blog.mozilla.org,raw.githubusercontent.com',
      '-r',
      '--name',
      name,
      registry,
    ];

    const cmd = new Deno.Command(Deno.execPath(), {
      args: cmdArgs,
      stdout: 'piped',
      stderr: 'piped',
    });
    const { success, stderr } = await cmd.output();

    const from = VERSION;

    if (!success) {
      await Deno.stderr.write(stderr);
      throw new Error(
        `Failed to upgrade ${name} from ${from} to version ${to}!`,
      );
    }

    console.info(
      `Successfully upgraded ${name} from ${from} to version ${to}! (jsr:@unface/unwebext@${to})`,
    );
  }
}

async function getVersions() {
  const response = await fetch('https://jsr.io/@unface/unwebext/meta.json');
  if (!response.ok) {
    throw new Error(
      "couldn't fetch the latest version - try again after sometime",
    );
  }

  const { latest, versions } = await response.json() as PackageMetadata;

  return {
    latest,
    versions: Object.keys(versions),
  };
}

async function isOutdated(
  currentVersion: string,
  targetVersion: string,
): Promise<boolean> {
  const { latest, versions } = await getVersions();

  if (targetVersion === 'latest') {
    targetVersion = latest;
  }

  // Check if requested version exists.
  if (targetVersion && !versions.includes(targetVersion)) {
    throw new Error(
      `The provided version ${bold(red(targetVersion))} is not found.\n\n    ${
        cyan(
          `Visit ${
            brightBlue('https://jsr.io/@unface/unwebext')
          } for available releases or run again with the ${(yellow(
            '-l',
          ))} or ${(yellow('--list-versions'))} command.`,
        )
      }`,
    );
  }

  // Check if requested version is already the latest available version.
  if (latest && latest === currentVersion && latest === targetVersion) {
    console.warn(
      yellow(
        `You're already using the latest available version ${currentVersion} of @unface/unwebext.`,
      ),
    );
    return false;
  }

  // Check if requested version is already installed.
  if (targetVersion && currentVersion === targetVersion) {
    console.warn(
      yellow(
        `You're already using version ${currentVersion} of @unface/unwebext.`,
      ),
    );
    return false;
  }

  return true;
}
