# Discordeno Rest

A standalone and server-less REST module with functionality of REST, independently.

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
