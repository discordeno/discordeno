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


## Error Handling
## Caching
## Cross Communication
## Scaling
