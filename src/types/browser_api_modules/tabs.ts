// TODO1: Add full api
// TODO2: Change Port
import { Event } from 'bext/types/browser_api_modules/event.ts';
import { Port } from 'bext/types/browser_api_modules/runtime.ts';
import { ImageDetails } from './extension_types.ts';

export type ConnectInfo = {
  /** Optional. Open a port to a specific document identified by documentId instead of all frames in the tab. */
  documentId?: string;
  /** Optional. Open a port to a specific frame identified by frameId instead of all frames in the tab. */
  frameId?: string;
  /** Optional. Is passed into onConnect for content scripts that are listening for the connection event. */
  name?: string;
};

export type CreateProperties = {
  /** Optional. Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true. */
  active?: boolean;
  /** Optional. The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window. */
  index?: number;
  /** Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab. */
  openerTabId?: number;
  /** Optional. Whether the tab should be pinned. Defaults to false. */
  pinned?: boolean;
  /**
   * Optional.
   * Whether the tab should become the selected tab in the window. Defaults to true.
   * @deprecated Please use active.
   */
  selected?: boolean;
  /** Optional. The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page. */
  url?: string;
  /** Optional. The window in which to create the new tab. Defaults to the current window. */
  windowId?: number;
};

/**
 * Since Chrome 46.
 * The tab's muted state and the reason for the last state change.
 */
export type MutedInfo = {
  /** Optional. The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed. */
  extensionId?: string;
  /** Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing. */
  muted: boolean;
  /** Optional. The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed. */
  reason?: MutedInfoReason;
};

/**
 * Since Chrome 46.
 * An event that caused a muted state change.
 */
export type MutedInfoReason = 'user' | 'capture' | 'extension';

export type QueryInfo = {
  /** Optional. Whether the tabs are active in their windows. */
  active?: boolean;
  /**
   * Optional.
   * Since Chrome 45.
   * Whether the tabs are audible.
   */
  audible?: boolean;
  /**
   * Optional.
   * Since Chrome 54.
   * Whether the tabs can be discarded automatically by the browser when resources are low.
   */
  autoDiscardable?: boolean;
  /** Optional. Whether the tabs are in the current window. */
  currentWindow?: boolean;
  /**
   * Optional.
   * Since Chrome 54.
   * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
   */
  discarded?: boolean;
  /**
   * Optional.
   * Since Chrome 88.
   * The ID of the group that the tabs are in, or tabGroups.TAB_GROUP_ID_NONE for ungrouped tabs.
   */
  groupId?: number;
  /** Optional. Whether the tabs are highlighted. */
  highlighted?: boolean;
  /** Optional. The position of the tabs within their windows. */
  index?: number;
  /** Optional. Whether the tabs are in the last focused window. */
  lastFocusedWindow?: boolean;
  /**
   * Optional.
   * Since Chrome 45.
   * Whether the tabs are muted.
   */
  muted?: boolean;
  /** Optional. Whether the tabs are pinned. */
  pinned?: boolean;
  /** Optional. The tab loading status. */
  status?: TabStatus;
  /** Optional. Match page titles against a pattern. This property is ignored if the extension does not have the "tabs" permission. */
  title?: string;
  /** Optional. Match tabs against one or more URL patterns. Fragment identifiers are not matched. This property is ignored if the extension does not have the "tabs" permission. */
  url?: string | string[];
  /** Optional. The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
  windowId?: number;
  /** Optional. The type of window the tabs are in. */
  windowType?: WindowType;
};

