import type { CreateOptions } from '../types.ts';

export const background = (options: CreateOptions) => {
  return [
    BACKGROUND_SCRIPT,
    INDEX_TS,
    generateListener(options),
    generateLoad(options),
  ];
};

const BACKGROUND_SCRIPT = `import { Background } from './background/index';

(() => new Background())();
`;

const INDEX_TS = `import * as browser from '../api/api';
import { Listener } from './listener';
import { Load } from './load';

export class Background {
  constructor() {
    this.addListener();
    browser.runtime.onStartup.addListener(() => this.onStart());
    browser.runtime.onInstalled.addListener((details) =>
      this.onInstalled(details)
    );
  }

  private onStart() {
    console.log('onStart');
    new Load();
  }

  private onInstalled(details?: browser.runtime.InstalledDetails) {
    console.log('onInstalled');
    new Load(details);
  }

  private addListener() {
    new Listener();
  }
}
`;

function generateListener(options: CreateOptions) {
  const { apis, createOptions } = options;
  const createAction = apis.includes('action');
  const createCommands = apis.includes('commands');
  const createContextMenus = apis.includes('contextMenus');

  return `import type {
${createCommands ? '  Command,\n' : ''}${
    createContextMenus ? '  ContextMenuId,\n' : ''
  }${
    createOptions ? '  OptionPageMessage,\n  OptionPageResponse,\n' : ''
  }} from '../types/types';
import * as browser from '../api/api';${
    createOptions
      ? `\nimport {
  ChangeOption,
  loadOption,
  loadStorage,
  saveStorage,
  StorageProperties,
} from '../option/option';`
      : ''
  }

export class Listener {
  constructor() {
    ${
    createOptions
      ? `browser.storage.onChanged.addListener((changes, areaName) =>
      this.onStorageChanged(changes, areaName)
    );

    browser.runtime.onMessage.addListener((message, sender, sendResponse) =>
      this.onMessage(message, sender, sendResponse)
    );\n\n    `
      : ''
  }browser.notifications.onClicked.addListener((notificationId) =>
      this.onNotificationClick(notificationId)
    );${
    createAction
      ? `\n\n    browser.action.onClicked.addListener(
      (tab) => tab.id && this.onActionClick(tab.id)
    );`
      : ''
  }${
    createCommands
      ? `\n\n    browser.commands.onCommand.addListener(
      (command, tab) => tab.id && this.onCommand(command as Command, tab.id)
    );`
      : ''
  }${
    createContextMenus
      ? `\n\n    browser.contextMenus.onClicked.addListener(
      ({ menuItemId }, tab) =>
        tab?.id && this.onContextMenuClick(menuItemId as ContextMenuId, tab.id)
    );`
      : ''
  }
  }
${
    createOptions
      ? `\n  private onStorageChanged(
    changes: {
      [key: string]: browser.storage.StorageChange;
    },
    areaName: 'sync' | 'local' | 'managed' | 'session'
  ) {
    switch (areaName) {
      case 'local':
        this.onLocalChanged(changes);
        break;
      case 'sync':
        this.onSyncChanged(changes);
        break;

      default:
        break;
    }
  }

  private onLocalChanged(changes: {
    [key: string]: browser.storage.StorageChange;
  }) {
    if (!changes.option) {
      return;
    }
    console.log(\`Storage change: \${changes}\`);
    console.table({ ...changes });

    if (changes.option) {
    }
  }

  private onSyncChanged(changes: {
    [key: string]: browser.storage.StorageChange;
  }) {
    if (!changes.option) {
      return;
    }
    console.log(\`Sync change: \${changes}\`);
    console.table({ ...changes });

    if (changes.option) {
      const option = changes.option.newValue;
      saveStorage({ option });
    }
  }

  private onMessage(
    message: OptionPageMessage,
    sender: browser.runtime.MessageSender,
    sendResponse: (response?: OptionPageResponse) => void
  ) {
    console.log(\`On message: \${message}\`);
    const response = { response: '' };
    if (sender.id === browser.runtime.id) {
      switch (message.id) {
        case '':
          break;
        case 'contextMenus':
          ChangeOption.setContextMenus(!!message.value);
          response.response = \`\${message.id} => \${message.value}\`;
          break;
        case 'reset':
          ChangeOption.reset();
          response.response = \`\${message.id}\`;
          break;
        case 'hidden':
          ChangeOption.setAutoMode(message.value as AutoMode);
          response.response = 'special';
          break;

        default:
          response.response = \`Wrong message: \${message.id}\`;
          break;
      }
      sendResponse(response);
    }
  }\n`
      : ''
  }
  private onNotificationClick(notificationId: string) {
    if (notificationId === 'updated') {
      const url = browser.runtime.getURL('changelog.html');
      browser.tabs.create({ url });
    }
    browser.notifications.clear(notificationId);
  }${
    createAction
      ? `\n\n  private onActionClick(tabId: number) {
    console.log(\`Action click: \${tabId}\`);
  }`
      : ''
  }${
    createCommands
      ? `\n\n  private onCommand(command: Command, tabId: number) {
    console.log(\`On command: \${tabId}\`);
    switch (command) {
      case '':
        break;
${
        createOptions
          ? `\n      // Dev Code: start
      case 'dev':
        this.showStorage();
        break;
      // Dev Code: end`
          : ''
      }

      default:
        throw new Error(\`Unavailable command: \${command}\`);
    }
  }`
      : ''
  }${
    createContextMenus
      ? `\n\n  private onContextMenuClick(menuItemId: ContextMenuId, tabId: number) {
    console.log(\`Context menu click: (\${menuItemId} : \${tabId})\`);
    switch (menuItemId) {
      case 'shortcuts':
        browser.tabs.create({ url: 'chrome://extensions/shortcuts' });
        break;
      case 'changelog': {
        const url = browser.runtime.getURL('changelog.html');
        browser.tabs.create({ url });
        break;
      }

      default:
        throw new Error(\`Unavailable contextMenu: \${menuItemId}\`);
    }
  }`
      : ''
  }${
    createOptions
      ? `\n\n  // Dev Code: start
  private showStorage() {
    loadStorage(null, (items) => console.table({ ...items }));
  }
  // Dev Code: end`
      : ''
  }
}
`;
}

function generateLoad(options: CreateOptions) {
  const { apis, createOptions } = options;
  const createContextMenus = apis.includes('contextMenus');

  return `import * as browser from '../api/api';${
    createOptions
      ? `
import {
  initStorage,
  loadOption,
  loadStorage,
  saveStorage,
} from '../option/option';`
      : ''
  }${
    createContextMenus
      ? `
import * as ContextMenu from '../ui/contextMenus';`
      : ''
  }
import * as Notification from '../ui/notification';

export class Load {
  constructor(details?: browser.runtime.InstalledDetails) {
    this.onLoad(details);
  }

  private onLoad(details?: browser.runtime.InstalledDetails) {
    const isUpdated = details?.reason === 'update';
    ${
    createOptions
      ? `loadStorage('wasInit', ({ wasInit }) => {
      console.log(\`Initialize: \${!!wasInit}\`);
      if (wasInit) {
        this.load(isUpdated);
      } else {
        initStorage(() => this.load(isUpdated));
      }
    });`
      : `this.load()`
  }
    if (isUpdated) Notification.create();
  }

  private load(${createOptions ? 'isUpdated: boolean' : ''}) {
    ${
    createOptions
      ? `loadOption((option) => {
      console.log('load');
      isUpdated || saveStorage({ recentTabIds: [] });${
        createContextMenus
          ? `
      ContextMenu.createAll(option);`
          : ''
      }
    });`
      : `console.log('load');${
        createContextMenus
          ? `
    ContextMenu.createAll()`
          : ''
      }`
  }
  }
}
`;
}
