import { Event } from 'bext/types/browser_api_modules/event.ts';

export type NotificationButton = {
  /** @deprecated since Chrome 59. Button icons not visible for Mac OS X users. */
  iconUrl?: string;
  title: string;
};

export type NotificationItem = {
  /** Additional details about this item. */
  message: string;
  /** Title of one item of a list notification. */
  title: string;
};

export type NotificationOptions = {
  /**
   * Optional.
   * A URL to the app icon mask. URLs have the same restrictions as iconUrl.
   * The app icon mask should be in alpha channel, as only the alpha channel of the image will be considered.
   * @deprecated since Chrome 59. The app icon mask is not visible for Mac OS X users.
   */
  appIconMaskUrl?: string;
  /** Optional. Text and icons for up to two notification action buttons. */
  buttons?: NotificationButton[];
  /** Optional. Alternate notification content with a lower-weight font. */
  contextMessage?: string;
  /** Optional. A timestamp associated with the notification, in milliseconds past the epoch (e.g. Date.now() + n). */
  eventTime?: number;
  /**
   * Optional.
   * A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
   * URLs can be a data URL, a blob URL, or a URL relative to a resource within this extension's .crx file Required for notifications.create method.
   */
  iconUrl?: string;
  /**
   * Optional.
   * A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as iconUrl.
   * @deprecated since Chrome 59. The image is not visible for Mac OS X users.
   */
  imageUrl?: string;
  /** Optional. @deprecated since Chrome67. This UI hint is ignored as of Chrome 67. */
  isClickable?: boolean;
  /** Optional. Items for multi-item notifications. Users on Mac OS X only see the first item. */
  items?: NotificationItem[];
  /** Optional. Main notification content. Required for notifications.create method. */
  message?: string;
  /** Optional. Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. On platforms that don't support a notification center (Windows, Linux & Mac), -2 and -1 result in an error as notifications with those priorities will not be shown at all. */
  priority?: number;
  /** Optional. Current progress ranges from 0 to 100. */
  progress?: number;
  /**
   * Optional.
   * Since Chrome 50.
   * Indicates that the notification should remain visible on screen until the user activates or dismisses the notification. This defaults to false.
   */
  requireInteraction?: boolean;
  /**
   * Optional.
   * Since Chrome 70.
   * Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
   */
  silent?: boolean;
  /** Optional. Title of the notification (e.g. sender name for email). Required for notifications.create method. */
  title?: string;
  /** Optional. Which type of notification to display. Required for notifications.create method. */
  type?: TemplateType;
};

export type PermissionLevel = 'granted' | 'denied';

export type TemplateType = 'basic' | 'image' | 'list' | 'progress';

export type NotificationButtonClickedEvent = Event<
  (notificationId: string, buttonIndex: number) => void
>;

export type NotificationClickedEvent = Event<(notificationId: string) => void>;

export type NotificationClosedEvent = Event<
  (notificationId: string, byUser: boolean) => void
>;

export type NotificationPermissionLevelChangedEvent = Event<
  (level: PermissionLevel) => void
>;

export type NotificationShowSettingsEvent = Event<() => void>;

export interface NotificationsModule {
  /**
   * Clears the specified notification.
   * @param notificationId The id of the notification to be cleared. This is returned by notifications.create method.
   * @param callback The callback parameter should be a function that looks like this:
   * (wasCleared: boolean) => void
   */
  clear(notificationId: string, callback?: (wasCleared: boolean) => void): void;

  /**
   * Creates and displays a notification.
   * @param notificationId Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.
   * The notificationId parameter is required before Chrome 42.
   * @param options Contents of the notification.
   * @param callback The callback parameter should be a function that looks like this:
   * (notificationId: string) => {...}
   */
  create(
    notificationId: string,
    options: NotificationOptions,
    callback?: (notificationId: string) => void,
  ): void;
  /**
   * Creates and displays a notification.
   * @param notificationId Identifier of the notification. If not set or empty, an ID will automatically be generated. If it matches an existing notification, this method first clears that notification before proceeding with the create operation. The identifier may not be longer than 500 characters.
   * The notificationId parameter is required before Chrome 42.
   * @param options Contents of the notification.
   * @param callback The callback parameter should be a function that looks like this:
   * (notificationId: string) => {...}
   */
  create(
    options: NotificationOptions,
    callback?: (notificationId: string) => void,
  ): void;

  /**
   * Retrieves all the notifications of this app or extension.
   * @param callback The callback parameter should be a function that looks like this:
   * (notifications: Object) => {...}
   */
  // deno-lint-ignore ban-types
  getAll(callback: (notifications: Object) => void): void;

  /**
   * Retrieves whether the user has enabled notifications from this app or extension.
   * @param callback The callback parameter should be a function that looks like this:
   * (level: PermissionLevel) => {...}
   */
  getPermissionLevel(callback: (level: PermissionLevel) => void): void;

  /**
   * Updates an existing notification.
   * @param notificationId The id of the notification to be updated. This is returned by notifications.create method.
   * @param options Contents of the notification to update to.
   * @param callback The callback parameter should be a function that looks like this:
   * (wasUpdated: boolean) => {...}
   */
  update(
    notificationId: string,
    options: NotificationOptions,
    callback?: (wasUpdated: boolean) => void,
  ): void;

  /** The user pressed a button in the notification. */
  onButtonClicked: NotificationButtonClickedEvent;

  /** The user clicked in a non-button area of the notification. */
  onClicked: NotificationClickedEvent;

  /** The notification closed, either by the system or by user action. */
  onClosed: NotificationClosedEvent;

  /** The user changes the permission level. As of Chrome 47, only ChromeOS has UI that dispatches this event. */
  onPermissionLevelChanged: NotificationPermissionLevelChangedEvent;

  /**
   * The user clicked on a link for the app's notification settings. As of Chrome 47, only ChromeOS has UI that dispatches this event. As of Chrome 65, that UI has been removed from ChromeOS, too.
   * @deprecated since Chrome 65. Custom notification settings button is no longer supported.
   */
  onShowSettings: NotificationShowSettingsEvent;
}
