import { snowflakeToTimestamp } from "../../../../../utils/helpers.ts";
import { replyToInteraction } from "../../../../../utils/replies.ts";
import { translate } from "../../../../languages/translate.ts";
import { createCommand } from "../createCommand.ts";

const command = createCommand({
  name: "PING_NAME",
  dev: true,
  description: "PING_DESCRIPTION",
  execute: async function (bot, interaction) {
    return await replyToInteraction(
      bot,
      interaction,
      translate(
        bot,
        interaction.guildId!,
        "PING_RESPONSE_WITH_TIME",
        Date.now() - snowflakeToTimestamp(interaction.id),
      ),
    );
  },
});

export default command;
