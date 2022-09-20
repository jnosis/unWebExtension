import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

export type Command = {
  description?: string;
  name?: string;
  shortcut?: string;
};

export type CommandEvent = Event<(command: string, tab: Tab) => void>;

export interface CommandsModule {
  /**
   * Returns all the registered extension commands for this extension and their shortcut (if active).
   * @returns The 'getAll' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getAll(): Promise<Command[]>;
  /**
   * Returns all the registered extension commands for this extension and their shortcut (if active).
   * @param callback
   */
  getAll(callback: (commands: Command[]) => void): void;

  /** Fired when a registered command is activated using a keyboard shortcut */
  onCommand: CommandEvent;
}
