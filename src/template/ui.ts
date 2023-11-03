const CONTEXT_MENUS = `import * as browser from '../api/api';
import { ContextMenuId } from '../types';

export function createAll() {
  console.trace('create all context menus');
  browser.contextMenus.removeAll();

  createById('shortcuts', true);
  createById('changelog', true);
}

export function createById(id: ContextMenuId, isUI: boolean = false) {
  console.trace(\`Create context menu: \${id}\`);
  browser.contextMenus.create({
    id,
    title: browser.i18n.getMessage(\`contextMenu_\${id}\`),
    contexts: isUI ? ['action'] : ['page', 'video', 'audio', 'action'],
  });
}
`;

const NOTIFICATION = `import * as browser from '../api/api';

export async function create() {
  browser.notifications.create('updated', {
    type: 'basic',
    iconUrl: './icons/icon128.png',
    title: browser.i18n.getMessage('notificationTitle'),
    message: \`\${browser.i18n.getMessage('changelog_1_0_0')}\`,
    // requireInteraction: true,
  });
}
`;

export const uiTemplate = {
  contextMenus: CONTEXT_MENUS,
  notification: NOTIFICATION,
};
