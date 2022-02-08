---
sidebar_position: 4
---
# Create Components
With the depreciation of the `message intent`, components will play an increasingly important role in the future. Discord released a lot of new components. Of course, this opens up completely new possibilities. On the one hand, it improves the user experience and, on the other hand, the interactions can be handled by the dev easily.

To take advantage of this, we'll go into more detail on how to use them.

As already mentioned in the Embed page, we also recommend using raw api data to create a component.

Although this could be uncomfortable for some users, so we are elaborating, how to use our `Components` template, which can be found [here](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Component.js).

## Different Components:
There are different components, which can be used to create a Component of specific type.

### Action Row (`type: 1`): 
This is a top level component, which contains a limited amount of other components. It can be described as container.
* A Action row can not include a action row.
* A Action row can maximal have 5 Buttons
* A Action row can maximal have 1 SelectMenu

### Button (`type: 2`):
Buttons are interactive components, which can be in a message and sent a interaction payload, when a user clicked on it.
* Can just be sent inside an action row

There are different styles of buttons, which can be used:
* `1` - PRIMARY - blurple - customId required
* `2` - DEFAULT - grey - customId required
* `3` - SUCCESS - green - customId required
* `4` - DANGER - red - customId required
* `5` - LINK - grey - url required

![Different Button Styles](https://discord.com/assets/7bb017ce52cfd6575e21c058feb3883b.png)

### SelectMenu (`type: 3`):
SelectMenus are typically same to a dropdown menu in HTMl. 
They accept a range of allowed selects, which sends a interaction payload, when a user selects sth. from the menu.

![Select Menu](https://discord.com/assets/0845178564ed70a6c657d9b40d1de8fc.png)

* You can specify a range of allowed selects (`minValue` and `maxValue`)
* Every Select Item can have a emoji and has a `value`, inorder to identify the select item
* A default Select Item can be set, which will be selected by default

## Send Components
As mentioned above there are different types of components. This requires to define a type, so that Discord can know, which component you want to use...


```js
class Component {
    constructor(options = {}) {

    }
    setType(type) {
        this.type = type;
        return this;
    }

    .setComponets(...components) {
        this.components = components;
        return this;
    }
```
```js
const button = new Button().setType(2)
const button2 = new Button().setType(2)
const actionRow = new ActionRow().setType(1).setComponents(button, button2);
```
**The Code will obviously not work, since its a missing a lot required of data.**
**The other reason is, that we can't send a class to Discord, we need sth. to transform it into a json object.**

**Copy the Code from [here](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Component.js), so we can use it to create a component.**

### Create Button
```js
const button = new Component().setType('BUTTON').setStyle('LINK').setLabel("Click me!").setUrl("https://google.com").toJSON();
///Button with raw types
const button2 = new Component().setType(2).setStyle(4).setLabel("DO NOT CLICK").setCustomId('12345').toJSON();

const actionrow = new Component().setType(`ACTION_ROW`).setComponents(button, button2).toJSON();
//Message to send
const messageoptions = {content: "hello", components: [actionrow]};
//You can also use the Message Structure 
client.helpers.sendMessage(channelId, messageoptions);
```
As you can see you can use strings instead of numbers (types), which you can't remember anyway. 
* Every Button needs a customId, except the Link Button
* You can also use the raw types, but strings are also supported, because they are replaced with the `CONSTANTS` in the component template.

### Select Menu
```js
 const select = new Component()
 .setType('SELECT_MENU')
 .setCustomId(`sksk98h`)
 .setOptions([
    {
        label: 'Option 1',
        value: '1',
        description: `This is option 1`
    },
    {
        label: 'Option 2',
        value: '2',
        description: `This is option 2`
    },
    {
        label: 'Default Option',
        value: '3',
        description: `Default option...`,
        default: true,
    },
]).setPlaceholder('Select an option').toJSON();

const actionrow = new Component().setType(`ACTION_ROW`).setComponents(select).toJSON();

const messageoptions = {content: "hello", components: [actionrow]};

client.helpers.sendMessage(channelId, messageoptions);
```
The upper examples shows some options, which can be used for a Select Menu.

### Recieve Interactions:
When a user clicks on a Button, or selects an option from a Select Menu, Discord sends a interaction payload, which contains the information about the interaction.

You probably need this inorder to handle the user's interaction, which can be done by listening to the `interactionCreate` event.
A `InteractionCollector` can also be used to handle the interaction, which requires some tweaks, but will be added soon in the guide and the template repo.




  
