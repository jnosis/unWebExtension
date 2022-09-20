export type Tab = {
  status?: string | undefined;
  index: number;
  openerTabId?: number | undefined;
  title?: string | undefined;
  url?: string | undefined;
  pendingUrl?: string | undefined;
  pinned: boolean;
  highlighted: boolean;
  windowId: number;
  active: boolean;
  favIconUrl?: string | undefined;
  id?: number | undefined;
  incognito: boolean;
  selected: boolean;
  audible?: boolean | undefined;
  discarded: boolean;
  autoDiscardable: boolean;
  // mutedInfo?: MutedInfo | undefined;
  width?: number | undefined;
  height?: number | undefined;
  sessionId?: string | undefined;
  groupId: number;
};

export interface TabsModule {}
