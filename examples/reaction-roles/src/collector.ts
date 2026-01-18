import { EventEmitter } from 'node:events';

// Extremely minimal collector class
export default class ItemCollector<T> extends EventEmitter {
  onItem(callback: (item: T) => unknown): void {
    this.on('item', callback);
  }

  collect(item: T): void {
    this.emit('item', item);
  }
}
