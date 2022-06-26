export class Collection<K, V> extends Map<K, V> {
  limit: number | undefined;

  set(key: K, value: V) {
    // When this collection is limitd make sure we can add first
    if ((this.limit || this.limit === 0) && this.size >= this.limit) {
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

  filter(callback: (value: V, key: K) => boolean): V[] {
    const relevant = new Collection<K, V>();
    this.forEach((value, key) => {
      if (callback(value, key)) relevant.set(key, value);
    });

    return relevant.array();
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

  /**
   * Adds a object to the collection.
   * @deprecated Recommend using Collection.set(). Keeping for the sake of Eris API.
   * @deprecated extra parameter. No longer used, keeping for sake of Eris API.
   */
  add(obj: V & { id: K }, extra?: unknown, replace?: boolean): V {
    if (this.limit === 0) return obj;

    const existing = this.get(obj.id);
    if (existing && !replace) {
      return existing;
    }

    this.set(obj.id, obj);
    return obj;
  }

  remove(obj: V & { id: K }): V | undefined {
    const item = this.get(obj.id);
    if (!item) return;

    this.delete(obj.id);
    return item;
  }

  update(obj: V & { id: K }, extra?: unknown, replace?: boolean): V {
    const item = this.get(obj.id);
    if (!item) {
      return this.add(obj, extra, replace);
    }

    // @ts-ignore some eris magic at play here
    item.update?.(obj, extra);
    return item;
  }
}
