// THE ORDER OF THE IMPORTS IN THIS FILE MATTER!
// DO NOT MOVE THEM UNLESS YOU KNOW WHAT YOUR DOING!

// First complete non-api reliant testing.
// Don't waste api rate limits if a early test fails.
import "./util/utils.ts";
import "./util/validate_length.ts";

// API TESTING BELOW

// First initiate the connection
import "./ws/start_bot.ts";
import "./guilds/create_guild.ts";

// Channel tests
import "./channels/category_children.ts";
import "./channels/channel_overwrite_has_permission.ts";
import "./channels/create_channel.ts";
import "./channels/clone_channel.ts";
import "./channels/delete_channel.ts";
import "./channels/delete_channel_overwrite.ts";
import "./channels/edit_channel.ts";
import "./channels/edit_channel_overwrite.ts";
import "./channels/get_channel.ts";
import "./channels/get_channels.ts";
import "./channels/get_pins.ts";
import "./channels/is_channel_synced.ts";
import "./channels/start_typing.ts";
import "./channels/swap_channels.ts";

// Emojis tests
import "./emojis/create_emoji.ts";
import "./emojis/delete_emoji.ts";
import "./emojis/edit_emoji.ts";
import "./emojis/get_emoji.ts";
import "./emojis/get_emojis.ts";

// Invites tests
import "./invites/create_invite.ts";
import "./invites/delete_invite.ts";
import "./invites/get_channel_invites.ts";
import "./invites/get_invite.ts";
import "./invites/get_invites.ts";

// Messages tests
import "./messages/add_reaction.ts";
import "./messages/add_reactions.ts";
import "./messages/remove_all_reactions.ts";
import "./messages/remove_reaction.ts";
import "./messages/remove_reaction_emoji.ts";
import "./messages/remove_user_reaction.ts";
import "./messages/create_message.ts";
import "./messages/delete_message.ts";
import "./messages/delete_messages.ts";
import "./messages/edit_message.ts";
import "./messages/get_message.ts";
import "./messages/get_messages.ts";
import "./messages/get_reactions.ts";
import "./messages/pin_message.ts";
import "./messages/unpin_message.ts";

// Roles tests
import "./roles/add_role.ts";
import "./roles/create_role.ts";
import "./roles/delete_role.ts";
import "./roles/edit_role.ts";
import "./roles/remove_role.ts";

// Members tests
import "./members/search_members.ts";

// Final cleanup
import "./guilds/delete_server.ts";
import "./ws/ws_close.ts";
