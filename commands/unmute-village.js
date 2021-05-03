module.exports = {
	name: 'unmute-village',
	description: 'Unmutes every villager',
	execute(message, args) {
		const voiceChannel = message.member.voice.channel
		if (!voiceChannel)
			return message.channel.send('You need to be in a voice channel to assign roles!')

		const members = voiceChannel.members.filter(member => member !== message.member)
		members.forEach(member => {
			member.voice.setMute(false, 'Morning arrived. You woke up.')
		})
	},
}
