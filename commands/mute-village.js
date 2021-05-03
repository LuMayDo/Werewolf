module.exports = {
	name: 'mute-village',
	description: 'Mutes all villagers.',
	usage: 'Start the night and mute every villager.',
	examples: [
		'`!ww mute-village` server mutes every member of the voice channel except the user.',
	],
	execute(message, args) {
		const voiceChannel = message.member.voice.channel
		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel to assign roles!')

		const members = voiceChannel.members.filter(member => member !== message.member)
		members.forEach(member => {
			member.voice.setMute(true, 'Night arrived. You went to sleep.')
		})
	},
}
