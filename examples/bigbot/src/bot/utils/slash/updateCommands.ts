import type { ApplicationCommandOption, Bot } from 'discordeno';
import { ApplicationCommandTypes } from 'discordeno';
import { prisma } from '../../../prisma.js';
import { bot } from '../../bot.js';
import COMMANDS from '../../commands/mod.js';
import { serverLanguages, translate } from '../../languages/translate.js';
import type { ArgumentDefinition } from './createCommand.js';

const DEV_SERVER_ID = process.env.DEV_SERVER_ID as string;

export async function updateDevCommands(bot: Bot) {
	const cmds = Object.entries(COMMANDS)
		// ONLY DEV COMMANDS
		.filter(([_name, command]) => command?.dev);

	if (!cmds.length) return;

	// DEV RELATED COMMANDS, USE upsertGlobalApplicationCommands TO UPDATE GLOBALLY
	await bot.helpers.upsertGuildApplicationCommands(
		bot.transformers.snowflake(DEV_SERVER_ID),
		cmds.map(([name, command]) => {
			const translatedName = translate(DEV_SERVER_ID, command.name);
			const translatedDescription = command.description ? translate(DEV_SERVER_ID, command.description) : '';

			if (command.type && command.type !== ApplicationCommandTypes.ChatInput) {
				return {
					name: (translatedName || name).toLowerCase(),
					type: command.type,
				};
			}

			return {
				name: (translatedName || name).toLowerCase(),
				description: translatedDescription || command.description,
				options: command.options
					? createOptions(bot.transformers.snowflake(DEV_SERVER_ID), command.options, command.name)
					: undefined,
			};
		}),
	);
}

// SETUP-DD-TEMP: You can make this able to be updated dynicamally by moving this value to something in the database and having a command to update it on the fly or as part of CI.
export const CURRENT_SLASH_COMMAND_VERSION = 1;

/** Whether the guild has the latest slash command version */
export async function usesLatestCommandVersion(guildId: bigint): Promise<boolean> {
	return (await getCurrentCommandVersion(guildId)) === CURRENT_SLASH_COMMAND_VERSION;
}

/** Get the current slash command version for this guild */
export async function getCurrentCommandVersion(guildId: bigint): Promise<number> {
	if (bot.commandVersions.has(guildId)) return bot.commandVersions.get(guildId)!;

	const commandVersion = await prisma.commands.findUnique({ where: { id: guildId } });
	if (commandVersion) bot.commandVersions.set(guildId, commandVersion.version);

	return commandVersion?.version ?? 0;
}

export async function updateCommandVersion(guildId: bigint): Promise<number> {
	// UPDATE THE VERSION SAVED IN THE DB
	await prisma.commands.upsert({
		where: { id: guildId },
		create: { id: guildId, version: CURRENT_SLASH_COMMAND_VERSION },
		update: { version: CURRENT_SLASH_COMMAND_VERSION },
	});

	bot.commandVersions.set(guildId, CURRENT_SLASH_COMMAND_VERSION);
	return CURRENT_SLASH_COMMAND_VERSION;
}

export async function updateGuildCommands(bot: Bot, guildId: bigint) {
	if (guildId === 547046977578336286n) return await updateDevCommands(bot);

	await updateCommandVersion(guildId);

	// GUILD RELATED COMMANDS
	await bot.helpers.upsertGuildApplicationCommands(
		guildId,
		Object.entries(COMMANDS)
			// ONLY GUILD COMMANDS
			.filter(([_name, command]) => !command.global && !command.dev)
			.map(([name, command]) => {
				// USER OPTED TO USE BASIC VERSION ONLY
				if (command.advanced === false) {
					return {
						name,
						description: translate('english', command.description),
						options: command.options ? createOptions('english', command.options, command.name) : undefined,
					};
				}

				// ADVANCED VERSION WILL ALLOW TRANSLATION
				const translatedName = translate(guildId, command.name);
				const translatedDescription = translate(guildId, command.description);

				return {
					name: translatedName.toLowerCase(),
					description: translatedDescription,
					options: command.options ? createOptions(guildId, command.options, command.name) : undefined,
				};
			}),
	);
}

// USED TO CACHE CONVERTED COMMANDS AFTER START TO PREVENT UNNECESSARY LOOPS
const convertedCache = new Map<string, ApplicationCommandOption[]>();

/** Creates the commands options including subcommands. Also translates them. */
function createOptions(
	guildId: bigint | 'english',
	options: readonly ArgumentDefinition[],
	commandName?: string,
): ApplicationCommandOption[] | undefined {
	const language = guildId === 'english' ? 'english' : serverLanguages.get(guildId) ?? 'english';
	if (commandName && convertedCache.has(`${language}-${commandName}`)) {
		return convertedCache.get(`${language}-${commandName}`)!;
	}

	const newOptions: ApplicationCommandOption[] = [];

	for (const option of options || []) {
		const optionName = translate(guildId, option.name);
		const optionDescription = translate(guildId, option.description);

		// TODO: remove this ts ignore
		// @ts-expect-error
		const choices = option.choices?.map((choice) => ({
			...choice,
			name: translate(guildId, choice.name),
		}));

		newOptions.push({
			...option,
			name: optionName.toLowerCase(),
			description: optionDescription || 'No description available.',
			choices,
			// @ts-expect-error fix this
			options: option.options
				? // @ts-expect-error fix this
					createOptions(bot, guildId, option.options)
				: undefined,
		} as ApplicationCommandOption);
	}
	if (commandName) convertedCache.set(`${language}-${commandName}`, newOptions);

	return newOptions;
}
