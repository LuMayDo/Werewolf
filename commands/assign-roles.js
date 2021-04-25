module.exports = {
    name: "assign-roles",
    description: "Assigns roles to every user.",
    execute (message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to assign roles!')

        let roles = [
            'Werewolf',
            'Werewolf',
            'Witch',
            'Guardian',
            'Amor',
            'Döner Man',
        ]

        try {
            const members = voiceChannel.members.filter(member => member !== message.member);

            let roleList = '',
                randomRoles = roles.sort(() => Math.random() - 0.5)

            members.forEach(member => {
                let role = randomRoles.shift()

                roleList += `${member.displayName} - ${role}`
                member.send(`You are ${role}`)
            })

            message.channel.send('Everybody should get a role.')

        } catch (err) {
            message.channel.send('Seems like something went wrong.')
            console.log(err)

        }
    }
}