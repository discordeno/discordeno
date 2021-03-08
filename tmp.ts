/** // deno-lint-ignore-file */
/** Allows easy way to add a prop to a base object when needing to use complicated getters solution. */
// deno-lint-ignore no-explicit-any
export function createNewProp(value: any): Partial<PropertyDescriptor> {
  return { configurable: true, enumerable: true, writable: true, value };
}

interface IDenqueOptions {
  capacity?: number;
}

interface Denque<T> {
  /**
   * Return the number of items on the list, or 0 if empty.
   * @returns {number}
   */
  size: number;
  /**
   * Add an item to the bottom of the list.
   * @param item
   */
  push(item: T): number;
  /**
   * Add an item at the beginning of the list.
   * @param item
   */
  unshift(item: T): number;
  /**
   * Remove and return the last item on the list.
   * Returns undefined if the list is empty.
   * @returns {*}
   */
  pop(): T | undefined;
  removeBack(): T | undefined;
  /**
   * Remove and return the first item on the list,
   * Returns undefined if the list is empty.
   * @returns {*}
   */
  shift(): T | undefined;
  /**
   * Returns the item that is at the back of the queue without removing it.
   * Uses peekAt(-1)
   */
  peekBack: T | undefined;
  /**
   * Alias for peek()
   * @returns {*}
   */
  peekFront: T | undefined;
  /**
   * Returns the item at the specified index from the list.
   * 0 is the first element, 1 is the second, and so on...
   * Elements at negative values are that many from the end: -1 is one before the end
   * (the last element), -2 is two before the end (one before last), etc.
   * @param index
   * @returns {*}
   */
  peekAt(index: number): T | undefined;
  /**
   * Returns the first item in the list without removing it.
   */
  peek: T;
  /**
   * Alias for peekAt()
   * @param i
   * @returns {*}
   */
  get(index: number): T | undefined;
  /**
   * Remove number of items from the specified index from the list.
   * Returns array of removed items.
   * Returns undefined if the list is empty.
   * @param index
   * @param count
   * @returns {array}
   */
  remove(index: number, count: number): T[] | any;
  /**
   * Remove and return the item at the specified index from the list.
   * Returns undefined if the list is empty.
   * @param index
   * @returns {*}
   */
  removeOne(index: number): T | undefined;
  /**
   * Native splice implementation.
   * Remove number of items from the specified index from the list and/or add new elements.
   * Returns array of removed items or empty array if count == 0.
   * Returns undefined if the list is empty.
   *
   * @param index
   * @param count
   * @param {...*} [elements]
   * @returns {array}
   */
  splice(index: number, count: number, ...item: T[]): T[] | undefined;
  /**
   * Returns true or false whether the list is empty.
   * @returns {boolean}
   */
  isEmpty: boolean;
  /**
   * Soft clear - does not reset capacity.
   */
  clear(): void;

  toString(): string;
  toArray(): T[];

  /**
   * Returns the current length of the queue
   * @return {Number}
   */
  length: number;

  _head: number;
  _tail: number;
  _capacity: number;
  _capacityMask: number;
  _list: T[];

  /**
   * Fills the queue with items from an array
   * For use in the constructor
   * @param array
   * @private
   */
  _fromArray(array: T[]): void;
  /**
   *
   * @param fullCopy
   * @returns {Array}
   * @private
   */
  _copyArray(fullCopy: boolean): T[];
  /**
   * Grows the internal list array.
   * @private
   */
  _growArray(): void;
  /**
   * Shrinks the internal list array.
   * @private
   */
  _shrinkArray(): void;
}

