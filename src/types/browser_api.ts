import type { ActionModule } from './browser_api_modules/action.ts';
import type { CommandsModule } from './browser_api_modules/commands.ts';
import type { ContextMenusModule } from './browser_api_modules/context_menus.ts';
import type { I18nModule } from './browser_api_modules/i18n.ts';
import type { NotificationsModule } from './browser_api_modules/notifications.ts';
import type { RuntimeModule } from './browser_api_modules/runtime.ts';
import type { StorageModule } from './browser_api_modules/storage.ts';
import type { TabsModule } from './browser_api_modules/tabs.ts';
import type { WindowsModule } from './browser_api_modules/windows.ts';

export interface BrowserAPI {
  action: ActionModule;
  commands: CommandsModule;
  contextMenus: ContextMenusModule;
  i18n: I18nModule;
  notifications: NotificationsModule;
  runtime: RuntimeModule;
  storage: StorageModule;
  tabs: TabsModule;
  windows: WindowsModule;
}
