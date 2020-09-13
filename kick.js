module.exports = {
    name: 'kick',
    description: 'bot kicks a user out of the server',
    execute(message, args, connection, client, start_d) {
        if (args === "") {
            message.reply("write someone's username.");
        } else {
            let stringPhrase = args.toString();
            if (stringPhrase.substring(0, 2) !== "<@") {
                message.reply("that is not a username.");
            } else if (stringPhrase.substring(0, 2) === "<@") {
                const user = args;
                const member = message.guild.member(user);
                if (member) {
                    member
                        .kick('Made a threat to the server rule!')
                        .then(() => {
                            message.reply(`successfully kicked ${user.tag}`);
                        })
                        .catch(err => {
                            message.reply('I was unable to kick the member');
                            console.error(err);
                        });
                } else {
                    message.reply("that user isn't in this guild!");
                }
            }
        }
    },
};
