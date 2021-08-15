import Client from "./Client.ts";

export class Base {
  /** The client itself. */
  client: Client;

  /** The unique id */
  id: bigint;

  constructor(client: Client, id: bigint) {
    this.client = client;
    this.id = id;
  }
}

export default Base;
