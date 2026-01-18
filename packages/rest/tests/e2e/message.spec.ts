import { processReactionString, urlToBase64 } from '@discordeno/utils';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { e2eCache, rest, toDispose } from './utils.js';

describe('Send a message', () => {
  it('With content', async () => {
    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'testing rate limit manager' });

    expect(message.content).to.be.equal('testing rate limit manager');

    const edited = await rest.editMessage(message.channelId, message.id, { content: 'testing rate limit manager edited' });

    expect(message.content).to.be.not.equal(edited.content);

    await rest.deleteMessage(message.channelId, message.id);
  });

  it('With an image', async () => {
    const image = await fetch('https://cdn.discordapp.com/avatars/270010330782892032/d031ea881688526d1ae235fd2843e53c.jpg?size=2048')
      .then(async (res) => await res.blob())
      .catch(() => undefined);

    expect(image).to.not.be.undefined;

    const message = await rest.sendMessage(e2eCache.channel.id, { files: [{ blob: image!, name: 'gamer' }] });
    const [attachment] = message.attachments;

    expect(message.attachments.length).to.be.greaterThan(0);
    expect(attachment.filename).to.be.equal('gamer');
  });

  it('With a file attachment', async () => {
    const fileMsg = await rest.sendMessage(e2eCache.channel.id, {
      content: '222',
      files: [
        {
          name: 'application.txt',
          blob: new Blob(['hello world'], { type: 'text/plain' }),
        },
      ],
    });

    expect(fileMsg.id).not.equals(undefined);
    expect(fileMsg.content).equals('222');
    expect(fileMsg.attachments.length).equals(1);
    expect(fileMsg.attachments.at(0)?.filename).equals('application.txt');
    expect(fileMsg.attachments.at(0)?.size).equals(11);

    const edited = await rest.editMessage(e2eCache.channel.id, fileMsg.id, {
      content: '222 edit',
      files: [
        {
          name: 'application_edit.txt',
          blob: new Blob(['hello world edit'], { type: 'text/plain' }),
        },
      ],
    });

    expect(edited.id).not.equals(undefined);
    expect(edited.content).equals('222 edit');
    expect(edited.attachments.length).equals(1);
    expect(edited.attachments.at(0)?.filename).equals('application_edit.txt');
    expect(edited.attachments.at(0)?.size).equals(16);
  });
});

describe('Manage reactions', () => {
  it('Add and delete a unicode reaction', async () => {
    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'add reaction test' });
    await rest.addReaction(message.channelId, message.id, '📙');

    const reacted = await rest.getMessage(message.channelId, message.id);
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1);

    await rest.deleteOwnReaction(message.channelId, message.id, '📙');
    const unreacted = await rest.getMessage(message.channelId, message.id);

    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.be.equal(false);
  });

  it('Add and delete a custom reaction', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
      roles: [],
    });
    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!));

    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`;

    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'add reaction test' });
    await rest.addReaction(message.channelId, message.id, emojiCode);

    const reacted = await rest.getMessage(message.channelId, message.id);
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1);

    const reactions = await rest.getReactions(e2eCache.channel.id, message.id, processReactionString(emojiCode));
    expect(reactions?.length).to.be.greaterThanOrEqual(1);

    await rest.deleteOwnReaction(message.channelId, message.id, emojiCode);
    const unreacted = await rest.getMessage(message.channelId, message.id);

    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.be.equal(false);
  });

  it('Add several reactions with random order and delete all of them', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
      roles: [],
    });
    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!));

    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`;

    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'add reaction test' });
    await rest.addReactions(message.channelId, message.id, [emojiCode, '📙']);

    const reacted = await rest.getMessage(message.channelId, message.id);
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1);

    await rest.deleteReactionsAll(message.channelId, message.id);
    const unreacted = await rest.getMessage(message.channelId, message.id);

    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.equal(false);
  });

  it('Add several reactions in an order and delete emoji reaction', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
      roles: [],
    });
    toDispose.add(async () => await rest.deleteEmoji(e2eCache.guild.id, emoji.id!));

    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`;

    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'add reaction test' });
    await rest.addReactions(message.channelId, message.id, [emojiCode, '📙'], true);

    const reacted = await rest.getMessage(message.channelId, message.id);
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1);

    await rest.deleteReactionsEmoji(message.channelId, message.id, emojiCode);

    const unreacted = await rest.getMessage(message.channelId, message.id);
    expect(unreacted.reactions?.length).to.greaterThanOrEqual(1);

    await rest.deleteUserReaction(message.channelId, message.id, rest.applicationId.toString(), '📙');
    const noreacted = await rest.getMessage(message.channelId, message.id);

    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!noreacted.reactions?.length).to.equal(false);
  });
});

describe('Manage pins', () => {
  it('Pin, get, and unpin messages', async () => {
    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'pin me' });
    const message2 = await rest.sendMessage(e2eCache.channel.id, { content: 'pin me 2' });

    await rest.pinMessage(e2eCache.channel.id, message.id);
    await rest.pinMessage(e2eCache.channel.id, message2.id, 'with a reason');

    const pins = await rest.getChannelPins(e2eCache.channel.id);

    expect(pins.items.length).to.equal(2);
    expect(pins.items.some((p) => p.message.id === message.id)).to.equal(true);

    await rest.unpinMessage(e2eCache.channel.id, message.id);
    await rest.unpinMessage(e2eCache.channel.id, message2.id, 'with a reason');

    const unpinned = await rest.getChannelPins(e2eCache.channel.id);
    expect(unpinned.items.length).to.equal(0);
  });
});

describe('Rate limit manager testing', () => {
  it('Send 10 messages to 1 channel', async () => {
    const promises = Array.from({ length: 10 }, async (_, i) => {
      await rest.sendMessage(e2eCache.channel.id, { content: `10 messages to 1 channel testing rate limit manager ${i}` });
    });

    await Promise.all(promises);
  });

  it('Send 10 messages to 10 channels', async () => {
    // Create 10 channels and send a message to each
    const promises = Array.from({ length: 10 }, async (_, i) => {
      const channel = await rest.createChannel(e2eCache.guild.id, { name: `rate-limit-${i}` });
      toDispose.add(async () => await rest.deleteChannel(channel.id));

      const messagePromises = Array.from({ length: 10 }, async (_, j) => {
        await rest.sendMessage(channel.id, { content: `testing rate limit manager ${j}` });
      });

      await Promise.all(messagePromises);
    });

    await Promise.all(promises);
  });
});
