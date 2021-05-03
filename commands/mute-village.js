module.exports = {
	name: 'mute-village',
	description: 'Mutes all villagers',
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
