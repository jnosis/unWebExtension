import { command } from './command.ts';

await command().parse(Deno.args);
