---
sidebar_position: 3
---
# Create Embeds
Embeds are widely used in your code in order to display the content in a better format.

Although the Discord Api does not accepts funky classes such as `new MessageEmbed().setTitle('hello')`, instead it takes the raw data, e.g `{title: 'hello'}`

So we have to create a Embed Structure, which will convert the data provided by the user in the Discord's format.

```js
class Embed(){  
    constructor(){
    }
    setTitle(title){
        this.title = title;
    }
}
```

Now we created a Class for creating a Embed with functions. Although we can't send this Embed Structure to Discord as mentioned above.

So we need a function in addition inorder to convert the data from the class to the Discord's format.

```js
class Embed(){  
    constructor(){
    }
    setTitle(title){
        this.title = title;
    }
    toJSON(){
        return {
            title: this.title
        }
    }
}
```

Wow, now you can create a embed and send it to Discord.
```js
const embed = new Embed()
.setTitle('hello')
.toJSON()
client.helpers.sendMessage(channelId, {embeds: [embed]})
```


```js
const Channel = require('./structures/Channel') //path to structure
const channel = new Channel(client, data)
channel.send({embeds: [embed]})
```

**You probably want to use some other Functions in your Embed Structure. We also have a Template for this:**
* [Embed](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Embed.js)

### Using the Embed Structure:
```js
const Embed = require('./structures/Embed') //path to structure
const Channel = require('./structures/Channel') //path to structure
const channel = new Channel(client, channeldata)
const showCaseEmbed = new Embed()
	.setColor(0x00AE86)
	.setTitle('A Random Title')
	.setURL('https://github.com/discordeno/')
	.setAuthor({ name: 'Author name', iconUrl: 'https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png', url: 'https://github.com/discordeno' })
	.setDescription('A Random Description')
	.setThumbnail('https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png')
	.addFields(
		{ name: 'Field 1 Name', value: 'Normal Field Value' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Field 2 Name', value: 'Inline Field Value', inline: true },
		{ name: 'Field 3 Name', value: 'Inline Field Value', inline: true },
	)
	.addField({name: 'Field 4', value: 'Field Value'})
	.setImage('https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png')
	.setTimestamp()
	.setFooter({ text: 'A Footer Text', iconUrl: 'https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png' })
    .toJSON();

channel.send({ embeds: [showCaseEmbed] });
```

### Embed Limits:
* Embed Title: 256 characters
* Embed Description: 4096 characters
* Embed Field Name: 256 characters
* Embed Field Value: 1024 characters
* Embed Footer Text: 2048 characters
* Embed Author Name: 256 characters
* Totally not more than 6000 characters
* 10 Embeds per message can be sent
