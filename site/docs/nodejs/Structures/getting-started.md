---
sidebar_position: 1
---

# Getting Started with Structures

As previously mentioned, Discordeno was built with as few classes as possible, this is in favor of performance.

For example, you cannot execute functions on objects.

```diff
- message.channel.send({content: "hello"}) 
+ client.helpers.sendMessage(message.channel.id, {content: "hello"})
```

This seems to be more complicated at first, but has many advantages:

- You get full control over the actions
- Errors are easier to debug
- A validation by classes does not have to take place

One of the disadvantages is that you have to change a lot in your code.

Of course, we recommend that you try out the upper way, but we will introduce structures in this guide because they are
used by many users who eventually want to migrate.

For example, if you want to get correctly formatted objects, structures are obviously beneficial, because they support
the readability of the code by their ease of use

In the following, we will introduce how to create your own structures and how to use the ones available in the template.
