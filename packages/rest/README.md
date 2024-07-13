# Discordeno Rest

<img align="right" src="https://raw.githubusercontent.com/discordeno/discordeno/main/website/static/img/logo.png" height="150px" />

Discord API library for [Node.JS](https://nodejs.org), [Deno](https://deno.land) & [Bun](https://bun.sh/)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
[![codecov](https://codecov.io/gh/discordeno/discordeno/branch/main/graph/badge.svg?token=SQI9OYJ7AK)](https://codecov.io/gh/discordeno/discordeno)
![action status](https://github.com/discordeno/discordeno/actions/workflows/lib-check.yml/badge.svg?event=push)

A standalone REST module with functionality of REST, independently.

- Easily host on any serverless infrastructure.
  - Easy to use and setup with Cloudflare Workers (FREE for 100K requests per day!)
- Freedom from global rate limit errors
  - As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly
    handle it properly so this allows 1 rest handler across the entire bot.
  - In fact, you can host multiple instances of your bot and all connect to the same rest server.
- REST does not rest!
  - Separate rest means if your bot for whatever reason crashes, your requests that are queued will still keep going and
    will not be lost.
  - Seamless updates! When you want to update and reboot the bot, you could potentially lose tons of messages or
    responses that are in queue. Using this you could restart your bot without ever worrying about losing any responses.
- Scalability! Scalability! Scalability!

## Links

- [Website](https://discordeno.js.org/)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)
