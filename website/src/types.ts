export interface FeatureList {
  data: {
    feature: FeatureItem
    featureList: FeatureItem[]
  }
}

export interface FeatureItem {
  title: string
  Svg: JSX.Element
  description: JSX.Element
}

export enum DiscordLibraries {
  DISCORD_JS = 'Discord.js',
  DISCORD_GO = 'Discordgo',
  DISCORD_RB = 'discordrb',
  SWORD = 'Sword',
  REST_CORD = 'RestCord',
  DISCORD_PHP = 'DiscordPHP',
  JAVACORD = 'Javacord',
  DISCORD_PY = 'discord.py',
  DISNAKE = 'disnake',
  SERENITY = 'serenity',
  D_SHARP_PLUS = 'DSharpPlus',
  DISCORD_DOT_NET = 'Discord.Net',
  DISCORD_4J = 'Discord4J',
  DISCORDIE = 'discordie',
  DISCORD_RS = 'discord-rs',
  DISCORDIA = 'Discordia',
  ERIS = 'eris',
  DISCORD_HS = 'discord-hs',
  DISCORD_CR = 'discordcr',
  JDA = 'JDA',
  CUSTOM = 'Custom', // Custom library
}

export interface IReview {
  review: string // the review
  bot: {
    username: string // Clyde
    discriminator: string // 0000
    avatar: string // https://cdn.discordapp.com/avatars/123456789012345678/abcdefg1234567890.png
    invite_url: string // https://discord.com/api/oauth2/authorize?client_id=123456789012345678&permissions=8&scope=bot
    guild_count: number // 123456 => frontend converts to 123,456...
  }
  developer: {
    usernames: string[] // ["Peter_"]
  }
  stars: 4 | 5 // 4 or 5, discordeno can't have lower because it's the best :D
  previous_library?: keyof typeof DiscordLibraries // previous library used by the bot (if any)
  memory_improvement?: {
    from: number // 100 => frontend converts to 100MB
    to: number // 50 => frontend converts to 50MB
    guild_count: number // 123456 => frontend convers to 123K. this is the amount of guilds the bot is in at the time of the review
  }
}
