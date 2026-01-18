import dotenv from 'dotenv';

dotenv.config({ path: '../../.env', quiet: true });

export const token = process.env.DISCORD_TOKEN!;
if (!token) throw new Error('Token was not provided.');

export const E2E_TEST_GUILD_ID = process.env.E2E_TEST_GUILD_ID!;
if (!E2E_TEST_GUILD_ID) throw new Error('COMMUNITY guild id was not provided.');
