import dotenv from "dotenv";
dotenv.config();

import { BASE_URL, createRestManager } from "discordeno";
import express from "express";
import { setupAnalyticsHooks } from "../analytics";
import { REST_URL } from "../configs";

const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
const REST_AUTHORIZATION = process.env.REST_AUTHORIZATION as string;
const REST_PORT = process.env.REST_PORT as string;

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: REST_URL,
  debug: console.log,
});

// Add send fetching analytics hook to rest
setupAnalyticsHooks(rest);

//@ts-ignore
rest.convertRestError = (errorStack, data) => {
  if (!data) return { message: errorStack.message };
  return { ...data, message: errorStack.message };
};

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.all("/*", async (req, res) => {
  if (!REST_AUTHORIZATION || REST_AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: "Invalid authorization key." });
  }

  try {
    const result = await rest.runMethod(rest, req.method as any, `${BASE_URL}${req.url}`, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(204).json();
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(REST_PORT, () => {
  console.log(`REST listening at ${REST_URL}`);
});
