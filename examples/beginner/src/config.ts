const token = process.env.BOT_TOKEN;

if (!token) throw new Error('Missing BOT_TOKEN environment variable');

export const configs: Config = {
  /** Get token from ENV variable */
  token,
};

export interface Config {
  token: string;
}
