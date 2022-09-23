import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Tab } from './tabs.ts';

export type CreateData = {
  /** Optional. If true, opens an active window. If false, opens an inactive window. */
  focused?: boolean;
  /** Optional. The height in pixels of the new window, including the frame. If not specified, defaults to a natural height. */
  height?: number;
  /** Optional. Whether the new window should be an incognito window. */
  incognito?: boolean;
  /** Optional. The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels. */
  left?: number;
  /**
   * Optional.
   * Since Chrome 64.
   * If true, the newly-created window's 'window.opener' is set to the caller and is in the same unit of related browsing contexts as the caller.
   */
  setSelfOpener?: boolean;
  /**
   * Optional.
   * Since Chrome 44.
   * The initial state of the window. The minimized, maximized, and fullscreen states cannot be combined with left, top, width, or height.
   */
  state?: WindowState;
  /** Optional. The ID of the tab to add to the new window. */
  tabId?: number;
  /** Optional. The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels. */
  top?: number;
  /** Optional. Specifies what type of browser window to create. */
  type?: CreateType;
  /** Optional. A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page. */
  url?: string | string[];
  /** Optional. The width in pixels of the new window, including the frame. If not specified, defaults to a natural width. */
  width?: number;
};

/**
 * Since Chrome 44.
 * Specifies what type of browser window to create. 'panel' is deprecated and is available only to existing allowlisted extensions on Chrome OS.
 */
export type CreateType = 'normal' | 'popup' | 'panel';

/** Since Chrome 88. */
export type QueryOptions = {
  /** Optional. If true, the windows.Window object has a tabs property that contains a list of the tabs.Tab objects. The Tab objects only contain the url, pendingUrl, title, and favIconUrl properties if the extension's manifest file includes the "tabs" permission. */
  populate?: boolean;
  /** Optional. If set, the windows.Window returned is filtered based on its type. If unset, the default filter is set to ['normal', 'popup']. */
  windowTypes?: WindowType[];
};

export type UpdateInfo = {
  /** If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous drawAttention request. */
  drawAttention?: boolean;
  /** If true, brings the window to the front; cannot be combined with the state 'minimized'. If false, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'. */
  focused?: boolean;
  /** The height to resize the window to in pixels. This value is ignored for panels. */
  height?: number;
  /** The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels. */
  left?: number;
  /** The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'. */
  state?: WindowState;
  /** The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels. */
  top?: number;
  /** The width to resize the window to in pixels. This value is ignored for panels. */
  width?: number;
};

export type Window = {
  /** Whether the window is set to be always on top. */
  alwaysOnTop: boolean;
  /** Whether the window is currently the focused window. */
  focused: boolean;
  /** Optional. The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a height property; for example, when querying closed windows from the sessions API. */
  height?: number;
  /** Optional. The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an ID property; for example, when querying windows using the sessions API, in which case a session ID may be present. */
  id?: number;
  /** Whether the window is incognito. */
  incognito: boolean;
  /** Optional. The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a left property; for example, when querying closed windows from the sessions API. */
  left?: number;
  /** The session ID used to uniquely identify a window, obtained from the sessions API. */
  sessionId?: string;
  /** Optional. The state of this browser window. */
  state?: WindowState;
  /** Optional. Array of tabs.Tab objects representing the current tabs in the window. */
  tabs?: Tab[];
  /** Optional. The offset of the window from the top edge of the screen in pixels. In some circumstances a window may not be assigned a top property; for example, when querying closed windows from the sessions API. */
  top?: number;
  /** Optional. The type of browser window this is. */
  type?: WindowType;
  /** Optional. The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a width property; for example, when querying closed windows from the sessions API. */
  width?: number;
};

/**
 * Since Chrome 44.
 * The state of this browser window. In some circumstances a window may not be assigned a state property; for example, when querying closed windows from the sessions API.
 */
export type WindowState =
  | 'normal'
  | 'minimized'
  | 'maximized'
  | 'fullscreen'
  | 'locked-fullscreen';

/**
 * Since Chrome 44.
 * The type of browser window this is. In some circumstances a window may not be assigned a type property; for example, when querying closed windows from the sessions API.
 */
export type WindowType = 'normal' | 'popup' | 'panel' | 'app' | 'devtools';

export type WindowEventFilter = {
  windowTypes: WindowType[];
};

export interface WindowIdEventWithWindowTypeFilterInAddListener
  extends Event<(windowId: number) => void> {
  addListener(
    callback: (windowId: number) => void,
    filter?: WindowEventFilter,
  ): void;
}

export type WindowReferenceEvent = Event<(window: Window) => void>;

