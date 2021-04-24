const 
    Discord = require('discord.js'),
    fs = require('fs'),
    YAML = require('yaml')

const 
    client = new Discord.Client(),
    secrets = YAML.parse(fs.readFileSync('./config/secrets.yaml', 'utf-8'))
    appToken = secrets.appToken,
    prefix = '!ww'

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
})


client.once('ready', () => {
    console.log('Werewolf Bot online')
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    console.log('Executed command', command)

    try {
        client.commands.get(command).execute(message, args)

    } catch(err) {
        message.channel.send('I don\'t know what to do with that.')
        console.log(err)
        
    }

})

client.login(appToken)