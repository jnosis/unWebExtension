export const imagesTemplate = (): [string, string, Icons] => {
  return [CHROME_WEB_STORE, GET_THE_ADDON, ICONS];
};

type Icon = {
  '16': string;
  '32': string;
  '48': string;
  '128': string;
};
type Icons = {
  dev: Icon;
  prod: Icon;
};

const ICONS = {
  dev: {
    '16':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/dev/icon16.png',
    '32':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/dev/icon32.png',
    '48':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/dev/icon48.png',
    '128':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/dev/icon128.png',
  },
  prod: {
    '16':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/prod/icon16.png',
    '32':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/prod/icon32.png',
    '48':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/prod/icon48.png',
    '128':
      'https://raw.githubusercontent.com/jnosis/unMute/master/image/icons/prod/icon128.png',
  },
};

const CHROME_WEB_STORE =
  'https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png';

const GET_THE_ADDON =
  'https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png';