export type Tab = {
  /** Whether the tab is active in its window. Does not necessarily mean the window is focused. */
  active: boolean;
  /**
   * Optional.
   * Since Chrome 45.
   * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
   */
  audible?: boolean;
  /**
   * Since Chrome 54.
   * Whether the tab can be discarded automatically by the browser when resources are low.
   */
  autoDiscardable: boolean;
  /**
   * Since Chrome 54.
   * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
   */
  discarded: boolean;
  /** Optional. The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading. */
  favIconUrl?: string;
  /**
   * Since Chrome 88.
   * The ID of the group that the tab belongs to.
   */
  groupId: number;
  /** Optional. The height of the tab in pixels. */
  height?: number;
  /** Whether the tab is highlighted. */
  highlighted: boolean;
  /** Optional. The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows. */
  id?: number;
  /** Whether the tab is in an incognito window. */
  incognito: boolean;
  /** The zero-based index of the tab within its window. */
  index: number;
  /**
   * Optional.
   * Since Chrome 46.
   * The tab's muted state and the reason for the last state change.
   */
  mutedInfo?: MutedInfo;
  /** Optional. The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists. */
  openerTabId?: number;
  /**
   * Optional.
   * Since Chrome 79.
   * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
   */
  pendingUrl?: string;
  /** Whether the tab is pinned. */
  pinned: boolean;
  /**
   * Whether the tab is selected.
   * @deprecated Please use tabs.Tab.highlighted.
   */
  selected: boolean;
  /** Optional. The session ID used to uniquely identify a tab obtained from the sessions API. */
  sessionId?: string;
  /** Optional. The tab's loading status. */
  status?: TabStatus;
  /** Optional. The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission. */
  title?: string;
  /** Optional. The last committed URL of the main frame of the tab. This property is only present if the extension's manifest includes the "tabs" permission and may be an empty string if the tab has not yet committed. See also Tab.pendingUrl. */
  url?: string;
  /** Optional. The width of the tab in pixels. */
  width?: number;
  /** The ID of the window that contains the tab. */
  windowId: number;
};

export type TabActiveInfo = {
  /** The ID of the tab that has become active. */
  tabId: number;
  /** The ID of the window the active tab changed inside of. */
  windowId: number;
};

export type TabAttachInfo = {
  newPosition: number;
  newWindowId: number;
};

export type TabChangeInfo = {
  /**
   * Optional.
   * Since Chrome 45.
   * The tab's new audible state.
   */
  audible?: boolean;
  /**
 * Optional.
 Since Chrome 54.
 * The tab's new auto-discardable state.
 */
  autoDiscardable?: boolean;
  /**
   * Optional
   * Since Chrome 54.
   * The tab's new discarded state.
   */
  discarded?: boolean;
  /** Optional. The tab's new favicon URL. */
  favIconUrl?: string;
  /**
   * Optional
   * Since Chrome 88.
   * The tab's new group.
   */
  groupId?: number;
  /**
   * Optional
   * Since Chrome 46.
   * The tab's new muted state and the reason for the change.
   */
  mutedInfo?: MutedInfo;
  /** Optional. The tab's new pinned state. */
  pinned?: boolean;
  /** Optional. The tab's loading status. */
  status?: TabStatus;
  /**
   * Optional
   * Since Chrome 48.
   * The tab's new title.
   */
  title?: string;
  /** Optional. The tab's URL if it has changed. */
  url?: string;
};

export type TabDetachInfo = {
  oldPosition: number;
  oldWindowId: number;
};

export type TabHighlightInfo = {
  /** All highlighted tabs in the window. */
  tabIds: number[];
  /** The window whose tabs changed. */
  windowId: number;
};

export type TabMoveInfo = {
  fromIndex: number;
  toIndex: number;
  windowId: number;
};

export type TabRemoveInfo = {
  /** True when the tab was closed because its parent window was closed. */
  isWindowClosing: boolean;
  /** The window whose tab is closed. */
  windowId: number;
};

export type TabSelectInfo = {
  /** The ID of the window the selected tab changed inside of. */
  windowId: number;
};

/**
 * Since Chrome 44.
 * The tab's loading status.
 */
export type TabStatus = 'unloaded' | 'loading' | 'complete';

export type UpdateProperties = {
  /** Optional. Whether the tab should be active. Does not affect whether the window is focused (see windows.update). */
  active?: boolean;
  /**
   * Optional.
   * Since Chrome 54.
   * Whether the tab should be discarded automatically by the browser when resources are low.
   */
  autoDiscardable?: boolean;
  /** Optional. Adds or removes the tab from the current selection. */
  highlighted?: boolean;
  /**
   * Optional.
   * Since Chrome 45.
   * Whether the tab should be muted.
   */
  muted?: boolean;
  /** Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab. */
  openerTabId?: number;
  /** Optional. Whether the tab should be pinned. */
  pinned?: boolean;
  /**
   * Optional.
   * Whether the tab should be selected.
   * @deprecated Please use highlighted.
   */
  selected?: boolean;
  /** Optional. A URL to navigate the tab to. JavaScript URLs are not supported; use scripting.executeScript instead. */
  url?: string;
};

