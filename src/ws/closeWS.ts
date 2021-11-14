/** Use this function to close a ws connection properly */
export function closeWS(ws: WebSocket, code?: number, reason?: string) {
  if (ws.readyState !== WebSocket.OPEN) return;

  ws.close(code, reason);
}
