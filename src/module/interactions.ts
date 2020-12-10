import { serveTLS } from "https://deno.land/std@0.80.0/http/server.ts";

// TODO: https://github.com/discord/discord-api-docs/pull/2295/files#diff-07978ef9d619062fb1afbb70ea065124531246743444f4354cc9e6c8879f8780R256

// 1. Your endpoint must be prepared to ACK a `PING` message
// 2. Your endpoint must be set up to properly handle signature headers--more on that in [Security and Authorization]

const serverOptions = {
  hostname: "localhost",
  // Made of our favorite numbers for the default port
  port: 0704,
};

/**
 * ⚠️ USING THIS DISABLES THE WEBSOCKET GATEWAY INTERACTIONS EVENTS!!!
 * 
 * In your application in the Developer Portal, there is a field on the main page called "Interactions Endpoint URL".
 * If you want to receive Interactions via outgoing webhook, you can set your URL in this field.
 * 
 */
export async function startServer(options: StartServerOptions) {
  serverOptions.hostname = options.hostname;
  serverOptions.port = options.port;

  createApplicationServer(options);
}

function createApplicationServer(options: StartServerOptions) {
  for await (const req of serveTLS({ ...options, ...serverOptions })) {
    console.log("req received");
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