/**
 * Since Chrome 44.
 * The type of window.
 */
export type WindowType = 'normal' | 'popup' | 'panel' | 'app' | 'devtools';

export type ZoomChangeInfo = {
  newZoomFactor: number;
  oldZoomFactor: number;
  tabId: number;
  zoomSettings: ZoomSettings;
};

/**
 * Defines how zoom changes in a tab are handled and at what scope.
 */
export type ZoomSettings = {
  /**
   * Optional.
   * Since Chrome 43.
   * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
   */
  defaultZoomFactor?: number;
  /** Optional. Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to automatic. */
  mode?: ZoomSettingsMode;
  /** Optional. Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise. */
  scope?: ZoomSettingsScope;
};

/**
 * Since Chrome 44.
 * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to automatic.
 */
export type ZoomSettingsMode = 'automatic' | 'manual' | 'disabled';

/**
 * Since Chrome 44.
 * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise.
 */
export type ZoomSettingsScope = 'per-origin' | 'per-tab';

export type TabActivatedEvent = Event<(activeInfo: TabActiveInfo) => void>;

export type TabActivateChangedEvent = Event<
  (tabId: number, selectInfo: TabSelectInfo) => void
>;

export type TabAttachedEvent = Event<
  (tabId: number, attachInfo: TabAttachInfo) => void
>;

export type TabCreatedEvent = Event<(tab: Tab) => void>;

export type TabDetachedEvent = Event<
  (tabId: number, detachInfo: TabDetachInfo) => void
>;

export type TabHighlightChangedEvent = Event<
  (selectInfo: TabHighlightInfo) => void
>;

export type TabHighlightedEvent = Event<
  (highlightInfo: TabHighlightInfo) => void
>;

export type TabMovedEvent = Event<
  (tabId: number, moveInfo: TabMoveInfo) => void
>;

export type TabRemovedEvent = Event<
  (tabId: number, removeInfo: TabRemoveInfo) => void
>;

export type TabReplacedEvent = Event<
  (addedTabId: number, removedTabId: number) => void
>;

export type TabSelectionChangedEvent = Event<
  (tabId: number, selectInfo: TabSelectInfo) => void
>;

