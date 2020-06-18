const sidebar = {
	"/docs/": [
		"introduction",
		"gettingstarted",
		"faq",
		{
			title: "Examples",
			children: [
				"/docs/Examples/Avatar",
				"/docs/Examples/MessageEmbed",
				"/docs/Examples/Ping"
			],
		},
		{
			title: "Documentation",
			children: [
				"/docs/Documentation/",
				"/docs/Documentation/Functions",
				"/docs/Documentation/Variables",
				"/docs/Documentation/Enums",
				"/docs/Documentation/Interfaces",
				"/docs/Documentation/TypeAliases"
			],
		},
		{
			title: "Topics (WIP)",
			children: [
			"/docs/Topics/Embeds",
			"/docs/Topics/Permissions",
			"/docs/Topics/Reactions",
			"/docs/Topics/Roles",
			"/docs/Topics/Mentions",
			"/docs/Topics/Fetching"
			]
		},
		{
		title: "Miscallaneous (WIP)",
			children: [
				"/docs/Miscallaneous/Support",
				"/docs/Miscallaneous/UpdatingFromOldVersion",
			]
		}
	]
}
module.exports = sidebar;