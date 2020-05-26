class Collection<K, V> extends Map<K, V> {
  private _array!: V[] | null;
  public static readonly default: typeof Collection = Collection;
  public ["constructor"]: typeof Collection;

  public constructor(entries?: ReadonlyArray<readonly [K, V]> | null) {
    super(entries);

    Object.defineProperty(
      this,
      "_array",
      { value: null, writable: true, configurable: true },
    );

    Object.defineProperty(
      this,
      "_keyArray",
      { value: null, writable: true, configurable: true },
    );
  }

  public get(key: K): V | undefined {
    return super.get(key);
  }

  public set(key: K, value: V): this {
    this._array = null;
    return super.set(key, value);
  }

  public has(key: K): boolean {
    return super.has(key);
  }

  public delete(key: K): boolean {
    this._array = null;
    return super.delete(key);
  }

  public clear(): void {
    return super.clear();
  }

  public array(): V[] {
    if (!this._array || this._array.length !== this.size) {
      this._array = [...this.values()];
    }
    return this._array;
  }

  public first(): V | undefined;
  public first(amount: number): V[];
  public first(amount?: number): V | V[] | undefined {
    if (typeof amount === "undefined") return this.values().next().value;
    if (amount < 0) return this.last(amount * -1);
    amount = Math.min(this.size, amount);
    const iter = this.values();
    return Array.from({ length: amount }, (): V => iter.next().value);
  }

  public last(): V | undefined;
  public last(amount: number): V[];
  public last(amount?: number): V | V[] | undefined {
    const arr = this.array();
    if (typeof amount === "undefined") return arr[arr.length - 1];
    if (amount < 0) return this.first(amount * -1);
    if (!amount) return [];
    return arr.slice(-amount);
  }

  public random(): V;
  public random(amount: number): V[];
  public random(amount?: number): V | V[] {
    let arr = this.array();
    if (
      typeof amount === "undefined"
    ) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    if (arr.length === 0 || !amount) return [];
    arr = arr.slice();
    return Array.from(
      { length: amount },
      (): V => arr.splice(Math.floor(Math.random() * arr.length), 1)[0],
    );
  }

  public find(
    fn: (value: V, key: K, collection: this) => boolean,
  ): V | undefined;
  public find<T>(
    fn: (this: T, value: V, key: K, collection: this) => boolean,
    thisArg: T,
  ): V | undefined;
  public find(
    fn: (value: V, key: K, collection: this) => boolean,
    thisArg?: unknown,
  ): V | undefined {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this)) return val;
    }
    return undefined;
  }

  public filter(fn: (value: V, key: K, collection: this) => boolean): this;
  public filter<T>(
    fn: (this: T, value: V, key: K, collection: this) => boolean,
    thisArg: T,
  ): this;
  public filter(
    fn: (value: V, key: K, collection: this) => boolean,
    thisArg?: unknown,
  ): this {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    const results = new this.constructor[Symbol.species]<K, V>() as this;
    for (const [key, val] of this) {
      if (fn(val, key, this)) results.set(key, val);
    }
    return results;
  }

  public map<T>(fn: (value: V, key: K, collection: this) => T): T[];
  public map<This, T>(
    fn: (this: This, value: V, key: K, collection: this) => T,
    thisArg: This,
  ): T[];
  public map<T>(
    fn: (value: V, key: K, collection: this) => T,
    thisArg?: unknown,
  ): T[] {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    const iter = this.entries();
    return Array.from({ length: this.size }, (): T => {
      const [key, value] = iter.next().value;
      return fn(value, key, this);
    });
  }

  public some(fn: (value: V, key: K, collection: this) => boolean): boolean;
  public some<T>(
    fn: (this: T, value: V, key: K, collection: this) => boolean,
    thisArg: T,
  ): boolean;
  public some(
    fn: (value: V, key: K, collection: this) => boolean,
    thisArg?: unknown,
  ): boolean {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (fn(val, key, this)) return true;
    }
    return false;
  }

  public every(fn: (value: V, key: K, collection: this) => boolean): boolean;
  public every<T>(
    fn: (this: T, value: V, key: K, collection: this) => boolean,
    thisArg: T,
  ): boolean;
  public every(
    fn: (value: V, key: K, collection: this) => boolean,
    thisArg?: unknown,
  ): boolean {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    for (const [key, val] of this) {
      if (!fn(val, key, this)) return false;
    }
    return true;
  }

  public reduce<T>(
    fn: (accumulator: T, value: V, key: K, collection: this) => T,
    initialValue?: T,
  ): T {
    let accumulator!: T;

    if (typeof initialValue !== "undefined") {
      accumulator = initialValue;
      for (const [key, val] of this) {
        accumulator = fn(accumulator, val, key, this);
      }
      return accumulator;
    }
    let first = true;
    for (const [key, val] of this) {
      if (first) {
        accumulator = val as unknown as T;
        first = false;
        continue;
      }
      accumulator = fn(accumulator, val, key, this);
    }

    // No items iterated.
    if (first) {
      throw new TypeError("Reduce of empty collection with no initial value");
    }

    return accumulator;
  }

  public each(fn: (value: V, key: K, collection: this) => void): this;
  public each<T>(
    fn: (this: T, value: V, key: K, collection: this) => void,
    thisArg: T,
  ): this;
  public each(
    fn: (value: V, key: K, collection: this) => void,
    thisArg?: unknown,
  ): this {
    this.forEach(fn as (value: V, key: K, map: Map<K, V>) => void, thisArg);
    return this;
  }

  public sort(
    compareFunction: (
      firstValue: V,
      secondValue: V,
      firstKey: K,
      secondKey: K,
    ) => number = (x, y): number => Number(x > y) || Number(x === y) - 1,
  ): this {
    const entries = [...this.entries()];
    entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));

    // Perform clean-up
    super.clear();
    this._array = null;

    // Set the new entries
    for (const [k, v] of entries) {
      super.set(k, v);
    }
    return this;
  }
}

export default Collection;
