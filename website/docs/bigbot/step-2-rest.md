---
sidebar_position: 3
sidebar_label: Step 2 - REST
---

# Proxy REST

Awesome, if you have reached this far you know that this guide will be using the following:

- Node.JS Runtime
- Class based approach

Remember if you need any help with an alternative to the above listed items, please contact us on Discord.

## Creating Your REST Manager

Now we can finally get started. Make a file anywhere you like for example `services/rest/rest.ts`. Note that you can make it anywhere and call it whatever you want. For the purposes of this guide, we will make it as if they are microservices.

Once you have the file, copy paste this code in there.

```ts
import { createRestManager } from '@discordeno/rest'

export const REST = createRestManager({
  // YOUR BOT TOKEN HERE
  token: process.env.TOKEN,
})
```

:::tip
If you haven't already, install the @discordeno/rest package. Need help? Check the Installation page in the guides.
:::

This code we have created will maintain a manager that will handle all the outgoing requests to discord. What we need to do now, is create a listener that will handle all the incoming requests from all of our services and forward them to this manager.

## Creating A HTTP Listener

Now you can make another file like `services/rest/index.ts`. Then paste the code below:

```ts
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

import { REST } from './rest.ts'

const AUTHORIZATION = process.env.AUTHORIZATION as string

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' })
  }

  try {
    const result = await REST.makeRequest(req.method, `${REST.baseUrl}${req.url}`, req.body)

    if (result) {
      res.status(200).json(result)
    } else {
      res.status(204).json()
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(REST_PORT, () => {
  console.log(`REST listening at ${REST_URL}`)
})
```

Now let's take a minute to explain this part very briefly. The majority of this code is about creating a http listener in Node.JS to listen for requests coming into this process. When any request comes in it first checks if the authorization header matches. This is a small security challenge, to help prevent unknown users from making requests with your token should they find the url your hosting this listener on. This guide, uses `dotenv` package to handle private secrets but you can use anything you like.

:::tip
Take the time to go back to the rest.ts file we made earlier and adjust the `token` property to use dotenv as well, should you want to optimize your code.
:::

If a request was not authorized, it will be ignored. If a request comes with a proper authorization header, we will proceed to making the request. This request is forwarded to our REST we made earlier in rest.ts file. We add on the discord base url to the route and forward it. The manager will handle all rate limits and queues and anything else to make the request. When it responds, it will either return a valid response or an error. This successful response or error is than handled as needed and sent back to original process that called this listener.

## Setting Up Analytics

Because we are making a bot in millions of discord server, we are going to want some nice analytics into our REST manager. So let's take a minute to setup some analytics. We are going to use InfluxDB but you can use anything you like.

Make another file `services/rest/analytics.ts` and paste the code below.

```ts
import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { REST } from './rest.ts'

const INFLUX_ORG = process.env.INFLUX_ORG as string
const INFLUX_BUCKET = process.env.INFLUX_BUCKET as string
const INFLUX_TOKEN = process.env.INFLUX_TOKEN as string
const INFLUX_URL = process.env.INFLUX_URL as string

export const influxDB = INFLUX_URL && INFLUX_TOKEN ? new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }) : undefined
export const Influx = influxDB?.getWriteApi(INFLUX_ORG, INFLUX_BUCKET)

let savingAnalyticsId: NodeJS.Interval | undefined = undefined
if (!saveAnalyticsId) {
  setInterval(() => {
    console.log(`[Influx - REST] Saving events...`)
    Influx?.flush()
      .then(() => {
        console.log(`[Influx - REST] Saved events!`)
      })
      .catch((error) => {
        console.log(`[Influx - REST] Error saving events!`, error)
      })
    // Every 30seconds
  }, 30000)
}
```

Now let's go back to our http listener in `services/rest/index.ts` and implement the analytics. Let's add in the Influx portion by first importing it.

```ts
import { Influx } from './analytics.ts'
```

Now, make sure to scroll to this line as we are going to work around this line now.

```ts
const result = await REST.makeRequest(req.method, `${REST.baseUrl}${req.url}`, req.body)
```

```ts
Influx?.writePoint(
  new Point('restEvents')
    .timestamp(new Date())
    .stringField('type', 'REQUEST_FETCHING')
    .tag('method', options.method)
    .tag('url', options.url)
    .tag('bucket', options.bucketId ?? 'NA'),
)
const result = await REST.makeRequest(req.method, `${REST.baseUrl}${req.url}`, req.body)
```

This will add to the analytics whenever a request comes in. Then we should add another one for when a request is successful.

