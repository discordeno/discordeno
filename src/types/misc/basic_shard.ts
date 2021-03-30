export interface BasicShard {
  id: number;
  ws: WebSocket;
  resumeInterval: number;
  sessionID: string;
  previousSequenceNumber: number | null;
  needToResume: boolean;
  ready: boolean;
  unavailableGuildIDs: Set<string>;
}
