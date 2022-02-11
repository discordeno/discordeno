---
sidebar_position: 2
sidebar_label: Step 1 - REST
---

# Creating A Standalone REST Process

The first thing we want to make is our standalone REST process. This process will be used by almost every other process,
so it is going to be the foundation of the bot.

Before, we dive into how, here is a quick summary of why you will want a standalone REST process.

## Why Use Standalone REST Process?

- Easily host on any serverless infrastructure.
- Freedom from global rate limit errors
  - As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly
    handle it properly so this allows 1 rest handler across the entire bot.
  - In fact, you can host multiple instances of your bot and all connect to the same rest server.
- REST does not rest!
  - Separate rest means if your bot for whatever reason crashes, your requests that are queued will still keep going and
    will not be lost.
  - Seamless updates! When you want to update and reboot the bot, you could potentially lose tons of messages or
    responses that are in queue. Using this you could restart your bot without ever worrying about losing any responses.
- Single source of contact to Discord API
  - This will allow you to make requests to discord from anywhere including a bot dashboard. You no longer need to have
    to communicate to your bot processes just to make a request or anything. Free up your bot process for processing bot
    events.
- Scalability! Scalability! Scalability!

## Preparations

Before going further, you should have already made the following pieces:

- rest/mod.ts
- deps.ts (Make sure to import discordeno)
- configs.ts
- Deno extension(if you are using deno, this is required)
- TabNine extension to make your life so much better. (Optional)

## Creating Rest Manager

Now let's open up that rest file and start coding.

```ts
import { DISCORD_TOKEN, REST_AUTHORIZATION, REST_PORT } from "../../configs.ts";
import { BASE_URL, createRestManager } from "../../deps.ts";

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
});
```

- `createRestManager` is imported from your deps file which should have exported everything from discordeno.
- `DISCORD_TOKEN` is the bots token itself.
- `REST_AUTHORIZATION` is a special password you want to use to authenticate that requests being sent to your port are
  indeed from you.
- `customUrl` the url where this rest process will be running. This can be localhost which we are using in this guide if
  you want all processes on same VPS or separate them to different servers for horizontal scaling. `REST_PORT` is just
  the port where you want the process hosted.

Now you have an entire Rest manager ready and waiting. Only thing you need now, is to listen for requests.

## Creating HTTP Listener

Since this is not a beginner guide, I am assuming you know already how to create a HTTP listener. There are enough
guides on this out there. I will only cover the rough functionality.

```ts
// START LISTENING TO THE URL(localhost)
const server = Deno.listen({ port: REST_PORT });
console.info(
  `HTTP webserver running.  Access it at:  http://localhost:${REST_PORT}/`,
);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  handleRequest(conn);
}

async function handleRequest(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    if (
      !REST_AUTHORIZATION ||
      REST_AUTHORIZATION !== requestEvent.request.headers.get("AUTHORIZATION")
    ) {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: "Invalid authorization key." }), {
          status: 401,
        }),
      );
    }

    const json = (await requestEvent.request.json()) as any;

    // IMPLEMENT ANY ERROR HANDLING HERE IF YOU WOULD LIKE BY WRAPPING THIS IN A CATCH

    // MAKE THE REQUEST TO DISCORD
    const result = await rest.runMethod(
      rest,
      // USE THE SAME METHOD THAT CAME IN. IF DELETE CAME IN WE SEND DELETE OUT
      requestEvent.request.method as any,
      // OVERWRITE THE CUSTOM URL WITH DISCORDS BASE URL
      `${BASE_URL}/v${rest.version}${
        requestEvent.request.url.substring(
          rest.customUrl.length,
        )
      }`,
      json,
    );

    // RETURN DISCORDS RESPONSE BACK TO THE PROCESS MAKING THE REQUEST
    if (result) {
      requestEvent.respondWith(
        new Response(JSON.stringify(result), {
          status: 200,
        }),
      );
    } else {
      requestEvent.respondWith(
        new Response(undefined, {
          status: 204,
        }),
      );
    }
  }
}
```
