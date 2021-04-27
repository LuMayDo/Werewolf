const { prefix } = require('../config/config.json')

module.exports = {
	name: 'help',
	description: 'Lists all the commands.',
	usage: 'Get detailed help of a command by using `!ww help <command>.`',
	examples: [
		'`!ww help assign-roles` shows the detailed view of the `!ww assign-roles` command.',
	],
	execute(message, args) {
		if (args.length < 1) {
			let createEmbed = commandData => {
				let commandString = '',
					maxNameLength = commandData
						.clone()
						.sort((a, b) => b.name.length - a.name.length)
						.first().name.length

				commandData.forEach(command => {
					commandString +=
						'`' +
						command.name.padEnd(maxNameLength) +
						'`: ' +
						command.description +
						'\n'
				})

				const helpEmbed = {
					color: 0x00000,
					description: this.description,
					timestamp: message.createdAt,
					footer: {
						icon_url: message.author.displayAvatarURL(),
						text: `Help requested by ${message.author.username}`,
					},
					fields: [
						{
							name: 'Basic Usage',
							value: 'Use commands starting `' + prefix + '`',
						},
						{
							name: 'Commands',
							value: commandString,
						},
						{
							name: 'Detailed Help',
							value:
								'For more information use `' +
								`${prefix} ${this.name} <command>` +
								'`',
						},
					],
				}

				return helpEmbed
			}

			const { commands } = message.client

			message.channel.send({ embed: createEmbed(commands) })
		} else {
			const commandForHelp = message.client.commands.get(args[0].toLowerCase())

			const helpEmbed = {
				color: 0x00000,
				timestamp: message.createdAt,
				footer: {
					icon_url: message.author.displayAvatarURL(),
					text: `Help requested by ${message.author.username}`,
				},
				fields: [
					{
						name: 'Usage',
						value: commandForHelp.usage,
					},
					{
						name: 'Examples',
						value: commandForHelp.length
							? commandForHelp.examples.join('\n')
							: 'No examples for this command.',
					},
				],
			}

			message.channel.send({ embed: helpEmbed })
		}
	},
}
