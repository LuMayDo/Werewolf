module.exports = {
    name: 'ping',
    description: 'Tests the bot.',
    execute (message, args) {
        message.channel.send('Whats up!')
        
    }
}