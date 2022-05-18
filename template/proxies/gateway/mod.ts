import { serve } from "https://deno.land/std@0.139.0/http/server.ts";
import { startProxy } from "./src/startProxy.ts";
import { config as dotenv } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

dotenv({ export: true, path: `${Deno.cwd()}/.env` });

// Start a server/listener
serve((req: Request) => {
  console.log("req");
  // Make it a websocket server
  const { socket, response } = Deno.upgradeWebSocket(req);
  // handle the request
  handleSocket(socket);
  // return the response object
  return response;
});

function handleSocket(socket: WebSocket) {
  socket.onopen = (e) => {
    console.log("WebSocket open");
    if (!Deno.env.get("DISCORD_TOKEN")) throw new Error("Missing token in .env file");
    
    const gateway = startProxy({
      token: Deno.env.get("DISCORD_TOKEN")!,
      handleDiscordPayload: function (...a) {
        console.log("hdp", ...a);
      },
      debug: console.log,
    });
  };

  socket.onmessage = console.log;
}
