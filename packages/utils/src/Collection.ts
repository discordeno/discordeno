export interface PlaceHolderBot {}

export class Collection<K, V> extends Map<K, V> {
  /**
   * The maximum amount of items allowed in this collection. To disable cache, set it 0, set to undefined to make it infinite.
   * @default undefined
   */
  maxSize: number | undefined
  /** Handler to remove items from the collection every so often. */
  sweeper: (CollectionSweeper<K, V> & { intervalId?: NodeJS.Timeout }) | undefined

  constructor(entries?: (ReadonlyArray<readonly [K, V]> | null) | Map<K, V>, options?: CollectionOptions<K, V>) {
    super(entries ?? [])

    this.maxSize = options?.maxSize

    if (!options?.sweeper) return

    this.startSweeper(options.sweeper)
  }

  startSweeper(options: CollectionSweeper<K, V>): NodeJS.Timeout {
    if (this.sweeper?.intervalId) clearInterval(this.sweeper.intervalId)

    this.sweeper = options
    this.sweeper.intervalId = setInterval(() => {
      this.forEach((value, key) => {
        if (!this.sweeper?.filter(value, key, options.bot)) return

        this.delete(key)
        return key
      })
    }, options.interval)

    return this.sweeper.intervalId
  }

  stopSweeper(): void {
    return clearInterval(this.sweeper?.intervalId)
  }

  changeSweeperInterval(newInterval: number): void {
    if (this.sweeper == null) return

    this.startSweeper({ filter: this.sweeper.filter, interval: newInterval })
  }

  changeSweeperFilter(newFilter: (value: V, key: K, bot: PlaceHolderBot) => boolean): void {
    if (this.sweeper == null) return

    this.startSweeper({ filter: newFilter, interval: this.sweeper.interval })
  }

  /** Add an item to the collection. Makes sure not to go above the maxSize. */
  set(key: K, value: V): this {
    // When this collection is maxSized make sure we can add first
    if ((this.maxSize !== undefined || this.maxSize === 0) && this.size >= this.maxSize) {
      return this
    }

    return super.set(key, value)
  }

  /** Add an item to the collection, no matter what the maxSize is. */
  forceSet(key: K, value: V): this {
    return super.set(key, value)
  }

  /** Convert the collection to an array. */
  array(): V[] {
    return [...this.values()]
  }

  /** Retrieve the value of the first element in this collection. */
  first(): V | undefined {
    return this.values().next().value
  }

  /** Retrieve the value of the last element in this collection. */
  last(): V | undefined {
    return [...this.values()][this.size - 1]
  }

  /** Retrieve the value of a random element in this collection. */
  random(): V | undefined {
    const array = [...this.values()]
    return array[Math.floor(Math.random() * array.length)]
  }

  /** Find a specific element in this collection. */
  find(callback: (value: V, key: K) => boolean): NonNullable<V> | undefined {
    for (const key of this.keys()) {
      const value = this.get(key)!
      if (callback(value, key)) return value
    }
    // If nothing matched
  }

  /** Find all elements in this collection that match the given pattern. */
  filter(callback: (value: V, key: K) => boolean): Collection<K, V> {
    const relevant = new Collection<K, V>()
    this.forEach((value, key) => {
      if (callback(value, key)) relevant.set(key, value)
    })

    return relevant
  }

  /** Converts the collection into an array by running a callback on all items in the collection. */
  map<T>(callback: (value: V, key: K) => T): T[] {
    const results = []
    for (const key of this.keys()) {
      const value = this.get(key)!
      results.push(callback(value, key))
    }
    return results
  }

  /** Check if one of the items in the collection matches the pattern. */
  some(callback: (value: V, key: K) => boolean): boolean {
    for (const key of this.keys()) {
      const value = this.get(key)!
      if (callback(value, key)) return true
    }

    return false
  }

  /** Check if all of the items in the collection matches the pattern. */
  every(callback: (value: V, key: K) => boolean): boolean {
    for (const key of this.keys()) {
      const value = this.get(key)!
      if (!callback(value, key)) return false
    }

    return true
  }

  /** Runs a callback on all items in the collection, merging them into a single value. */
  reduce<T>(callback: (accumulator: T, value: V, key: K) => T, initialValue?: T): T {
    let accumulator: T = initialValue!

    for (const key of this.keys()) {
      const value = this.get(key)!
      accumulator = callback(accumulator, value, key)
    }

    return accumulator
  }
}

export interface CollectionOptions<K, V> {
  /** Handler to clean out the items in the collection every so often. */
  sweeper?: CollectionSweeper<K, V>
  /** The maximum number of items allowed in the collection. */
  maxSize?: number
}

export interface CollectionSweeper<K, V> {
  /** The filter to determine whether an element should be deleted or not */
  filter: (value: V, key: K, ...args: any[]) => boolean
  /** The interval in which the sweeper should run */
  interval: number
  /** The bot object itself */
  bot?: PlaceHolderBot
}
