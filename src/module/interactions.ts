import { serveTLS } from "https://deno.land/std@0.80.0/http/server.ts";

// THE CURRENT IMPLEMENTATION SUCKS IT WILL ALLOW BOT FARMS! LETS DO THIS SOME OTHER WAY ONLY ALLOWING 1 BOT PER PROCESS

// TODO: https://github.com/discord/discord-api-docs/pull/2295/files#diff-07978ef9d619062fb1afbb70ea065124531246743444f4354cc9e6c8879f8780R256

// 1. Your endpoint must be prepared to ACK a `PING` message
// 2. Your endpoint must be set up to properly handle signature headers--more on that in [Security and Authorization]

/**
 * USING THIS DISABLES THE WEBSOCKET GATEWAY INTERACTIONS EVENTS!!!
 * 
 * In your application in the Developer Portal, there is a field on the main page called "Interactions Endpoint URL".
 * If you want to receive Interactions via outgoing webhook, you can set your URL in this field.
 * 
 */
export async function startServer(options: StartServerOptions) {
    // const body = "Hello HTTPS";

    for await (const req of serveTLS(options)) {
        console.log('req received');
        // req.respond({ body });
    }
}

export interface StartServerOptions {
    /** The hostname */
    hostname: string;
    /** The port number */
    port: number;
    /** Certification path */
    certFilePath: string;
    /** Key file path */
    keyFilePath: string;
}

export enum InteractionResponseType {
    /** ACK a `Ping` */
    PONG = 1,
    /** ACK a command without sending a message, eating the user's input */
    ACKNOWLEDGE,
    /** respond with a message, eating the user's input */
    CHANNEL_MESSAGE,
    /** respond with a message, showing the user's input */
    CHANNEL_MESSAGE_WITH_SOURCE,
    /** ACK a command without sending a message, showing the user's input */
    ACK_WITH_SOURCE,
  }