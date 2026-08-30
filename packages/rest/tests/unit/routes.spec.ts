import { expect } from 'chai';
import { describe, it } from 'mocha';
import { createRoutes } from '../../src/routes.js';

describe('routes.ts', () => {
  it('Avoids path traversal', () => {
    const routes = createRoutes();

    const traversal = routes.channels.channel('../../gateway/bot');
    const parsedUrl = new URL(traversal, 'https://discord.com');

    expect(parsedUrl.href).to.be.equal('https://discord.com/channels/..%2F..%2Fgateway%2Fbot');
  });

  it('Allows path traversal when checks are disabled', () => {
    const routes = createRoutes(true);

    const traversal = routes.channels.channel('../../gateway/bot');
    const parsedUrl = new URL(traversal, 'https://discord.com');

    expect(parsedUrl.href).to.be.equal('https://discord.com/gateway/bot');
  });
});
