// deno-lint-ignore-file no-explicit-any
// TODO: Add full api
import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

export type InstalledDetails = {
  id?: string;
  previousVersion?: string;
  reason: OnInstalledReason;
};

export interface ManifestBase {
  manifest_version: number;
  version: string;
}

export interface ManifestV2 extends ManifestBase {
  manifest_version: 2;
}

export interface ManifestV3 extends ManifestBase {
  manifest_version: 3;
}

export type Manifest = ManifestV2 | ManifestV3;

export type MessageOptions = {
  /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
  includeTlsChannelId?: boolean;
};

export type MessageSender = {
  documentId?: string;
  documentLifeCycle?: string;
  frameId?: number;
  id?: string;
  nativeApplication?: string;
  origin?: string;
  tab?: Tab;
  tlsChannelId?: string;
  url?: string;
};

export type OnInstalledReason =
  | 'install'
  | 'update'
  | 'chrome_update'
  | 'shared_module_update';

export type ExtensionMessageEvent = Event<
  (
    message: any,
    sender: MessageSender,
    sendResponse: (response?: any) => void,
  ) => void
>;

export type RuntimeEvent = Event<() => void>;

export type RuntimeInstalledEvent = Event<(details: OnInstalledReason) => void>;

export interface RuntimeModule {
  /**
   * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
   * @returns The manifest details.
   */
  getManifest(): Manifest;

  /**
   * Converts a relative path within an app/extension install directory to a fully-qualified URL.
   * @param path A path to a resource within an app/extension expressed relative to its install directory.
   * @returns The fully-qualified URL to the resource.
   */
  getURL(path: string): string;

  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param options
   * @returns The 'sendMessage' method provides its result via callback or returned as 'Promise' (MV3 only).
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    message: Message,
    options?: MessageOptions,
  ): Promise<Response>;
  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param options
   * @returns The 'sendMessage' method provides its result via callback or returned as 'Promise' (MV3 only).
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    extensionId: string,
    message: Message,
    options?: MessageOptions,
  ): Promise<Response>;
  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param callback The callback parameter should be a function that looks like this:
   * (response: Response) => {...}
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    message: Message,
    callback?: (response: Response) => void,
  ): void;
  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param options
   * @param callback The callback parameter should be a function that looks like this:
   * (response: Response) => {...}
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    message: Message,
    options: MessageOptions,
    callback?: (response: Response) => void,
  ): void;
  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param callback The callback parameter should be a function that looks like this:
   * (response: Response) => {...}
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    extensionId: string,
    message: Message,
    callback?: (response: Response) => void,
  ): void;
  /**
   * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
   * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
   * @param message The message to send. This message should be a JSON-ifiable object.
   * @param options
   * @param callback The callback parameter should be a function that looks like this:
   * (response: Response) => {...}
   * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
   */
  sendMessage<Message = any, Response = any>(
    extensionId: string,
    message: Message,
    options?: MessageOptions,
    callback?: (response: Response) => void,
  ): void;

  onInstalled: RuntimeInstalledEvent;
  onMessage: ExtensionMessageEvent;
  onStartup: RuntimeEvent;
}
