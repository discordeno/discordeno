# Discordeno Rest

This is a serverless rest package that allows you to have an entire REST handler done separately.

- Easily host on any serverless infrastructure.
  - Easy to use and setup with Cloudflare Workers(FREE FOR 100K requests per day!)
-	Freedom from global rate limit errors
	- As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly handle it properly so this allows 1 rest handler across the entire bot.
	- In fact, you can host multiple instances of your bot and all connect to the same rest server.
- Separate rest means if your bot for whatever reason crashes, your requests that are queued will still keep going and will not be lost.
- Scalability! Scalability! Scalability!

## Notes

This does not follow all the same principles of Discordeno main API guidelines. In Discordeno, one of the goals was to limit as many options as possible to make ease of use/entry as simple as possible. This on the other hands is meant only for extremely large bot developers and it is at a point where all these options are not just good to have but an essential requirement.
