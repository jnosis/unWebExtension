import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

export type Command = {
  /** Optional. The Extension Command description */
  description?: string;
  /** Optional. The name of the Extension Command */
  name?: string;
  /** Optional. The shortcut active for this command */
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
   * @param callback The callback parameter should be a function that looks like this:
   * (commands: Command[]) => {...}
   */
  getAll(callback: (commands: Command[]) => void): void;

  /** Fired when a registered command is activated using a keyboard shortcut */
  onCommand: CommandEvent;
}
