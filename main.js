const Discord = require('discord.js'),
	fs = require('fs')

const client = new Discord.Client(),
	appToken = process.env.appToken
		? process.env.appToken
		: require('./config/secrets.json').appToken,
	{ prefix } = require('./config/config.json')

client.commands = new Discord.Collection()

const commandFiles = fs
	.readdirSync('./commands/')
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const command = require(`./commands/${file}`)

		client.commands.set(command.name, command)
	})

client.once('ready', () => {
	console.log('Werewolf Bot online')

	client.user.setActivity(`${prefix} help`, {
		type: 'WATCHING',
	})
})

client.on('message', message => {
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
		return

	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift().toLowerCase()

	console.log('Executed command', command)
	console.log('args', args)

	try {
		client.commands.get(command).execute(message, args)
	} catch (err) {
		message.channel.send("I don't know what to do with that.")
		console.log(err)
	}
})

client.login(appToken)
