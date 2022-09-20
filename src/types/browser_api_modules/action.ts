import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

// deno-lint-ignore no-explicit-any
type ImageData = /*unresolved*/ any;

export type ActionIconDetails = {
  /** Optional. Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
  imageData?: ImageData | { [index: number]: ImageData };
  /** Optional. Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
  path?: string | { [index: number]: string };
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
  tabId?: number;
};

export type BadgeBackgroundColorDetails = {
  /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
  color: string | ColorArray;
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
  tabId?: number;
};

export type BadgeTextDetails = {
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
  tabId?: number;
  /** Any number of characters can be passed, but only about four can fit in the space. */
  text: string;
};

export type ColorArray = [number, number, number, number];

/**
 * Since Chrome 99.
 */
export type OpenPopupOptions = {
  /** Optional. The id of the window to open the action popup in. Defaults to the currently-active window if unspecified. */
  windowId?: number;
};

export type PopupDetails = {
  /** The relative path to the HTML file to show in a popup. If set to the empty string (''), no popup is shown. */
  popup: string;
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
  tabId?: number;
};

export type TabDetails = {
  /** Optional. The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned. */
  tabId?: number;
};

export type TitleDetails = {
  /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
  tabId?: number;
  /** The string the action should display when moused over. */
  title: string;
};

/**
 * Since Chrome 91.
 * The collection of user-specified settings relating to an extension's action.
 */
export type UserSettings = {
  /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
  isOnToolbar: boolean;
};

export type ActionClickedEvent = Event<(tab: Tab) => void>;

export interface ActionModule {
  /**
   * Disables the action for a tab.
   * @param tabId The id of the tab for which you want to modify the action.
   * @return The 'disable' method provides its result via callback or returned as a 'Promise' (MV3 only). It has no parameters.
   */
  disable(tabId?: number): Promise<void>;
  /**
   * Disables the action for a tab.
   * @param tabId The id of the tab for which you want to modify the action.
   * @param callback
   */
  disable(tabId?: number, callback?: () => void): void;

  /**
   * Enables the action for a tab. By default, actions are enabled.
   * @param tabId The id of the tab for which you want to modify the action.
   * @return The 'enable' method provides its result via callback or returned as a 'Promise' (MV3 only). It has no parameters.
   */
  enable(tabId?: number): Promise<void>;
  /**
  callback: (result: ColorArray) => void,
   * Enables the action for a tab. By default, actions are enabled.
   * @param tabId The id of the tab for which you want to modify the action.
   * @param callback
   */
  enable(tabId?: number, callback?: () => void): void;

  /**
   * Gets the background color of the action.
   * @param details
   * @return The 'getBadgeBackgroundColor' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getBadgeBackgroundColor(
    details: TabDetails,
  ): Promise<ColorArray>;
  /**
   * Gets the background color of the action.
   * @param details
   * @param callback The callback parameter should be a function that looks like this:
   * (result: ColorArray) => {...}
   */
  getBadgeBackgroundColor(
    details: TabDetails,
    callback: (result: ColorArray) => void,
  ): void;

  /**
   * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned.
   * If displayActionCountAsBadgeText is enabled, a placeholder text will be returned unless the
   * declarativeNetRequestFeedback permission is present or tab-specific badge text was provided.
   * @param details
   * @return The 'getBadgeText' method provides its result via callback or returned as 'Promise' (MV3 only).
   */
  getBadgeText(details: TabDetails): Promise<string>;
  /**
   * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned.
   * If displayActionCountAsBadgeText is enabled, a placeholder text will be returned unless the
   * declarativeNetRequestFeedback permission is present or tab-specific badge text was provided.
   * @param details
   * @param callback The callback parameter should be a function that looks like this:
   * (result: string) => {...}
   */
  getBadgeText(details: TabDetails, callback: (result: string) => void): void;

