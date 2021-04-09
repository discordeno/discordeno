// THE ORDER OF THE IMPORTS IN THIS FILE MATTER!
// DO NOT MOVE THEM UNLESS YOU KNOW WHAT YOUR DOING!

// First complete non-api reliant testing.
// Don't waste api rate limits if a early test fails.
import "./util/utils.ts";

// API TESTING BELOW

// First initate the connection
import "./ws/start_bot.ts";
import "./guilds/create_guild.ts";

// Channel tests
import "./channels/create_channel.ts";
import "./channels/delete_channel.ts";

// Messages tests
import "./messages/create_message.ts";
import "./messages/delete_message.ts";
import "./messages/edit_message.ts";

// Final cleanup
import "./guilds/delete_server.ts";
import "./ws/ws_close.ts";