export type TabUpdatedEvent = Event<
  (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void
>;

export type TabZoomChangeEvent = Event<
  (ZoomChangeInfo: ZoomChangeInfo) => void
>;

export interface TabsModule {
  /**
   * Since Chrome 92.
   * The maximum number of times that captureVisibleTab can be called per second. captureVisibleTab is expensive and should not be called too often.
   */
  MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND: 2;

  /**
   * Since Chrome 46.
   * An ID that represents the absence of a browser tab.
   */
  TAB_ID_NONE: -1;

  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @returns The 'captureVisibleTab' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  captureVisibleTab(): Promise<string>;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param windowId The target window. Defaults to the current window.
   * @returns The 'captureVisibleTab' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  captureVisibleTab(windowId: number): Promise<string>;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param options
   * @returns The 'captureVisibleTab' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  captureVisibleTab(options: ImageDetails): Promise<string>;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param windowId The target window. Defaults to the current window.
   * @param options
   * @returns The 'captureVisibleTab' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  captureVisibleTab(windowId: number, options: ImageDetails): Promise<string>;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param callback The callback parameter should be a function that looks like this:
   * (dataUrl: string) => {...}
   * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
   */
  captureVisibleTab(callback: (dataUrl: string) => void): void;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param windowId The target window. Defaults to the current window.
   * @param callback The callback parameter should be a function that looks like this:
   * (dataUrl: string) => {...}
   * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
   */
  captureVisibleTab(
    windowId: number,
    callback: (dataUrl: string) => void,
  ): void;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param options
   * @param callback The callback parameter should be a function that looks like this:
   * (dataUrl: string) => {...}
   * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
   */
  captureVisibleTab(
    options: ImageDetails,
    callback: (dataUrl: string) => void,
  ): void;
  /**
   * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the <all_urls> permission or the activeTab permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
   * @param windowId The target window. Defaults to the current window.
   * @param options
   * @param callback The callback parameter should be a function that looks like this:
   * (dataUrl: string) => {...}
   * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
   */
  captureVisibleTab(
    windowId: number,
    options: ImageDetails,
    callback: (dataUrl: string) => void,
  ): void;

  /**
   * Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see Content Script Messaging.
   * @param tabId
   * @param connectInfo
   * @return A port that can be used to communicate with the content scripts running in the specified tab. The port's runtime.Port event is fired if the tab closes or does not exist.
   */
  connect(tabId: number, connectInfo: ConnectInfo): Port;

  /**
   * Creates a new tab.
   * @param createProperties
   * @returns The 'create' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  create(createProperties: CreateProperties): Promise<Tab>;
  /**
   * Creates a new tab.
   * @param createProperties
   * @param callback The callback parameter should be a function that looks like this:
   * (tab: Tab) => {...}
   */
  create(
    createProperties: CreateProperties,
    callback?: (tab: Tab) => void,
  ): void;

  /**
   * Detects the primary language of the content in a tab.
   * @param tabId Defaults to the active tab of the current window.
   * @returns The 'detectLanguage' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  detectLanguage(tabId?: number): Promise<string>;
  /**
   * Detects the primary language of the content in a tab.
   * @param callback The callback parameter should be a function that looks like this:
   * (language: string) => {...}
   * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which zh-CN is returned. For an unknown/undefined language, und is returned.
   */
  detectLanguage(callback: (language: string) => void): void;
  /**
   * Detects the primary language of the content in a tab.
   * @param tabId Defaults to the active tab of the current window.
   * @param callback The callback parameter should be a function that looks like this:
   * (language: string) => {...}
   * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The second to fourth columns are checked and the first non-NULL value is returned, except for Simplified Chinese for which zh-CN is returned. For an unknown/undefined language, und is returned.
   */
  detectLanguage(tabId?: number, callback?: (language: string) => void): void;

  /**
   * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
   * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
   * @returns The 'discard' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  discard(tabId?: number): Promise<Tab | undefined>;
  /**
   * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
   * @param callback The callback parameter should be a function that looks like this:
   * (tab?: Tab) => {...}
   * Parameter tab: The discarded tab, if it was successfully discarded; undefined otherwise.
   */
  discard(callback?: (tab?: Tab) => void): void;
  /**
   * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
   * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
   * @param callback The callback parameter should be a function that looks like this:
   * (tab?: Tab) => {...}
   * Parameter tab: The discarded tab, if it was successfully discarded; undefined otherwise.
   */
  discard(tabId?: number, callback?: (tab?: Tab) => void): void;

  /**
   * Duplicates a tab.
   * @param tabId The ID of the tab to duplicate.
   * @returns The 'duplicate' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  duplicate(tabId: number): Promise<Tab | undefined>;
  /**
   * Duplicates a tab.
   * @param tabId The ID of the tab to duplicate.
   * @param callback The callback parameter should be a function that looks like this:
   * (tab?: Tab) => {...}
   * Parameter tab: Details about the duplicated tab. The tabs.Tab object does not contain url, pendingUrl, title, and favIconUrl if the "tabs" permission has not been requested.
   */
  duplicate(tabId: number, callback?: (tab?: Tab) => void): void;

  // executeScript(tabId?: number, details: InjectDetails, callback?: (result?: any[]) => void): void;

  /**
   * Retrieves details about the specified tab.
   * @param tabId
   * @returns The 'get' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  get(tabId: number): Promise<Tab>;
  /**
   * Retrieves details about the specified tab.
   * @param tabId
   * @param callback The callback parameter should be a function that looks like this:
   * (tab: Tab) => {...}
   */
  get(tabId: number, callback: (tab: Tab) => void): void;

  // getAllInWindow(windowId?: number, callback?: (tabs: Tab[]) => void): void;

  // getCurrent(callback?: (tab: Tab) => void): void;

  // getSelected(windowId?: number, callback?: (tab: Tab) => void): void;

  // getZoom(tabId?: number, callback?: (tab: Tab) => void): void;

  // getZoomSettings(tabId?: number, callback?: (zoomSettings: ZoomSettings) => void): void;

  // goBack(tabId?: number, callback?: () => void): void;

  // goForward(tabId?: number, callback?: () => void): void;

  // group(options: GroupOptions, callback?: (groupId: number) => void): void;

  // highlight(highlightInfo: HighlightInfo, callback?: (window: Window) => void): void;

  // insertCSS(tabId?: number, details: InjectDetails, callback?: () => void): void;

  // move(tabIds: number | number[], moveProperties: MoveProperties, callback?: (tabs: Tab | Tab[]) => void): void;

  /**
   * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
   * @param queryInfo
   * @returns The 'query' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  query(queryInfo: QueryInfo): Promise<Tab[]>;
  /**
   * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
   * @param queryInfo
   * @param callback  The callback parameter should be a function that looks like this:
   * (result: Tab[]) => {...}
   */
  query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;

  // reload(tabId?: number, reloadProperties: ReloadProperties, callback?: () => void): void;

  // remove(tabIds: number | number[], callback?: () => void): void;

  // remove(tabId?: number, details: DeleteInjectionDetails, callback?: () => void): void;

  // sendMessage<Message = any, Response = any>(tabId: number, message: Message, options?: MessageSendOptions, callback?: (response: Response) => void): void;

  // sendRequest<Request = any, Response = any>(tabId: number, request: Request, callback?: (response: Response) => void): void;

  // setZoom(tabId?: number, zoomFactor: number, callback?: () => void): void;

  // setZoomSettings(tabId?: number, zoomSettings: ZoomSettings, callback?: () => void): void;

  // ungroup(tabIds: number | number[], callback?: () => void): void;

  /**
   * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
   * @param tabId Defaults to the selected tab of the current window.
   * @param updateProperties
   * @returns The 'update' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  update(
    tabId: number,
    updateProperties: UpdateProperties,
  ): Promise<Tab | undefined>;
  /**
   * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
   * @param updateProperties
   * @returns The 'update' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  update(updateProperties: UpdateProperties): Promise<Tab | undefined>;
  /**
   * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
   * @param tabId Defaults to the selected tab of the current window.
   * @param updateProperties
   * @param callback The callback parameter should be a function that looks like this:
   * (tab?: Tab) => {...}
   * Parameter tab: Details about the updated tab. The tabs.Tab object does not contain url, pendingUrl, title, and favIconUrl if the "tabs" permission has not been requested.
   */
  update(
    tabId: number,
    updateProperties: UpdateProperties,
    callback?: (tab?: Tab) => void,
  ): void;
  /**
   * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
   * @param updateProperties
   * @param callback The callback parameter should be a function that looks like this:
   * (tab?: Tab) => {...}
   * Parameter tab: Details about the updated tab. The tabs.Tab object does not contain url, pendingUrl, title, and favIconUrl if the "tabs" permission has not been requested.
   */
  update(
    updateProperties: UpdateProperties,
    callback?: (tab?: Tab) => void,
  ): void;

  /** Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set. */
  onActivated: TabActivatedEvent;

  /**
   * Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to tabs.onUpdated events so as to be notified when a URL is set.
   * @deprecated Please use tabs.onActivated.
   */
  onActiveChanged: TabActivateChangedEvent;

  /** Fired when a tab is attached to a window; for example, because it was moved between windows. */
  onAttached: TabAttachedEvent;

  /** Fired when a tab is created. Note that the tab's URL and tab group membership may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set or the tab is added to a tab group. */
  onCreated: TabCreatedEvent;

  /** Fired when a tab is detached from a window; for example, because it was moved between windows. */
  onDetach: TabDetachedEvent;

  /**
   * Fired when the highlighted or selected tabs in a window changes.
   * @deprecated Please use tabs.onHighlighted
   */
  onHighlightChanged: TabHighlightChangedEvent;

  /** Fired when the highlighted or selected tabs in a window changes. */
  onHighlighted: TabHighlightedEvent;

  /** Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see tabs.onDetached. */
  onMoved: TabMovedEvent;

  /** Fired when a tab is closed. */
  onRemoved: TabRemovedEvent;

  /** Fired when a tab is replaced with another tab due to prerendering or instant. */
  onReplaced: TabReplacedEvent;

  /**
   * Fires when the selected tab in a window changes.
   * @deprecated Please use tabs.onActivated.
   */
  onSelectionChanged: TabSelectionChangedEvent;

  /** Fired when a tab is updated. */
  onUpdated: TabUpdatedEvent;

  /** Fired when a tab is zoomed. */
  onZoomChange: TabZoomChangeEvent;
}
