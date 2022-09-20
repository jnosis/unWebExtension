import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

/**
 * Since Chrome 44.
 * The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher'.
 * The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking the app icon
 * in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu.
 */
export type ContextType =
  | 'all'
  | 'page'
  | 'frame'
  | 'selection'
  | 'link'
  | 'editable'
  | 'image'
  | 'video'
  | 'audio'
  | 'launcher'
  | 'browser_action'
  | 'page_action'
  | 'action';

export type CreateProperties = {
  /** Optional. The initial state of a checkbox or radio button: true for selected, false for unselected. Only one radio button can be selected at a time in a given group. */
  checked?: boolean;
  /** Optional. List of contexts this menu item will appear in. Defaults to ['page']. */
  contexts?: ContextType | ContextType[];
  /** Optional. Restricts the item to apply only to documents or frames whose URL matches one of the given patterns. For details on pattern formats, see Match Patterns. */
  documentUrlPatterns?: string[];
  /** Optional. Whether this context menu item is enabled or disabled. Defaults to true. */
  enabled?: boolean;
  /** Optional. The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension. */
  id?: string;
  /** Optional. The ID of a parent menu item; this makes the item a child of a previously added item. */
  parentId?: string | number;
  /** Optional. Similar to documentUrlPatterns, filters based on the src attribute of img, audio, and video tags and the href attribute of a tags. */
  targetUrlPatterns?: string[];
  /** Optional. The text to display in the item; this is required unless type is separator. When the context is selection, use %s within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin". */
  title?: string;
  /** Optional. The type of menu item. Defaults to normal. */
  type?: ItemType;
  /**
   * Optional.
   * Since Chrome 62.
   * Whether the item is visible in the menu.
   */
  visible?: boolean;
  /**
   * Optional.
   * A function that is called back when the menu item is clicked. Event pages cannot use this; instead, they should register a listener for contextMenus.onClicked.
   * @param info Information about the item clicked and the context where the click happened.
   * @param tab he details of the tab where the click took place. This parameter is not present for platform apps.
   */
  onclick?: (info: OnClickData, tab: Tab) => void;
};

/**
 * Since Chrome 44.
 * The type of menu item.
 */
export type ItemType = 'normal' | 'checkbox' | 'radio' | 'separator';

/**
 * Information sent when a context menu item is clicked.
 */
export type OnClickData = {
  /** Optional. A flag indicating the state of a checkbox or radio item after it is clicked. */
  checked?: boolean;
  /** A flag indicating whether the element is editable (text input, textarea, etc.). */
  editable: boolean;
  /**
   * Optional.
   * Since Chrome 51.
   * The ID of the frame of the element where the context menu was clicked, if it was in a frame.
   */
  frameId?: number;
  /** Optional. The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
  frameUrl?: string;
  /** Optional. If the element is a link, the URL it points to. */
  linkUrl?: string;
  /** Optional. One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements. */
  mediaType?: 'image' | 'video' | 'audio';
  /** The ID of the menu item that was clicked. */
  menuItemId: string | number;
  /** Optional. The URL of the page where the menu item was clicked. This property is not set if the click occurred in a context where there is no current page, such as in a launcher context menu. */
  pageUrl?: string;
  /** Optional. The parent ID, if any, for the item clicked. */
  parentMenuItemId?: string | number;
  /** Optional. The text for the context selection, if any. */
  selectionText?: string;
  /** Optional. Will be present for elements with a 'src' URL. */
  srcUrl?: string;
  /** Optional. A flag indicating the state of a checkbox or radio item before it was clicked. */
  wasChecked?: boolean;
};

export type UpdateProperties = {
  checked?: boolean;
  contexts?: ContextType | ContextType[];
  documentUrlPatterns?: string[];
  enabled?: boolean;
  parentId?: string | number;
  targetUrlPatterns?: string[];
  title?: string;
  type?: ItemType;
  visible?: boolean;
  onclick?: (info: OnClickData, tab: Tab) => void;
};

export type MenuClickedEvent = Event<(info: OnClickData, tab?: Tab) => void>;

export interface ContextMenusModule {
  /**
   * The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored.
   */
  ACTION_MENU_TOP_LEVEL_LIMIT: number;

  /**
   * Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in runtime.lastError.
   * @param createProperties
   * @param callback
   * @returns The ID of the newly created item.
   */
  create(
    createProperties: CreateProperties,
    callback?: () => void,
  ): number | string;

  /**
   * Removes a context menu item.
   * @param menuItemId The ID of the context menu item to remove.
   * @param callback
   */
  remove(menuItemId: string | number, callback?: () => void): void;

  /**
   * Removes all context menu items added by this extension.
   * @param callback
   */
  removeAll(callback?: () => void): void;

  /**
   * Updates a previously created context menu item.
   * @param id The ID of the item to update.
   * @param updateProperties The properties to update. Accepts the same values as the contextMenus.create function.
   * @param callback
   */
  update(
    id: string | number,
    updateProperties: UpdateProperties,
    callback?: () => void,
  ): void;

  /** Fired when a context menu item is clicked. */
  onClicked: MenuClickedEvent;
}