  /**
   * Gets the html document set as the popup for this action.
   * @param details
   * @return The 'getPopup' method provides its result via callback or returned as 'Promise' (MV3 only).
   */
  getPopup(details: TabDetails): Promise<string>;
  /**
   * Gets the html document set as the popup for this action.
   * @param details
   * @param callback The callback parameter should be a function that looks this:
   * (result: string) => {...}
   */
  getPopup(details: TabDetails, callback: (result: string) => void): void;

  /**
   * Gets the title of the action.
   * @param details
   * @return The 'getTitle' method provides its result via callback or returned as 'Promise' (MV3 only).
   */
  getTitle(details: TabDetails): Promise<string>;
  /**
   * Gets the title of the action.
   * @param details
   * @param callback The callback parameter should be a function that looks this:
   * (result: string) => {...}
   */
  getTitle(details: TabDetails, callback: (result: string) => void): void;

  /**
   * Since Chrome 91.
   * Returns the user-specified settings relating to an extension's action.
   * @return The 'getUserSettings' method provides its result via callback or returned as 'Promise' (MV3 only).
   */
  getUserSettings(): Promise<UserSettings>;
  /**
   * Since Chrome 91.
   * Returns the user-specified settings relating to an extension's action.
   * @param callback The callback parameter should be a function that looks this:
   * (result: UserSettings) => {...}
   */
  getUserSettings(callback: (result: UserSettings) => void): void;

  /**
   * Since Chrome 99.
   * Returns the user-specified settings relating to an extension's action.
   * @param options Specifies options for opening the popup.
   * @return The 'openPopup' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  openPopup(options?: OpenPopupOptions): Promise<void>;
  /**
   * Since Chrome 99.
   * Returns the user-specified settings relating to an extension's action.
   * @param options Specifies options for opening the popup.
   * @param callback
   */
  openPopup(options?: OpenPopupOptions, callback?: () => void): void;

  /**
   * Sets the background color for the badge.
   * @param details
   * @return The 'setBadgeBackgroundColor' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Promise<void>;
  /**
   * Sets the background color for the badge.
   * @param details
   * @param callback
   */
  setBadgeBackgroundColor(
    details: BadgeBackgroundColorDetails,
    callback?: () => void,
  ): void;

  /**
   * Sets the badge text for the action. The badge is displayed on top of the icon.
   * @param details
   * @return The 'setBadgeText' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  setBadgeText(details: BadgeTextDetails): Promise<void>;
  /**
   * Sets the badge text for the action. The badge is displayed on top of the icon.
   * @param details
   * @param callback
   */
  setBadgeText(details: BadgeTextDetails, callback?: () => void): void;

  /**
   * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element,
   * or as dictionary of either one of those. Either the path or the imageData property must be specified.
   * @param details
   * @return The 'setIcon' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  setIcon(details: ActionIconDetails): Promise<void>;
  /**
   * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element,
   * or as dictionary of either one of those. Either the path or the imageData property must be specified.
   * @param details
   * @param callback
   */
  setIcon(details: ActionIconDetails, callback?: () => void): void;

  /**
   * Sets the html document to be opened as a popup when the user clicks on the action's icon.
   * @param details
   * @return The 'setPopup' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  setPopup(details: PopupDetails): Promise<void>;
  /**
   * Sets the html document to be opened as a popup when the user clicks on the action's icon.
   * @param details
   * @param callback
   */
  setPopup(details: PopupDetails, callback?: () => void): void;

  /**
   * Sets the title of the action. This shows up in the tooltip.
   * @param details
   * @return The 'setTitle' method provides its result via callback or returned as 'Promise' (MV3 only). It has no parameters.
   */
  setTitle(details: TitleDetails): Promise<void>;
  /**
   * Sets the title of the action. This shows up in the tooltip.
   * @param details
   * @param callback
   */
  setTitle(details: TitleDetails, callback?: () => void): void;

  /** Fired when an action icon is clicked. This event will not fire if the action has a popup. */
  onClicked: ActionClickedEvent;
}
