import type { CreateOptions } from '../types.ts';

export const webpack = (options: CreateOptions) => {
  return [
    CONFIG,
    generateCommon(options),
    DEV,
    PROD,
    API_LOADER,
    DEV_CODE_DISABLER,
    MANIFEST_LOADER,
  ];
};

const CONFIG = `const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const { exec } = require('child_process');
const dev = require('./webpack/webpack.dev.js');
const prod = require('./webpack/webpack.prod.js');
const modify = require('./webpack/manifest-loader.js');
const path = require('path');
const loader = path.join(__dirname, \`webpack/api-loader.js\`);
const api = path.join(__dirname, 'src/Api/platform.ts');

module.exports = (env) => {
  return merge(!!env.production ? prod : dev, {
    module: {
      rules: [
        {
          test: /\\.tsx?$/,
          use: {
            loader,
            options: {
              platform: env.platform,
            },
          },
          resource: api,
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: './public/manifest.json',
            to: './',
            transform(content, path) {
              return modify(content, !!env.production, env.platform);
            },
          },
        ],
      }),

      {
        apply: (compiler) => {
          env.production &&
            compiler.hooks.afterEmit.tap('RunZipJS', (compilation) => {
              exec(\`node zip.js \${env.platform}\`, (err, stdout, stderr) => {
                if (err) {
                  console.error(\`exec error: \${err}\`);
                  return;
                }

                console.log('\nRun zip.js');
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              });
            });
        },
      },
    ],
  });
};
`;

function generateCommon(options: CreateOptions) {
  const { createBackground, createContentScripts, createOptions, createPopup } =
    options;
  return `const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  entry: {
    ${
    createBackground ? '' : '// '
  }background: path.join(srcDir, 'background.ts'),
    changelog: path.join(srcDir, 'changelog.ts'),
    ${
    createContentScripts ? '' : '// '
  }content_script: path.join(srcDir, 'content_script.ts'),
    ${createOptions ? '' : '// '}options: path.join(srcDir, 'options.ts'),
    ${createPopup ? '' : '// '}popup: path.join(srcDir, 'popup.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'async',
    },
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: './',
          globOptions: { ignore: '**/manifest.json' },
        },
      ],
    }),
  ],
};
`;
}

const DEV = `const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './image/icons/dev', to: './icons' }],
    }),
  ],
});
`;

const PROD = `const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const loader = path.join(__dirname, 'dev-code-disabler.js');
const background = path.join(__dirname, '..', 'src/background.ts');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: loader,
        resource: background,
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            passes: 3,
          },
        },
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './image/icons/prod', to: './icons' }],
    }),
  ],
});
`;

const API_LOADER =
  `module.exports = function addStorageLoggingCommandCode(content) {
  const options = this.getOptions();
  console.log(\`Set \${options.platform} api...\`);
  switch (options.platform) {
    case 'firefox':
      content = content.replace('isChromium = true', 'isChromium = false');
      break;
    case 'whale':
      content = content.replace(/chrome/g, 'whale');
      break;

    default:
      break;
  }
  return content;
};
`;

const DEV_CODE_DISABLER =
  `module.exports = function addStorageLoggingCommandCode(content) {
  console.log('Disabling storage logging command...');
  return content.replace(
    /\\/\\/ Dev Code: start([\\s\\w\\d(){}[\]>=<\`'";:.,!?&|\\\\^$#%+_~-]|\\/[^\\/])*\\/\\/ Dev Code: end/g,
    ''
  );
};
`;

const MANIFEST_LOADER =
  `module.exports = function makeManifest(content, mode, platform) {
  console.log('manifest loading...');
  let manifest = JSON.parse(content);

  console.log(\`load \${platform} manifest...\`);
  const { chrome, firefox, edge, whale, ...common } = manifest;
  switch (platform) {
    case 'chrome':
      manifest = { ...common, ...chrome };
      break;
    case 'firefox':
      manifest = { ...common, ...firefox };
      break;
    case 'edge':
      manifest = { ...common, ...edge };
      break;
    case 'whale':
      manifest = { ...common, ...whale };
      break;

    default:
      break;
  }

  const { commands, ...rest } = manifest;
  if (mode) {
    console.log('load production manifest...');
    const { dev: _dev, ...prod } = commands;
    manifest = { ...rest, commands: prod };
  }

  console.log('manifest loaded');
  return JSON.stringify(manifest, null, 2);
};
`;
