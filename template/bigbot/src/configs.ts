/** The discord bot token, without the BOT prefix. */
// SETUP-DD-TEMP: Add the bot token here. 
export const DISCORD_TOKEN = "";

/** The authorization code that the REST proxy will check for to make sure the requests are coming from you.  */
// SETUP-DD-TEMP: Add a secret passcode here.
export const REST_AUTHORIZATION = "";

/** The port that will run the REST proxy. */
// SETUP-DD-TEMP: Choose the port number here that will be used for the REST proxy.
export const REST_PORT = 8000;

/** The url where requests will be sent to from the bot. */
// SETUP-DD-TEMP: Provide the url where you will host your REST proxy. If it is on the same server as others, you can use localhost but if it is on a separate server you should change this entirely.
export const REST_URL = `http://localhost:${REST_PORT}`;

/** These INFLUX configs are only if you wish to enable analytics. */
// SETUP-DD-TEMP: This is optional. If you want to build analytics, add influxdb here.
export const INFLUX_BUCKET = "";
export const INFLUX_ORG = "";
export const INFLUX_TOKEN = "";
export const INFLUX_URL = "";