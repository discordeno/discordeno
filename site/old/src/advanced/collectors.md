# Message And Reaction Collectors!

Collectors are a powerful feature in Discordeno that allow you to await a response from a user using a message, a reaction or a button. For example, if you want the user to provide you a follow-up answer to the command, you can use collectors to get a response of your choosing.

## Message Collectors

When you need another message from the user, it is very simple:

```ts
execute: (message, args) {
  const userResponse = await needMessage(message.author.id, message.channelId);
  // userResponse is a full message object you can now use.
}
```

There are a few things here working by default.

1. The collector will only activate for a message which is sent by the message.author.id
2. It will collect only 1 message.
3. It will only listen for 5 minutes and then expire if no message was sent by the user.

If you wish to customize any of these three, it is as simple as follows:

```ts
execute: (message, args) {
  const userResponse = await needMessage(message.author.id, message.channelId, {
      // You can customize the filter function to decide which messages should be excepted. For example, this will only accept a valid number
      filter: (msg) => msg.author.id === message.author.id && !isNaN(msg.content),
      // If you want it to last a different amount of time. For example, we can make this never expire
      duration: Infinity,
      // If you want to collect more than 1 message
      amount: 100
  });
  
  // userResponse is a full message object you can now use. If amount is > 1 it will be an array of messages
}
```

## Reaction/Button Collectors

The same process applies to reactions. You just replace `needMessage` with `needReaction`. For buttons, simply use `needButton`

```ts
execute: (message, args) {
  const userResponse = await needReaction(message.author.id, message.id, {
      // You can customize the filter function to decide which messages should be excepted. 
      filter: (userId) => userId === message.author.id,
      // If you want it to last a different amount of time. For example, we can make this never expire
      duration: Infinity,
      // If you want to collect more than 1 reaction
      amount: 100
  });
  
  // userResponse is the reaction string or an array of strings if more than 1 amount.
}
```
