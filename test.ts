import { startBot } from "./mod.ts";

await startBot({
    token: "NzcxMDU2NzQzNTI1Nzc3NDM4.X5mkjQ.CXt_evCNBYYvNLRy6WbjRQ1v4-Y",
    intents: [34508732],
    eventHandlers: {
        debug: console.log,
        ready() {
            console.log("Successfully logged in!");
        }
    }
});