import type { Camelize, DiscordEmoji } from '@discordeno/types';
import { urlToBase64 } from '@discordeno/utils';
import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';
import { e2eCache, rest, toDispose } from './utils.js';

chaiUse(chaiAsPromised);

describe('Create and delete emojis', () => {
  it('create an emoji', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    });

    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!));

    // Assertions
    expect(emoji.id).to.exist;
  });

  // delete an emoji without a reason
  it('delete an emoji without a reason', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    });
    const cleanEmoji = async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!);
    toDispose.add(cleanEmoji);

    // Assertions
    expect(emoji.id).to.exist;

    await rest.deleteEmoji(e2eCache.guild.id, emoji.id!);
    // Remove from toDispose since we already deleted it
    toDispose.delete(cleanEmoji);

    await expect(rest.getEmoji(e2eCache.guild.id, emoji.id!)).to.eventually.rejected;
  });

  // delete an emoji with a reason
  it('delete an emoji with a reason', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    });
    const cleanEmoji = async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!);
    toDispose.add(cleanEmoji);

    // Assertions
    expect(emoji.id).to.exist;

    await rest.deleteEmoji(e2eCache.guild.id, emoji.id!, 'with a reason');
    // Remove from toDispose since we already deleted it
    toDispose.delete(cleanEmoji);

    await expect(rest.getEmoji(e2eCache.guild.id, emoji.id!)).to.eventually.rejected;
  });
});

describe('Edit and get emojis', () => {
  let emoji: Camelize<DiscordEmoji> & { id: string };

  beforeEach(async () => {
    emoji = (await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })) as Camelize<DiscordEmoji> & { id: string };

    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id));
  });

  // edit an emoji name
  it('Edit an emoji name', async () => {
    await rest.editEmoji(e2eCache.guild.id, emoji.id, {
      name: 'edited',
    });

    const edited = await rest.getEmoji(e2eCache.guild.id, emoji.id);
    expect(edited.name).to.equal('edited');
  });

  // edit an emoji roles
  it("Edit an emoji's roles", async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: 'dd-test-emoji',
    });
    toDispose.add(async () => await rest.deleteRole(e2eCache.guild.id, role.id));

    await rest.editEmoji(e2eCache.guild.id, emoji.id, {
      roles: [role.id],
    });

    const edited = await rest.getEmoji(e2eCache.guild.id, emoji.id);
    expect(edited.roles?.length).to.equal(1);
  });

  // get an emoji
  it('get an emoji', async () => {
    const exists = await rest.getEmoji(e2eCache.guild.id, emoji.id);

    expect(exists.id).to.be.exist;
    expect(emoji.id).to.equal(exists.id);
  });

  it('get all guild emojis', async () => {
    const newEmoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf2',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    });
    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, newEmoji.id!));

    const exists = await rest.getEmojis(e2eCache.guild.id);

    expect(exists.length).to.greaterThan(1);
    expect(exists.find((x) => x.id === newEmoji.id)).to.exist;
    expect(exists.find((x) => x.id === emoji.id)).to.exist;
  });
});
