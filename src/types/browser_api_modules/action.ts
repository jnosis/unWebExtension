import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

// deno-lint-ignore no-explicit-any
type ImageData = /*unresolved*/ any;

export type ActionIconDetails = {
  imageData?: ImageData | { [index: number]: ImageData };
  path?: string | { [index: number]: string };
  tabId?: number;
};

export type BadgeBackgroundColorDetails = {
  color: string | ColorArray;
  tabId?: number;
};

export type BadgeTextDetails = {
  text: string;
  tabId?: number;
};

export type ColorArray = [number, number, number, number];

export type OpenPopupOptions = {
  windowId?: number;
};

export type PopupDetails = {
  popup: string;
  tabId?: number;
};

export type TabDetails = {
  tabId?: number;
};

export type TitleDetails = {
  tabId?: number;
  title: string;
};

export type UserSettings = {
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