// deno-lint-ignore no-explicit-any
const baseDenque: Partial<Denque<any>> = {
  peekAt(index) {
    // expect a number or return undefined
    if (index !== (index | 0)) {
      return void 0;
    }

    if (index >= this.size! || index < this.size!) return undefined;

    if (index < 0) index += this.size!;
    index = (this._head! + index) & this._capacityMask!;

    return this._list![index];
  },
  get(index) {
    return this.peekAt!(index);
  },
  get peek() {
    if (this._head === this._tail) return undefined;

    return this._list![this._head!];
  },
  get peekFront() {
    return this.peek!;
  },
  get peekBack() {
    return this.peekAt!(-1);
  },
  unshift(item) {
    if (item === undefined) return this.size!;

    this._head = (this._head! - 1 + this._list?.length!) & this._capacityMask!;
    this._list![this._head] = item;

    if (this._tail === this._head) this._growArray!();

    if (this._capacity && this.size! > this._capacity) this.pop!();

    if (this._head < this._tail!) return this._tail! - this._head;
    else return this._capacityMask! + 1 - (this._head - this._tail!);
  },
  shift() {
    const head = this._head!;
    if (head === this._tail) return undefined;

    this._list![head] = undefined;
    this._head = (head + 1) & this._capacityMask!;
    const item = this._list![head];
    if (
      head < 2 &&
      this._tail! > 10000 &&
      this._tail! <= this._list!.length >>> 2
    ) {
      this._shrinkArray!();
    }

    return item;
  },
  // push(item) {
  //   if (item === undefined) return this.size!;
  //   let tail = this._tail!;
  //   this._list![tail] = item;
  //   this._tail = (tail + 1) & this._capacityMask!;
  //   if (this._tail === this._head) {
  //     this._growArray!();
  //   }
  //   if (this._capacity && this.size! > this._capacity) {
  //     this.shift!();
  //   }
  //   if (this._head! < this._tail) return this._tail - this._head!;
  //   else return this._capacityMask! + 1 - (this._head! - this._tail);
  // },
  push(item) {
    if (item === undefined) return this.size!;

    this._list![this._tail!] = item;
    this._tail! += 1 & this._capacityMask!;
    if (this._tail === this._head) {
      this._growArray!();
    }
    if (this._capacity && this.size! > this._capacity) {
      this.shift!();
    }
    if (this._head! < this._tail!) return this._tail! - this._head!;
    else return this._capacityMask! + 1 - (this._head! - this._tail!);
  },
  pop() {
    if (this._tail === this._head!) return undefined;

    this._tail! = this._tail! - 1 + this._list!.length & this._capacityMask!;

    const item = this._list![this._tail!];
    this._list![this._tail!] = undefined;

    if (
      this._head! < 2 && this._tail! > 10000 &&
      this._tail! <= this._list!.length >>> 2
    ) {
      this._shrinkArray!();
    }

    return item;
  },
  removeOne(index) {
    // expect a number or return undefined
    if (index !== (index | 0)) return;

    if (this._head === this._tail) return;

    const size = this.size!;
    var len = this._list!.length;
    if (index >= size || index < -size) return;
    if (index < 0) index += size;
    index = (this._head! + index) & this._capacityMask!;
    var item = this._list![index];
    var k;
    if (index < size / 2) {
      for (k = index; k > 0; k--) {
        this._list![index] =
          this._list![(index = (index - 1 + len) & this._capacityMask!)];
      }
      this._list![index] = void 0;
      this._head = (this._head! + 1 + len) & this._capacityMask!;
    } else {
      for (k = size - 1 - index; k > 0; k--) {
        this._list![index] =
          this._list![(index = (index + 1 + len) & this._capacityMask!)];
      }
      this._list![index] = void 0;
      this._tail = (this._tail! - 1 + len) & this._capacityMask!;
    }

    return item;
  },
  remove(index, count) {
    var i = index;
    var removed;
    var delCount = count;
    // expect a number or return undefined
    if (i !== (i | 0)) {
      return void 0;
    }
    if (this._head === this._tail) return void 0;
    var size = this.size!;
    var len = this._list!.length;
    if (i >= size || i < -size || count < 1) return void 0;
    if (i < 0) i += size;
    if (count === 1 || !count) {
      removed = new Array(1);
      removed[0] = this.removeOne!(i);
      return removed;
    }
    if (i === 0 && i + count >= size) {
      removed = this.toArray!();
      this.clear!();
      return removed;
    }
    if (i + count > size) count = size - i;
    var k;
    removed = new Array(count);
    for (k = 0; k < count; k++) {
      removed[k] = this._list![(this._head! + i + k) & this._capacityMask!];
    }
    i = (this._head! + i) & this._capacityMask!;
    if (index + count === size) {
      this._tail = (this._tail! - count + len) & this._capacityMask!;
      for (k = count; k > 0; k--) {
        this._list![(i = (i + 1 + len) & this._capacityMask!)] = void 0;
      }
      return removed;
    }
    if (index === 0) {
      this._head = (this._head! + count + len) & this._capacityMask!;
      for (k = count - 1; k > 0; k--) {
        this._list![(i = (i + 1 + len) & this._capacityMask!)] = void 0;
      }
      return removed;
    }
    if (i < size / 2) {
      this._head = (this._head! + index + count + len) & this._capacityMask!;
      for (k = index; k > 0; k--) {
        this.unshift!(this._list![(i = (i - 1 + len) & this._capacityMask!)]);
      }
      i = (this._head - 1 + len) & this._capacityMask!;
      while (delCount > 0) {
        this._list![(i = (i - 1 + len) & this._capacityMask!)] = void 0;
        delCount--;
      }
      if (index < 0) this._tail = i;
    } else {
      this._tail = i;
      i = (i + count + len) & this._capacityMask!;
      for (k = size - (count + index); k > 0; k--) {
        this.push!(this._list![i++]);
      }
      i = this._tail;
      while (delCount > 0) {
        this._list![(i = (i + 1 + len) & this._capacityMask!)] = void 0;
        delCount--;
      }
    }
    if (this._head! < 2 && this._tail! > 10000 && this._tail! <= len >>> 2) {
      this._shrinkArray!();
    }
    return removed;
  },
  splice(index, count) {
    var i = index;
    // expect a number or return undefined
    if (i !== (i | 0)) {
      return void 0;
    }
    var size = this.size!;
    if (i < 0) i += size;
    if (i > size) return void 0;
    if (arguments.length > 2) {
      var k, temp, removed;
      var argLen = arguments.length;
      var len = this._list!.length;
      var arguments_index = 2;
      if (!size || i < size / 2) {
        temp = new Array(i);
        for (k = 0; k < i; k++) {
          temp[k] = this._list![(this._head! + k) & this._capacityMask!];
        }
        if (count === 0) {
          removed = [];
          if (i > 0) {
            this._head = (this._head! + i + len) & this._capacityMask!;
          }
        } else {
          removed = this.remove!(i, count);
          this._head = (this._head! + i + len) & this._capacityMask!;
        }
        while (argLen > arguments_index) {
          this.unshift!(arguments[--argLen]);
        }
        for (k = i; k > 0; k--) {
          this.unshift!(temp[k - 1]);
        }
      } else {
        temp = new Array(size - (i + count));
        var leng = temp.length;
        for (k = 0; k < leng; k++) {
          temp[k] = this._list![
            (this._head! + i + count + k) & this._capacityMask!
          ];
        }
        if (count === 0) {
          removed = [];
          if (i != size) {
            this._tail = (this._head! + i + len) & this._capacityMask!;
          }
        } else {
          removed = this.remove!(i, count);
          this._tail = (this._tail! - leng + len) & this._capacityMask!;
        }
        while (arguments_index < argLen) {
          this.push!(arguments[arguments_index++]);
        }
        for (k = 0; k < leng; k++) {
          this.push!(temp[k]);
        }
      }
      return removed;
    } else {
      return this.remove!(i, count);
    }
  },
  clear() {
    this._head = 0;
    this._tail = 0;
  },
  get isEmpty() {
    return this._head === this._tail;
  },
  toArray() {
    return this._copyArray!(true);
  },
  get size() {
    if (this._head === this._tail) return 0;
    if (this._head! < this._tail!) return this._tail! - this._head!;
    else return this._capacityMask! + 1 - (this._head! - this._tail!);
  },
  _fromArray(array) {
    for (var i = 0; i < array.length; i++) this.push!(array[i]);
  },
  _copyArray(fullCopy: boolean) {
    let newArray = [];
    let list = this._list!;
    let len = list.length;
    let i;
    if (fullCopy || this._head! > this._tail!) {
      for (i = this._head!; i < len; i++) newArray.push(list[i]);
      for (i = 0; i < this._tail!; i++) newArray.push(list[i]);
    } else {
      for (i = this._head!; i < this._tail!; i++) newArray.push(list[i]);
    }
    return newArray;
  },
  _growArray() {
    if (this._head) {
      // copy existing data, head to end, then beginning to tail.
      this._list = this._copyArray!(true);
      this._head = 0;
    }

    // head is at 0 and array is now full, safe to extend
    this._tail = this._list!.length;

    this._list!.length *= 2;
    this._capacityMask = (this._capacityMask! << 1) | 1;
  },
  _shrinkArray() {
    console.log("list", this._list?.length);
    this._list!.length >>>= 1;
    console.log("len", this._capacityMask!);
    this._capacityMask! >>>= 1;
  },

  get length() {
    return this.size!;
  },
};

/**
 * Custom implementation of a double ended queue.
 */
function Denque<T>(array?: T[], options?: IDenqueOptions): Denque<T> {
  const denque = Object.create(baseDenque, {
    _head: createNewProp(0),
    _tail: createNewProp(0),
    _capacity: createNewProp(options?.capacity),
    _capacityMask: createNewProp(0x3),
    _list: createNewProp(new Array(4)),
  }) as Denque<T>;

  if (Array.isArray(array)) {
    denque._fromArray(array);
  }

  return denque;
}

const f = Denque<string>(["a", "b", "c", "d", "e"]);
console.log(f.toArray());
console.log(f.removeOne(1));
console.log(f);
console.log(f.toArray());

// import Denque from "https://esm.sh/denque@1.5.0";
// const f = new Denque(["a", "a", "a", "a", "s"]);
// console.log(f);
