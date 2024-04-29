import { Command } from '@cliffy/command';
import { CreateWebExtension } from './create.ts';
import { promptCreation } from './prompt.ts';
import { printListVersions, upgradeTo, versionType } from './upgrade.ts';
import VERSION from './version.ts';

export function command() {
  return new Command()
    .name('unWebExtension')
    .description('Tool for making Web Extension.')
    .version(VERSION)
    .help({ types: true })
    .command('create', create)
    .command('upgrade', upgrade);
}

const create = new Command()
  .description('Create Web Extension project.')
  .option('-b, --create-background', 'Create with background files.')
  .option('-c, --create-content-scripts', 'Create with content scripts file.')
  .option('-o, --create-options', 'Create with options files.')
  .option('-p, --create-popup', 'Create with popup files.')
  .option('-d, --directory=<directory:file>', 'Directory location.')
  .arguments('[extensionName:string]')
  .action(async (options, ...args) => {
    await new CreateWebExtension(...await promptCreation(options, args[0]))
      .create();
  });

const upgrade = new Command()
  .type('version', versionType)
  .description('Upgrade unWebExtension.')
  .option(
    '-l, --list-versions',
    'Show available versions.',
    {
      action: printListVersions,
    },
  )
  .option(
    '--version <version:version>',
    'The version to upgrade to.',
    { default: 'latest' },
  )
  .option(
    '-f, --force',
    'Replace current installation even if not out-of-date.',
  )
  .action(upgradeTo);
