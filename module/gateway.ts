import {
    connectWebSocket,
    isWebSocketCloseEvent,
    isWebSocketPingEvent,
    isWebSocketPongEvent,
    WebSocket
  } from "https://deno.land/std/ws/mod.ts";
import { GatewayOpcode, Status } from "../types/discord.ts";
import { FulfilledClientOptions } from "../types/options.ts";
import { delay } from 'https://deno.land/std/util/async.ts';

export default class Gateway {
    constructor (public socket: WebSocket) {}

    identify (options: FulfilledClientOptions) {
        return this.sendObject({
            op: GatewayOpcode.Identify,
            d: {
                token: options.token,
                // TOOD: Let's get compression working, eh?
                compress: false,
                properties: options.properties
            }
        });
    }

    sendHeartbeat (previousSequenceNumber: number | null = null) {
        return this.sendObject({
            op: GatewayOpcode.Heartbeat,
            d: previousSequenceNumber
        });
    }

    updateStatus (status: Status) {
        this.sendObject({
            op: GatewayOpcode.StatusUpdate,
            d: status
        });
    }

    async sendConstantHeartbeats (interval: number, previousSequenceNumber: number | null = null, shouldContinue: () => boolean = () => true): Promise<void> {
        await delay(interval);

        if (!shouldContinue()) {
            return;
        }

        // TODO: If the initial seq num is null, this will make it forever null until a restart. Is this good?
        this.sendHeartbeat(previousSequenceNumber === null ? previousSequenceNumber : previousSequenceNumber++);
        return this.sendConstantHeartbeats(interval, previousSequenceNumber);
    }

    sendObject (object: object) {
        return this.socket.send(JSON.stringify(object));
    }
}