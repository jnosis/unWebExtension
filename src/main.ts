import { Builder } from './builder/builder.ts';

const builder = new Builder();
builder.parse(Deno.args);
builder.build();
