import type { API, CreateOptions } from '../types.ts';

export const api = (options: CreateOptions) => {
  return [
    PLATFORM_TS,
    API_TS,
    generateAPIsIndex(options.apis),
    generateManifest(options),
  ];
};

const PLATFORM_TS = `export const isChromium = true;\n`;

const API_TS = `import { isChromium } from './platform';\n`;

function generateAPIsIndex(apis: API[]) {
  return `// Promisify chrome api\n${
    apis.map((api) => `export * as ${api} from './${api}';`).join('\n')
  }\n`;
}

function generateManifest(options: CreateOptions) {
  const {
    permissions,
    locales,
    createBackground,
    createContentScripts,
    createOptions,
    createPopup,
  } = options;
  return `{
  "manifest_version": 3,
  "name": "__MSG_extensionName__",
  "description": "__MSG_extensionDescription__",
  "version": "1.0.0",

  "default_locale": "${locales[0] ?? 'en'}",
  "icons": {
    "16": "/icons/icon16.png",
    "32": "/icons/icon32.png",
    "48": "/icons/icon48.png",
    "128": "/icons/icon128.png"
  },

  "action": {
    "default_icon": {
      "16": "/icons/icon16.png",
      "32": "/icons/icon32.png",
      "48": "/icons/icon48.png",
      "128": "/icons/icon128.png"
    }${createPopup ? `,\n    "default_popup": "popup.html"` : ''}
  },${
    createBackground
      ? `\n\n  "background": {\n    "service_worker": "background.js"\n  },`
      : ''
  }

  "commands": {
    "": {
      "suggested_key": {
        "default": ""
      },
      "description": "__MSG_command___"
    },
    "dev": {
      "suggested_key": {
        "default": "Alt+Shift+D"
      },
      "description": "dev"
    }
  },${
    createContentScripts
      ? `\n\n  "content_scripts": [\n    {\n      "match": ["https://*.example.com/*"],\n      "css": ["my-styles.css"],\n      "js": ["content-script.js"]\n    }\n  ]`
      : ''
  }${
    createOptions
      ? `,\n\n  "options_ui": {\n    "page": "options.html",\n    "open_in_tab": false\n  },`
      : ''
  }

  "permissions": [${
    permissions.map((permission) => `"${permission}"`).join(', ')
  }],

  "chrome": {
    "version_name": "1.0.0",
    "minimum_chrome_version": "92"
  },
  "firefox": {
    "browser_specific_settings": {
      "gecko": {
        "id": "example@example.org",
        "strict_min_version": "42.0"
      }
    }${
    createBackground
      ? `,\n    "background": {\n      "scripts": ["background.js"]\n    }`
      : ''
  }
  }
}
`;
}
