export class Collection<K, V> extends Map<K, V> {
  maxSize: number | undefined;

  constructor(entries?: (readonly (readonly [K, V])[] | null) | Map<K, V>, options?: CollectionOptions<K, V>) {
    super(entries ?? []);

    this.maxSize = options?.maxSize;
  }

  set(key: K, value: V) {
    // When this collection is maxSized make sure we can add first
    if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
      return this;
    }

    return super.set(key, value);
  }

  forceSet(key: K, value: V) {
    return super.set(key, value);
  }

  array() {
    return [...this.values()];
  }

  /** Retrieve the value of the first element in this collection */
  first(): V | undefined {
    return this.values().next().value;
  }

  last(): V | undefined {
    return [...this.values()][this.size - 1];
  }

  random(): V | undefined {
    const array = [...this.values()];
    return array[Math.floor(Math.random() * array.length)];
  }

  find(callback: (value: V, key: K) => boolean) {
    for (const key of this.keys()) {
      const value = this.get(key)!;
      if (callback(value, key)) return value;
    }
    // If nothing matched
    return;
  }

  filter(callback: (value: V, key: K) => boolean) {
    const relevant = new Collection<K, V>();
    this.forEach((value, key) => {
      if (callback(value, key)) relevant.set(key, value);
    });

    return relevant;
  }

  map<T>(callback: (value: V, key: K) => T) {
    const results = [];
    for (const key of this.keys()) {
      const value = this.get(key)!;
      results.push(callback(value, key));
    }
    return results;
  }

  some(callback: (value: V, key: K) => boolean) {
    for (const key of this.keys()) {
      const value = this.get(key)!;
      if (callback(value, key)) return true;
    }

    return false;
  }

  every(callback: (value: V, key: K) => boolean) {
    for (const key of this.keys()) {
      const value = this.get(key)!;
      if (!callback(value, key)) return false;
    }

    return true;
  }

  reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue?: T): T {
    let accumulator: T = initialValue!;

    for (const key of this.keys()) {
      const value = this.get(key)!;
      accumulator = callback(accumulator, value, key);
    }

    return accumulator;
  }
}

export interface CollectionOptions<K, V> {
  maxSize?: number;
}
