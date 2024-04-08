export const readme = (name: string) => {
  return README.replace('{name}', name);
};

const README = `# ![icon](./image/icons/prod/icon32.png) {name}

{description}

# [![Chrome Web Store](./image/chrome-web-store.png)]() [![Get the Firefox Add-on](./image/get-the-addon.png)]()

<span style="font-size:0.75em"> _Read this in other languages: [English](README.md), [한국어](README.ko.md)._</span>

## Features

-

## ChangeLog

- 1.0.0: Initial release

## Known Issues

-

## ToDo

- and more...

## ScreenShot

## License

\`\`\`
\`\`\``;
