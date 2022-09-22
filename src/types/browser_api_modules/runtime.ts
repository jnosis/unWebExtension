// deno-lint-ignore-file no-explicit-any
// TODO: Add full api
import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

export type InstalledDetails = {
  /** Optional. Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'. */
  id?: string;
  /** Optional. Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'. */
  previousVersion?: string;
  /** The reason that this event is being dispatched. */
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
  /** Optional. Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
  includeTlsChannelId?: boolean;
};

/**
 * An object containing information about the script context that sent a message or request.
 */
export type MessageSender = {
  /** Optional. A UUID of the document that opened the connection. */
  documentId?: string;
  /** Optional. The lifecycle the document that opened the connection is in at the time the port was created. Note that the lifecycle state of the document may have changed since port creation. */
  documentLifeCycle?: string;
  /** Optional. The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set. */
  frameId?: number;
  /** Optional. The ID of the extension or app that opened the connection, if any. */
  id?: string;
  /**
   * Optional.
   * Since Chrome 74.
   * The name of the native application that opened the connection, if any.
   */
  nativeApplication?: string;
  /**
   * Optional.
   * Since Chrome 80.
   * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
   */
  origin?: string;
  /** Optional. The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
  tab?: Tab;
  /** Optional. The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available. */
  tlsChannelId?: string;
  /** Optional. The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it. */
  url?: string;
};

/**
 * Since Chrome 44.
 * The reason that this event is being dispatched.
 */
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

  /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
  onInstalled: RuntimeInstalledEvent;

  /** Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage). */
  onMessage: ExtensionMessageEvent;

  /** Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode. */
  onStartup: RuntimeEvent;
}
