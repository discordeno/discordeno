import Client from "./module/client.ts"
import { configs } from "./configs.ts"
import { StatusType, GatewayOpcode } from "./types/discord.ts";

(async function () {
    const client = new Client({
        token: configs.token
    });

    const { gateway, connection } = await client.bootstrap();

    for await (const message of connection) {
        if (message.data?.op === GatewayOpcode.Hello) {
            await message.action;
            await gateway.updateStatus({
                afk: false,
                status: StatusType.DoNotDisturb
            })
        }
    }
})();
