module.exports = {
	name: 'ping',
	description: 'Tests the bot.',
	usage: '',
	examples: [],
	execute(message, args) {
		message.channel.send('Whats up!')
	},
}
