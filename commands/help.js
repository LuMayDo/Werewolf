const { prefix } = require('../config/config.json')

module.exports = {
    name: "help",
    description: "Lists all the commands.",
    execute (message, args) {
        let createEmbed = (commandData) => {
            console.log(commandData)

            let commandString = "",
                maxNameLength = commandData.clone().sort((a, b) => b.name.length - a.name.length).first().name.length

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
                    text: `Help requested by ${message.author.username}`
                },
                fields: [
                    {
                        name: 'Commands',
                        value: commandString
                    }
                ]
            }

            console.log('embed', helpEmbed)
            return helpEmbed
        } 

        const { commands } = message.client

        message.channel.send({embed: createEmbed(commands)})
    }
}