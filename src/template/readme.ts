export const readme = (name: string) => {
  return README.replace('{name}', name);
};

const README =
  `<h1 align="center"><img align="center" src="./image/icons/prod/icon32.png" alt="icon"> {name}</h1></p>

<p align="center">
{description}
</p>
<p align="center">
<a href=""><img src="./image/chrome-web-store.png" alt="Chrome Web Store"></a>
<a href=""><img src="./image/get-the-addon.png" alt="Get the Firefox Add-on"></a>
</p><hr>

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
