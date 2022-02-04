---
sidebar_position: 2
---

# Design
In order to ensure long-term scaling and maintainability, the code structure is of enormous importance. The following shows how the code structure should be set up. 

The essential parts are a `CommandHandler/CommandManager`, `EventHandler/EventManager`, a lot of `Structures` inorder to code faster and easier and `Plugins`, where your different feature codes will be such as `Commands`, `DB Stuff `... 


## Code Structure
We recommend follwing structure for your code:
```root
bot.js
./Structures
./Managers
./events
./Plugins
   ./General 
       ./commands
           ping.js
        init.js
        slashcommand.js
   ./Tickets
       ./commands
       init.js
       slashcommand.js
./Util
```
In the following we will explain why this structure is suitable, if you want to continue to follow the guide you should create these folders.

In the `Manager` folder the Managers will be added e.g. `CommandManager.js`, `EventManager.js`. Generally codes, which manage the system.

While in the `Structures` folder mainly classes are added like `BaseCommand.js`, `CommmandResponse.js`, `Embed.js`, `Components.js`, which makes it easier transforming objects and inheriting properties such as functions.

The `events` folder will contain the event handlers such as `messageCreate.js`, `debug.js`

Your many useful features and categories end up in the `Plugins` folder, where they should be categorically divided into many folders 

The util class will have functions or classes that will help you convert certain things, such as timestamps, into a human-readable format...

## CommandHandler & BaseCommand
The `CommandHandler` is the main class of the bot, which will handle all the commands and the events recieved from Discord.

The `BaseCommand` is the base class of all commands, which will be extended with `CommandResponse` class.

### Steps showed in the following Guide:
* Loading Commands from different Plugins
* Deploying Slash Commands
* Handling `messageCreate` & `interactionCreate` events
* Command Ratelimit Handling
* One Command Code for handling `Interaction` & `Message` Command
* Validating User given arguments
* Correct Permissions and Error Handling
* Hot-Reloading Commands

* Creating Message Collectors and Interaction Collectors...

## EventHandler
You probably recognized that Discordeno does not use a `EventEmitter` for firing the events, but instead your custom Event-function is fired.

There are ways to adapt to an EventEmitter, but we decided against it for the following reasons:
* EventEmitters often create memory leaks, when you add to many listeners and go uncarefully with it.
* Lots of fragmented pieces of event code making maintaibility more difficult.
* ErrorHandling is difficult and debugging is harder, when many listeners on the same events are opened.

### Steps showed in the following Guide:
* Loading Events from `events` folder
* How to handle Events
* Hot-Reloading Events



## Structures
Structures are essential to replace larger parts of code with ready-made codes and to modify them if necessary.

Example:
```js
class Command{
    static name = 'ping';
    static aliases = ['pong'];
    static botPermission = ['SEND_EMBED_LINKS'];
    run(message, args){
        // do something
    }
}
```
It would be annoying adding everytime the `botPermission` property to the class Command, when the Permission is used from every Command, then it is unnecessary to add it, when you can extend the class.
```js
class BaseCommand{
    constructor(client){
        this.client = client;
        this.basePermission = ['SEND_EMBED_LINKS'];
    }
}
class Command extends BaseCommand{
    static name = 'ping';
    static aliases = ['pong'];
    constructor(data) {
        super(data)
    }
    run(message, args){
        // do something
    }
}
```

### Steps showed in the following Guide:
* Creating a `BaseCommand` class and `CommandResponse` class
* Easily creating `Embeds` & `Components`


## Plugins
The Plugins folder will help you categorize your code into many parts to give some structure.

Of course, this has many advantages, you have a much clearer code, you can debug problems much more easier... This also opens up possibilities for open source contribution, since not all parts of the code have to be published inorder to add new plugins, since they are "independent".

There will be a main `Plugins` folder, which will contain the Bot Plugins. This contain a `General` Plugin, where general bot commands will be listed.

### Steps showed in the following Guide:
* Creating a `BasePlugin` class
* Creating the `General` Plugin, which contains some general commands such as `help`
* Adding new Plugins

## Error Handling
One of the most important points is of course the way how to handle errors, to allow a user-friendly operation and to find bugs much faster. 

You should catch errors where you can and log them into your logger to fix them later. There's also 'Sentry' which gives you a good look through a website at recent errors.

Few errors naturally have a positive effect on maintaibility and scalability.

In addition, the handling of errors generated by the user is very important to increase transparency. If the user doesn't know why the error happened, he will be very surprised what he did wrong and could even remove your bot 

### Steps showed in the following Guide:
* Handling Internal Errors
* Handling User/Command Errors
* Filtering Errors and logging them out

## Caching
Normally libraries cache all the info they get, this can be of course helpful in the beginning to discover all the functionalities.

Later it turns out to be a resource-consuming method. Therefore, this way should be prevented.

Discordeno allows 'Custom Caching' and even 'Custom Property Caching', which allow you fine-grained control over the caching of data. Normally you only need 20% of the data received from Discord, which makes caching redundant/useless in some places.

There are also some `Filter` and `Sweeper` method to empty unused cache or to cache only specifically... 

### Steps showed in the following Guide:
* Taking Advantage of Custom Caching
* Transforming the Cache with `./Structures` to use the functions such as `.send()`

## Cross Communication & Scaling
If you run many different processes, such as a Welcomer Api, communication is of course of central importance in order to send or receive data, which then execute certain actions.

Cross communication can be easily done with sockets or a tcp client 
This brings up this Structure:
```js
Bridge (Heart)
- Machine 1
   - Cluster [0-9]
- Machine 2
   - Cluster [10-18]
- Machine 3 -> Welcomer Api
- Machine 4 -> Dashboard
```
It's important to use something fast to have proper "realtime" communication. 

Discordeno already offers many internal options for scaling bots, no matter what size 

When scaling, you will probably separate many parts from your bot and put them into separate processes, such as their own `RestManager, Gateway Manager`...
This of course opens up a lot of possibilities:
* Zero downtime updates
* Global cache
* Synced rate limits 
[Check the Github Readme for more information](https://github.com/discordeno/discordeno)

### Steps showed in the following Guide:
* Clustering your Bot
* Cross-Communication
* Standalone Processes


**Congratulations, you now know how to design a scalable bot, let's go to the appropriate pages to implement your design in reality**