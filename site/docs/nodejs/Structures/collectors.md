---
sidebar_position: 5
---

# Create Collectors

Some of your commands or features are sometimes based on user interactions.
E.g. if a user presses a button and you want to know whether it was pressed.
This is actually done by listening to the `interactionCreate` event.

But sometimes you need to access locale variables or don't want to "hardcode" the part.

That's why it's sometimes recommended to create collectors.

Collectors are listeners that listen to a specific event. In addition, you can provide a filter, so you only recieve certain interactions.

## Use a Collector

:::note Template
The template code is used below. You must have the EventManager part to use the collector feature.
:::

We have a pre-made class for collectors which you can find
[here](https://github.com/discordeno/discordeno/tree/main/template/nodejs/discord/util/Collectors.

```js
    const filter = (m) => m.data?.customId === "warn_modal" && m.user.id === interaction.user.id;

    const collector = new Collector("interactionCreate", { client: client, timeout: 60000, filter, max: 20 });

    collector.on("collect", (m) => {
      console.log(m.data);
      // Stop Collector
      // collector.stop();
    });
    
    // Fires on a timeout, when the collector has reached the max amount of interactions or when it has been closed
    collector.on("end", (collected) => {
      // Map of Collected Interactions
      console.log(collected);
    });
```    

As you can see, this opens up many possibilities. You can listen to any event and get the interaction you need.

### Collector Options
`filter`: Function, just fire the event if the filter returns true.
`timeout`: Number, the time in milliseconds until the collector times out.
`max`: Number, the max amount of interactions the collector can collect.
