import { serve, verify } from "./deps.ts";
import {
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  InteractionType,
} from "./types/mod.ts";

/** This variable is a holder for the public key */
const serverOptions = {
  slashHexKey: "",
  port: 80,
};

/** Theses are the controllers that you can plug into and customize to your needs. */
export const controllers = {
  handlePayload,
  handleApplicationCommand,
};

export interface StartServerOptions {
  /** The public key from your discord bot dashboard at discord.dev */
  publicKey: string;
  /** The port number you are wanting to listen to, if you are following the guide, you probably want 80 */
  port: number;
  /** The function you would like to provide to handle your commands. */
  handleApplicationCommand?(
    payload: Interaction,
  ): Promise<{ status?: number; body: InteractionResponse }>;
}

/** Starts the slash command server */
export function startServer(options: StartServerOptions) {
  serverOptions.slashHexKey = options.publicKey;
  serverOptions.port = options.port;
  if (options.handleApplicationCommand) {
    controllers.handleApplicationCommand = options.handleApplicationCommand;
  }

  createServer();
}

async function createServer() {
  const server = serve({ port: serverOptions.port });
  console.log(
    `Listening to requests at http://localhost:${serverOptions.port}/`,
  );

  for await (const req of server) {
    const buffer = await Deno.readAll(req.body);
    const signature = req.headers.get("X-Signature-Ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");

    const verified = verifySecurity(buffer, signature!, timestamp!);
    if (!verified) {
      req.respond({ status: 401, body: "invalid request signature" });
      continue;
    }

    try {
      const data = JSON.parse(new TextDecoder().decode(buffer));
      const response = await controllers.handlePayload(data);
      req.respond(
        { status: response.status || 200, body: JSON.stringify(response.body) },
      );
    } catch (error) {
      console.error(error);
    }
  }
}

async function handlePayload(payload: Interaction) {
  switch (payload.type) {
    case InteractionType.PING:
      return { status: 200, body: { type: InteractionResponseType.PONG } };
    default: // APPLICATION_COMMAND
      return controllers.handleApplicationCommand(payload);
  }
}

/** The function that handles your commands. This command can be overriden by you and you can receive the payload and handle accordingly and respond back. The status if not provided will default to 200. */
async function handleApplicationCommand(
  payload: Interaction,
): Promise<{ status?: number; body: InteractionResponse }> {
  // Handle the command
  if (payload.data?.name === "ping") {
    return {
      status: 200,
      body: {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "Pong! Discordeno best lib!" },
      },
    };
  }

  return {
    status: 200,
    body: {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          "Whoopsies! Seems the handling for this command is missing. Please contact my developers!",
      },
    },
  };
}

/** Internal function to verify security. Discord will send bad and good data and this function is important to verify it. If it is not verified properly, Discord will kill your bot. */
function verifySecurity(buffer: Uint8Array, signature: string, time: string) {
  const sig = new Uint8Array(64);
  const timestamp = new TextEncoder().encode(time);

  let offset = 0;
  const message = new Uint8Array(buffer.length + timestamp.length);
  while (offset < 2 * 64) {
    sig[offset / 2] = parseInt(signature!.substring(offset, offset += 2), 16);
  }

  const slash_key = new Uint8Array(32);

  let keyoffset = 0;
  while (keyoffset < 2 * 32) {
    slash_key[keyoffset / 2] = parseInt(
      serverOptions.slashHexKey.substring(keyoffset, keyoffset += 2),
      16,
    );
  }

  message.set(timestamp);
  message.set(buffer, timestamp.length);

  return verify(slash_key, sig, message);
}

// TODO: delete when deploying
startServer(
    {
      publicKey:
        "bc1b035c61c1a46b0dd8e26b1de2c2a7bd795621e59c5e2170a08937d836546f",
      port: 80,
    },
  );
  