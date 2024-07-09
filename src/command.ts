import { Command } from '@cliffy/command';
import { UpgradeCommand } from '@cliffy/command/upgrade';
import { JsrProvider } from '@cliffy/command/upgrade/provider/jsr';
import { CreateWebExtension } from './create.ts';
import { promptCreation } from './prompt.ts';
import { getDenoArgs } from './upgrade.ts';
import VERSION from './version.ts';

export function command() {
  return new Command()
    .name('unWebExtension')
    .description('Tool for making Web Extension.')
    .version(VERSION)
    .help({ types: true })
    .command('create', create)
    .command(
      'upgrade',
      new UpgradeCommand({
        provider: new JsrProvider({ package: '@unface/unwebext' }),
        runtime: {
          deno: {
            args: getDenoArgs(),
          },
        },
      }),
    );
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
