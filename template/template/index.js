
const deno = require('discordeno');

const configs = require('../config.json');
const Component = require('./Structures/Component');
const Embed = require('./Structures/Embed');
const Interaction = require('./Structures/Interaction');
const Message = require('./Structures/Message');

const client = deno.createBot({
    events: {
        ready() {
            console.log("Successfully connected to gateway");
        },
        interactionCreate(client, interaction){
            const i = new Interaction(client, interaction);
            i.reply({content: `hello`});
        },
        messageCreate(client, message) {
            client.commands.isCommand(message);
            if (message.content === "!!ping") {
                //Convert String to Bigint
                const bigint = BigInt("853274694097698836");

                const msg = new Message(client, message);
                //msg.member.roles.add({roleId: bigint});
              /*   msg.reply({content: 'hello'})
                msg.pin();
                msg.unpin();
                msg.react('🐱'); */
                const embed = new Embed().setTitle("Pong!").setDescription("This is a test embed!").setColor(0x00ff00).toJSON();
                const button = new Component().setType('BUTTON').setStyle('LINK').setLabel("Click me!").setUrl("https://google.com").toJSON();
                const button2 = new Component().setType(2).setStyle('DANGER').setLabel("EYES").setCustomId('s222').toJSON();
                const select = new Component()
                .setType('SELECT_MENU')
                .setCustomId(`sksk98h`)
                .setOptions([{
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
                const actionrow = new Component().setType(1).setComponents(button, button2).toJSON();
                const actionrow2 = new Component().setType(1).setComponents(select).toJSON();
                msg.channel.send({ content: "pong", embeds: [embed], components: [actionrow, actionrow2] });
            }
        }
    },
    intents: ['Guilds', 'GuildMessages'],
    token: configs.token,
})

const CommandManager = require('./Managers/CommandManager.js');
client.commands = new CommandManager(client);
client.commands.load({})

deno.startBot(client)


