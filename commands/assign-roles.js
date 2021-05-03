const { roles } = require('../config/config.json')

module.exports = {
	name: 'assign-roles',
	description: 'Assigns roles to every user.',
	usage:
		'Assign every member of the same voice channel as the calling user. ' +
		'Every user gets a direct message including their assigned role. ' +
		'Define custom roles by adding them after the command and separate them using space. ' +
		'If the roles count is less than the players, normal villagers will automatically be added to the list.',
	examples: [
		'`!ww assign-roles` assigns a pre-defined set of roles to the players.',
		'`!ww assign-roles Werewolf` defines one werewolf.',
		'`!ww assign-roles Werewolf Cupid Witch Guardian` defines a werewolf, a cupid, a witch and a guardian.',
	],
	execute(message, args) {
		const voiceChannel = message.member.voice.channel,
			members = voiceChannel.members.filter(member => member !== message.member)

		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel to assign roles!')

		let customRoles = []

		if (args.length < 1) {
			try {
				roles.forEach(role => {
					let roleCount = role.defaultCount ? role.defaultCount : 1

					for (let i = 0; i < roleCount; i++) customRoles.push(role.name)
				})
			} catch (err) {
				message.send("Roles can't be collected")
				console.log(err)
				return
			}
		} else {
			customRoles = args

			if (customRoles.length < members.size) {
				for (let i = 0; i < members.size - customRoles.length; i++)
					customRoles.push('Villager')
			}
		}

		try {
			const members = voiceChannel.members.filter(member => member !== message.member)

			let roleList = '',
				randomRoles = customRoles.sort(() => Math.random() - 0.5)

			members.forEach(member => {
				let role = randomRoles.shift()

				if (role.toLowerCase() === 'werewolf') global.werewolves.push(member.user)

				roleList += `${member.displayName} - ${role}\n`
				member.send(`You are ${role}`)
			})

			message.author.send(roleList)
			message.channel.send('Everybody should get a role.')
		} catch (err) {
			message.channel.send('Seems like something went wrong.')
			console.log(err)
		}
	},
}