export interface WindowReferenceEventWithWindowTypeFilterInAddListener
  extends Event<(window: Window) => void> {
  addListener(
    callback: (window: Window) => void,
    filter?: WindowEventFilter,
  ): void;
}

export interface WindowsModule {
  /** The windowId value that represents the current window. */
  WINDOW_ID_CURRENT: -2;
  /** The windowId value that represents the absence of a Chrome browser window. */
  WINDOW_ID_NONE: -1;

  /**
   * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
   * @param createData
   * @returns The 'create' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  create(createData?: CreateData): Promise<Window | undefined>;
  /**
   * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
   * @param createData
   * @param callback The callback parameter should be a function that looks like this:
   * (window?: Window) => {...}
   * Optional parameter window: Contains details about the created window.
   */
  create(createData: CreateData, callback?: (window?: Window) => void): void;
  /**
   * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
   * @param callback The callback parameter should be a function that looks like this:
   * (window?: Window) => {...}
   * Optional parameter window: Contains details about the created window.
   */
  create(callback?: (window?: Window) => void): void;

  /**
   * Gets details about a window.
   * @param windowId
   * @param queryOptions
   * @returns The 'get' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  get(windowId: number, queryOptions?: QueryOptions): Promise<Window>;
  /**
   * Gets details about a window.
   * @param windowId
   * @param queryOptions
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  get(
    windowId: number,
    queryOptions: QueryOptions,
    callback: (window: Window) => void,
  ): void;
  /**
   * Gets details about a window.
   * @param windowId
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  get(windowId: number, callback: (window: Window) => void): void;

  /**
   * Gets all windows.
   * @param queryOptions
   * @returns The 'getAll' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getAll(queryOptions?: QueryOptions): Promise<Window[]>;
  /**
   * Gets all windows.
   * @param queryOptions
   * @param callback The callback parameter should be a function that looks like this:
   * (windows: Window[]) => {...}
   */
  getAll(
    queryOptions: QueryOptions,
    callback: (windows: Window[]) => void,
  ): void;
  /**
   * Gets all windows.
   * @param callback The callback parameter should be a function that looks like this:
   * (windows?: Window[]) => {...}
   */
  getAll(callback: (windows: Window[]) => void): void;

  /**
   * Gets the current window.
   * @param queryOptions
   * @returns The 'getCurrent' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getCurrent(queryOptions?: QueryOptions): Promise<Window>;
  /**
   * Gets the current window.
   * @param queryOptions
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  getCurrent(
    queryOptions: QueryOptions,
    callback: (window: Window) => void,
  ): void;
  /**
   * Gets the current window.
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  getCurrent(callback: (window: Window) => void): void;

  /**
   * Gets the window that was most recently focused — typically the window 'on top'.
   * @param queryOptions
   * @returns The 'getLastFocused' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getLastFocused(queryOptions?: QueryOptions): Promise<Window>;
  /**
   * Gets the window that was most recently focused — typically the window 'on top'.
   * @param queryOptions
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  getLastFocused(
    queryOptions: QueryOptions,
    callback: (window: Window) => void,
  ): void;
  /**
   * Gets the window that was most recently focused — typically the window 'on top'.
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  getLastFocused(callback: (window: Window) => void): void;

  /**
   * Removes (closes) a window and all the tabs inside it.
   * @param windowId
   * @returns The 'remove' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  remove(windowId: number): Promise<void>;
  /**
   * Removes (closes) a window and all the tabs inside it.
   * @param windowId
   * @param callback
   */
  remove(windowId: number, callback?: () => void): void;

  /**
   * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
   * @param windowId
   * @param updateInfo
   * @returns The 'update' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  update(windowId: number, updateInfo: UpdateInfo): Promise<Window>;
  /**
   * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
   * @param windowId
   * @param updateInfo
   * @param callback The callback parameter should be a function that looks like this:
   * (window: Window) => {...}
   */
  update(
    windowId: number,
    updateInfo: UpdateInfo,
    callback?: (window: Window) => void,
  ): void;

  /**
   * Since Chrome 86.
   * Fired when a window has been resized; this event is only dispatched when the new bounds are committed, and not for in-progress changes.
   */
  onBoundsChanged: WindowReferenceEvent;

  /** Fired when a window is created. */
  onCreated: WindowReferenceEventWithWindowTypeFilterInAddListener;

  /** Fired when the currently focused window changes. Returns chrome.windows.WINDOW_ID_NONE if all Chrome windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE is always sent immediately preceding a switch from one Chrome window to another. */
  onFocusChanged: WindowIdEventWithWindowTypeFilterInAddListener;

  /** Fired when a window is removed (closed). */
  onRemoved: WindowIdEventWithWindowTypeFilterInAddListener;
}
