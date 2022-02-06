---
sidebar_position: 2
---
As previously mentioned, Discorddeno was built with as few classes as possible, this is in favor of performance. For example, you cannot execute functions on objects. 
```diff
- message.channel.send({content: 'hello'}) 
+ client.helpers.sendMessage(channelId, options)
```

This seems to be more complicated at first, but has many advantages:
* You get full control over the actions
* Errors are easier to debug
* A validation by classes does not have to take place 

One of the disadvantages is that you have to change a lot in your code. 
Of course we recommend to prefer the upper way, but we will introduce structures in this guide because they are used by many users, which eventually migrate.

For example, if you want to get correctly formatted objects, structures are of course in advantage. Because they support the readability of the code through their ease of use 

In the following we will introduce, how to create your own structures and use the ones in the template.