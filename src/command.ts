import { Command } from './deps.ts';
import { CreateWebExtension } from './create.ts';
import { promptCreation } from './prompt.ts';
import VERSION from './version.ts';

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

export function command() {
  return new Command()
    .name('unWebExtension')
    .description('Tool for making Web Extension.')
    .version(VERSION)
    .help({ types: true })
    .command('create', create);
}
