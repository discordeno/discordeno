/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import { EventEmitter } from 'node:events'

class BrowserWebSocketError extends Error {
  static CONNECTING: 0 = 0
  static OPEN: 1
  static CLOSING: 2
  static CLOSED: 3

  readyState: number = 0
  event: Event

  constructor(message: string | undefined, event: Event) {
    super(message)

    this.event = event
  }
}

/**
 * Represents a browser's websocket usable by Eris
 * @extends EventEmitter
 * @prop {String} url The URL to connect to
 */
class BrowserWebSocket extends EventEmitter {
  _ws: WebSocket

  constructor(url: string) {
    super()

    if (typeof window === 'undefined') {
      throw new Error('BrowserWebSocket cannot be used outside of a browser environment')
    }

    this._ws = new window.WebSocket(url)
    this._ws.onopen = () => this.emit('open')
    this._ws.onmessage = this._onMessage.bind(this)
    this._ws.onerror = (event) => this.emit('error', new BrowserWebSocketError('Unknown error', event))
    this._ws.onclose = (event) => this.emit('close', event.code, event.reason)
  }

  get readyState() {
    return this._ws.readyState
  }

  static get CONNECTING() {
    return 0
  }

  static set CONNECTING(state: number) {
    BrowserWebSocket.CONNECTING = state
  }

  static get OPEN() {
    return 1
  }

  static set OPEN(state: number) {
    BrowserWebSocket.OPEN = state
  }

  static get CLOSING() {
    return 2
  }

  static set CLOSING(state: number) {
    BrowserWebSocket.CLOSING = state
  }

  static get CLOSED() {
    return 3
  }

  static set CLOSED(state: number) {
    BrowserWebSocket.CLOSED = state
  }

  close(code?: number, reason?: string) {
    return this._ws.close(code, reason)
  }

  removeEventListener(type: string | symbol, listener: (...args: any[]) => void): this {
    return this.removeListener(type, listener)
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    return this._ws.send(data)
  }

  terminate() {
    return this._ws.close()
  }

  async _onMessage(event: MessageEvent<any>) {
    if (event.data instanceof window.Blob) {
      this.emit('message', await event.data.arrayBuffer())
    } else {
      this.emit('message', event.data)
    }
  }
}

export default BrowserWebSocket
