import type { Platform } from './builder.ts';

export function load(
  content: string,
  mode: 'prod' | 'dev',
  platform: Platform,
) {
  let manifest = { ...JSON.parse(content) };
  const { chrome, firefox, ...common } = manifest;

  switch (platform) {
    case 'chrome':
      manifest = { ...common, ...chrome };
      break;
    case 'firefox':
      manifest = { ...common, ...firefox };
      break;
  }

  if (mode === 'prod') {
    const { commands, options_ui, ...rest } = manifest;
    // deno-lint-ignore no-unused-vars
    const { dev, ...prod } = commands;
    // deno-lint-ignore no-unused-vars
    const { open_in_tab, ...options } = options_ui;
    manifest = { ...rest, commands: prod, options_ui: options };
  }

  return JSON.stringify(manifest, null, 2);
}