```ts
Influx?.writePoint(
  new Point('restEvents')
    .timestamp(new Date())
    .stringField('type', 'REQUEST_FETCHING')
    .tag('method', options.method)
    .tag('url', options.url)
    .tag('bucket', options.bucketId ?? 'NA'),
)
const result = await REST.makeRequest(req.method, `${REST.baseUrl}${req.url}`, req.body)
Influx?.writePoint(
  new Point('restEvents')
    .timestamp(new Date())
    .stringField('type', 'REQUEST_FETCHED')
    .tag('method', options.method)
    .tag('url', options.url)
    .tag('bucket', options.bucketId ?? 'NA')
    .intField('status', response.status)
    .tag('statusText', response.statusText),
)
```

Finally, we should now move to the `catch` portion in this file, to add analytics for whenever a request fails.

```ts
catch (error: any) {
    Influx?.writePoint(
        new Point('restEvents')
            .timestamp(new Date())
            .stringField('type', 'REQUEST_FAILED')
            .tag('method', options.method)
            .tag('url', options.url)
            .tag('bucket', options.bucketId ?? 'NA')
            .intField('status', error.status ?? 399)
            .tag('statusText', error.statusText ?? "Unknown"),
        );
    console.log(error);
    res.status(500).json(error);
}
```

### Grafana

Now you will be able to take this data and implement it into Grafana. In a future time, if possible, we will add more detailed guide on how to setup grafana. But for now, you can follow this guide:

[Grafana + Influx](https://grafana.com/docs/grafana/latest/getting-started/get-started-grafana-influxdb/)

### Multiple Custom Bot Proxy Rest

For bot's that allow servers to buy custom bot's, you can create a separate manager for each bot's token/authorization. As a request comes in, either get a cached rest manager or create one if none exists in cache. You can add them to a Collection where the authorization or token is provided in the request, you can dynamically create rest managers for each bot token. This way each bot can handle their own requests in their own queues.

:::caution
Having multiple bot's sending requests from one source will impact your global rate limit due to the global ip rate limit.
:::

```ts
const MANAGERS = new Collection<string, RestManager>()
```

Create this MANAGERS collection at the near the top of the file. Then we can begin implementing this in our request handler. We are going to be changing this line:

```ts
try {
  const result = await REST.makeRequest(req.method, `${REST.baseUrl}${req.url}`, req.body)
```

It will become something like the following:

```ts
try {
  let manager = MANAGERS.get(req.headers.token);
  if (!manager) {
    // A request came in with a token that has no manager in cache
    manager = createRestManager({ token: req.headers.token })
    MANAGERS.set(req.headers.token, manager);
  }

  const result = await manager.makeRequest(req.method, `${manager.baseUrl}${req.url}`, req.body)
```

### Evals

One of the last things we should do, is make it possible to run commands on this process. To do this, we simply create a small bot on this process with an eval command that listens for our messages only on our developer server. This way we can dynamically update any properties we may need to. For example, if discord updates the API version, we can easily switch the api version with a simple command.

Let's make a small bot on this process. Make a file called `services/rest/bot.ts`. Then paste the code below.

````ts
import { createBot } from '@discordeno/bot'
import { logger } from '@discordeno/utils'
import * as util from 'util'

const inspectOptions = {
  depth: 1,
}

const bot = createBot({
  token: process.env.TOKEN,
  events: {
    // This is just to keep code short for the guide, there are cleaner ways to write events.
    async messageCreate(message) {
      // If the message is from a bot simply ignore
      if (message.author.bot) return
      // If the message is not from bot owner simply ignore
      if (message.author.id !== 'YOUR_ID_HERE') return
      // If the content of the message is not
      if (!message.content.startsWith(`${process.env.PREFIX}eval`)) return

      const args = message.conten.split(' ')
      // remove the .eval part
      args.shift()

      const cleanArgs = args.join(' ').replace(/^\s+/, '').replace(/\s*$/, '')

      // Eval the things and send the results
      let result
      try {
        result = eval(cleanArgs)
      } catch (e) {
        result = e
      }

      const response = ['```ts']
      const regex = new RegExp(Gamer.token, 'gi')

      if (result && typeof result.then === 'function') {
        // We returned a promise?
        let value
        try {
          value = await result
        } catch (err) {
          value = err
        }
        response.push(util.inspect(value, inspectOptions).replace(regex, 'YOU WISH!').substring(0, 1985))
      } else {
        response.push(String(util.inspect(result)).replace(regex, 'YOU WISH!').substring(0, 1985))
      }

      response.push('```')

      await message.channel.createMessage(response.join('\n'))
    },
  },
})
````

Now that you have an eval command available on ur `REST` service, whenever you need to modify something quickly you can easily do so from ur developer server where this bot is. For example, should you want to switch to a newer api version, it is as simple as `.eval REST.version = xxx` where xxx is the new API version.
