import Client from "../module/Client.ts";

class RequestManager {
  client: Client;
  token: string;

  constructor(client: Client, token: string) {
    this.client = client;
    this.token = token;
  }

  async get(url: string, payload?: unknown) {
    // THIS IS IMPORTANT. It keeps clean stack errors in the users own files to better help debug errors.
    // const stackHolder = {};
    // TODO: Figure out why this doesnt work
    // Error.captureStackTrace(stackHolder)

    // let attempts = 0
    const headers = {
      Authorization: this.token,
      "User-Agent":
        `DiscordBot (https://github.com/skillz4killz/discordeno, 0.0.1)`
    };

    console.log("payload", payload);

    const data = await fetch(url, { headers }).then(res => res.json());
    return data;
  }
}

export default RequestManager;
