export interface IStorageValue<T> {
  get(defaultValue: T): T;
  get(): T | null;
  get(defaultValue?: T): T | null ;
  set(value: T): void;
  remove(): void;
  toString(): string;
  valueOf(): T | null;
}
abstract class StorageValue<T> implements IStorageValue<T> {
  protected abstract storage: Storage;

  constructor(private readonly key: string, private readonly stringify?: boolean) {}

  get(defaultValue: T): T;
  get(): T | null;
  get(defaultValue?: T): T | null {
    const value = this.getValue() as any;
    return value != null ? value : defaultValue || null;
  }

  set(value: T) {
    this.storage.setItem(this.key, this.stringify ? JSON.stringify(value) : (value as unknown as string));
  }

  remove() {
    this.storage.removeItem(this.key);
  }

  toString(): string {
    return this.storage.getItem(this.key) || '';
  }

  valueOf(): T | null {
    return this.getValue();
  }

  private getValue(): T | null {
    const value = this.storage.getItem(this.key);
    if (value && this.stringify) {
      try {
        return JSON.parse(value as string) as T;
      } catch {
        return null;
      }
    }
    return value as unknown as T;
  }
}

export class LocalStorageValue<T> extends StorageValue<T> {
  protected storage: Storage = localStorage;
}

export class SessionStorageValue<T> extends StorageValue<T> {
  protected storage: Storage = sessionStorage;
}

function storageValue<T>(storageValue: StorageValue<T>): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string | symbol) => {
    Object.defineProperty(target, propertyKey, {
      value: storageValue,
      writable: false,
      configurable: false
    })
  }
}

export function localStorageValue<T>(key: string, stringify?: boolean): PropertyDecorator {
  return storageValue<T>(new LocalStorageValue(key, stringify))
}

export function sessionStorageValue<T>(key: string, stringify?: boolean): PropertyDecorator {
  return storageValue<T>(new SessionStorageValue(key, stringify))
}

