const { roles } = require('../config/config.json')

module.exports = {
	name: 'assign-roles',
	description: 'Assigns roles to every user.',
	usage:
		'Assign every member of the same voice channel as the calling user by using `!ww assign-roles`. ' +
		'Every user gets a direct message including their assigned role.',
	examples: [],
	execute(message, args) {
		const voiceChannel = message.member.voice.channel
		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel to assign roles!')

		let customRoles = []

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

		try {
			const members = voiceChannel.members.filter(member => member !== message.member)

			let roleList = '',
				randomRoles = customRoles.sort(() => Math.random() - 0.5)

			members.forEach(member => {
				let role = randomRoles.shift()

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
