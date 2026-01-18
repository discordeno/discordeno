import { after } from 'mocha';
import { createRestManager } from '../../src/manager.js';
import { E2E_TEST_GUILD_ID, token } from './constants.js';
// For debugging purposes
// logger.setLevel(LogLevels.Debug)

export const rest = createRestManager({
  token,
});
rest.deleteQueueDelay = 10000;

const guild = await rest.getGuild(E2E_TEST_GUILD_ID);
if (!guild) throw new Error('E2E_TEST_GUILD_ID does not exist or is not accessible.');

const channel = await rest.createChannel(guild.id, {
  name: 'discordeno-e2e',
});

after(async () => {
  // Clean up the channel created for testing
  if (channel.id) {
    await rest.deleteChannel(channel.id);
  }
});

export const e2eCache = {
  guildId: E2E_TEST_GUILD_ID,
  guild,
  channel,
};

// Some resources created during tests need to be disposed of afterwards, as they will persist otherwise (e.g., emojis, roles, automod rules)
export const toDispose = new Set<() => Promise<void>>();

afterEach(async () => {
  let aggregateError: AggregateError | null = null;

  for (const dispose of toDispose) {
    try {
      await dispose();
    } catch (error) {
      console.error('Error during cleanup:', error);

      aggregateError ??= new AggregateError([], 'Errors occurred during cleanup');
      aggregateError.errors.push(error);
    }
  }

  toDispose.clear();

  if (aggregateError) throw aggregateError;
});
