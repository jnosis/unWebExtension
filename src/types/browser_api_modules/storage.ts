// deno-lint-ignore-file no-explicit-any
import { Event } from 'bext/types/browser_api_modules/event.ts';

/**
 * Since Chrome 102.
 * The storage area's access level.
 */
export type AccessLevel = 'TRUSTED_CONTEXTS' | 'TRUSTED_AND_UNTRUSTED_CONTEXTS';

export type AreaName = 'local' | 'manged' | 'session' | 'sync';

export type StorageArea = {
  /**
   * Since Chrome 73.
   * Fired when one or more items change.
   */
  onChanged: StorageAreaChangedEvent;

  /**
   * Removes all items from storage.
   * @returns The 'clear' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  clear(): Promise<void>;
  /**
   * Removes all items from storage.
   * @param callback
   */
  clear(callback?: () => void): void;

  /**
   * Gets one or more items from storage
   * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
   * @returns The 'get' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  get(
    keys?: string | string[] | { [key: string]: any } | null,
  ): Promise<{ [key: string]: any }>;
  /**
   * Gets one or more items from storage
   * @param callback The callback parameter should be a function that looks like this:
   * (items: { [key: string]: any }) => {...}
   */
  get(callback: (items: { [key: string]: any }) => void): void;
  /**
   * Gets one or more items from storage
   * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
   * @param callback The callback parameter should be a function that looks like this:
   * (items: { [key: string]: any }) => {...}
   */
  get(
    keys: string | string[] | { [key: string]: any } | null,
    callback: (items: { [key: string]: any }) => void,
  ): void;

  /**
   * Gets the amount of space (in bytes) being used by one or more items.
   * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
   * @returns The 'getBytesInUse' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  getBytesInUse(keys?: string | string[] | null): Promise<number>;
  /**
   * Gets the amount of space (in bytes) being used by one or more items.
   * @param callback The callback parameter should be a function that looks like this:
   * (bytesInUse: number) => {...}
   */
  getBytesInUse(callback: (bytesInUse: number) => void): void;
  /**
   * Gets the amount of space (in bytes) being used by one or more items.
   * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
   * @param callback The callback parameter should be a function that looks like this:
   * (bytesInUse: number) => {...}
   */
  getBytesInUse(
    keys: string | string[] | null,
    callback: (bytesInUse: number) => void,
  ): void;

  /**
   * Removes one or more items from storage.
   * @param keys A single key or a list of keys for items to remove.
   * @returns The 'remove' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  remove(keys: string | string[]): Promise<void>;
  /**
   * Removes one or more items from storage.
   * @param keys A single key or a list of keys for items to remove.
   * @param callback
   */
  remove(keys: string | string[], callback?: () => void): void;

  /**
   * Sets multiple items.
   * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
   * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
   * @returns The 'set' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  set(items: { [key: string]: any }): Promise<void>;
  /**
   * Sets multiple items.
   * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
   * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
   * @param callback
   */
  set(items: { [key: string]: any }, callback?: () => void): void;

  /**
   * Since Chrome 102.
   * Sets the desired access level for the storage area. The default will be only trusted contexts.
   * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
   * @returns The 'setAccessLevel' method provides its result via callback or returned as a 'Promise' (MV3 only).
   */
  setAccessLevel(accessOptions: { accessLevel: AccessLevel }): Promise<void>;
  /**
   * Since Chrome 102.
   * Sets the desired access level for the storage area. The default will be only trusted contexts.
   * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
   * @param callback
   */
  setAccessLevel(
    accessOptions: { accessLevel: AccessLevel },
    callback?: () => void,
  ): void;
};

export type StorageChange = {
  /** Optional. The new value of the item, if there is a new value. */
  newValue?: any;
  /** Optional. The old value of the item, if there is a old value. */
  oldValue?: any;
};

type LocalStorageArea = StorageArea & {
  /** The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the unlimitedStorage permission. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
  QUOTA_BYTES: number;
};

type SessionStorageArea = StorageArea & {
  /** The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
  QUOTA_BYTES: number;
};

type SyncStorageArea = StorageArea & {
  /** The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set runtime.lastError. */
  MAX_ITEMS: number;
  /** @deprecated The storage.sync API no longer has a sustained write operation quota. */
  MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
  /**
   * The maximum number of set, remove, or clear operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
   * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
   */
  MAX_WRITE_OPERATIONS_PER_HOUR: number;
  /**
   * The maximum number of set, remove, or clear operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
   * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
   */
  MAX_WRITE_OPERATIONS_PER_MINUTE: number;
  /** The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
  QUOTA_BYTES: number;
  /** The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set runtime.lastError. */
  QUOTA_BYTES_PER_ITEM: number;
};

export type StorageAreaChangedEvent = Event<
  (changes: { [key: string]: StorageChange }) => void
>;

export type StorageChangedEvent = Event<
  (changes: { [key: string]: StorageChange }, areaName: AreaName) => void
>;

export interface StorageModule {
  /** Items in the local storage area are local to each machine. */
  local: LocalStorageArea;

  /** Items in the managed storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error. */
  managed: StorageArea;

  /**
   * Since Chrome 102.
   * Items in the session storage area are stored in-memory and will not be persisted to disk.
   */
  session: SessionStorageArea;

  /** Items in the sync storage area are synced using Chrome Sync. */
  sync: SyncStorageArea;

  /** Fired when one or more items change. */
  onChanged: StorageChangedEvent;
}
