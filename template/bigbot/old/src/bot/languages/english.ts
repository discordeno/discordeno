const english = {
  // Execute Command
  EXECUTE_COMMAND_NOT_FOUND: "Something went wrong. I was not able to find this command.",
  EXECUTE_COMMAND_ERROR: "Something went wrong. The command execution has thrown an error.",

  // Ping Command
  PING_NAME: "ping",
  PING_DESCRIPTION: "🏓 Check whether the bot is online and responsive.",
  PING_RESPONSE: "🏓 Pong! I am online and responsive! :clock10:",
  PING_RESPONSE_WITH_TIME: (time: number) => `🏓 Pong! ${time / 1000} seconds! I am online and responsive! :clock10:`,

  // Update Command
  UPDATE_NAME: "update",
  UPDATE_DESCRIPTION: "🎉 Update the commands for the bot.",
  UPDATE_GLOBAL_NAME: "global",
  UPDATE_GLOBAL_DESCRIPTION: "Update the global commands.",
  UPDATE_GUILD_NAME: "guild",
  UPDATE_GUILD_DESCRIPTION: "Update guild commands for a guild.",
  UPDATE_GUILD_ID_NAME: "id",
  UPDATE_GUILD_ID_DESCRIPTION: "The guild id you wish to manually update.",
} as const;

export default english;
