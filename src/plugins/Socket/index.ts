import _Vue from 'vue'

import './vue'

interface SocketOptions {
  host: string;
  port: number;

  open?: ((this: WebSocket, ev: Event) => void) | null;
  close?: ((this: WebSocket, ev: CloseEvent) => void) | null;
  error?: ((this: WebSocket, ev: Event) => void) | null;
  message: ((this: WebSocket, ev: MessageEvent) => void) | null;
}

let webSocket: WebSocket

export class Socket {
  constructor (options: SocketOptions) {
    webSocket = new WebSocket(`ws:\\\\${options.host}:${options.port}`)

    if (options.open) { webSocket.onopen = options.open }
    if (options.close) { webSocket.onclose = options.close }
    if (options.error) { webSocket.onerror = options.error }
    webSocket.onmessage = options.message
  }

  // eslint-disable-next-line
  send (message: string | object | Array<any> | ArrayBufferLike | Blob | ArrayBufferView) {
    if (webSocket.readyState === webSocket.OPEN) {
      if (message instanceof Object || Array.isArray(message)) {
        message = JSON.stringify(message)
      }
      webSocket.send(message)
    }
  }

  reconnect (): void {
    const ws = webSocket
    if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
      webSocket.close()
    }
    const tmp = new WebSocket(webSocket.url)
    tmp.onopen = webSocket.onopen
    tmp.onclose = webSocket.onclose
    tmp.onerror = webSocket.onerror
    tmp.onmessage = webSocket.onmessage
    webSocket = tmp
  }
}

// eslint-disable-next-line
function install (Vue: typeof _Vue, options?: any): void {
  // Vue.$socket = Socket
}

const _default = {
  Socket,
  install
}

export default _default
