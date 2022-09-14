import { Point } from "@influxdata/influxdb-client";
import { BASE_URL, createRestManager } from "discordeno";
import express, { Request, Response } from "express";

import { Influx } from "../analytics.js";
import { DISCORD_TOKEN, INFLUX_TOKEN, REST_AUTHORIZATION, REST_PORT, REST_URL } from "../configs.js";

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: REST_URL,
  debug: console.log,
});

// If influxdb data is provided, enable analytics in this proxy.
if (INFLUX_TOKEN) {
  rest.fetching = function (options) {
    Influx.writePoint(
      new Point("restEvents")
        // MARK THE TIME WHEN EVENT ARRIVED
        .timestamp(new Date())
        // SET THE GUILD ID
        .stringField("type", "REQUEST_FETCHING")
        .tag("method", options.method)
        .tag("url", options.url)
        .tag("bucket", options.bucketId ?? "NA"),
    );
  };

  rest.fetched = function (options, response) {
    Influx.writePoint(
      new Point("restEvents")
        // MARK THE TIME WHEN EVENT ARRIVED
        .timestamp(new Date())
        // SET THE GUILD ID
        .stringField("type", "REQUEST_FETCHED")
        .tag("method", options.method)
        .tag("url", options.url)
        .tag("bucket", options.bucketId ?? "NA")
        .intField("status", response.status)
        .tag("statusText", response.statusText),
    );
  };

  setInterval(() => {
    console.log(`[Influx - REST] Saving events...`);
    Influx.flush()
      .then(() => {
        console.log(`[Influx - REST] Saved events!`);
      })
      .catch((error) => {
        console.log(`[Influx - REST] Error saving events!`, error);
      });
    // Every 30seconds
  }, 30000);
}

rest.convertRestError = (errorStack, data) => {
  if(!data) return {message: errorStack.message}
  return {...data, message: errorStack.message};
}

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.post("/*", async (req, res) => {
  handleRequest(req, res);
});

app.get("/*", async (req, res) => {
  handleRequest(req, res);
});

app.put("/*", async (req, res) => {
  handleRequest(req, res);
});

app.delete("/*", async (req, res) => {
  handleRequest(req, res);
});

app.patch("/*", async (req, res) => {
  handleRequest(req, res);
});

async function handleRequest(req: Request, res: Response) {
  if (!REST_AUTHORIZATION || REST_AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: "Invalid authorization key." });
  }

  try {
    const result = await rest.runMethod(
      rest,
      req.method as any,
      `${BASE_URL}${req.url}`,
      req.body,
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(204).json();
    }
  } catch (error: any) {
    console.log(error);
    if (error?.code) res.status(500).json(error);
    else {
      res.status(500).json(error);
    }
  }
}

app.listen(REST_PORT, () => {
  console.log(`REST listening at ${REST_URL}`);
});
