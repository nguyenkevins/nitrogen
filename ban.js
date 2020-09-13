module.exports = {
    name: 'ban',
    description: 'bot bans a user out of the server',
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
                        .ban({
                            reason: 'They were bad!',
                        })
                        .then(() => {
                            message.reply(`Successfully banned ${user.tag}`);
                        })
                        .catch(err => {
                            message.reply('I was unable to ban the member');
                            console.error(err);
                        });
                } else {
                    message.reply("that user isn't in this guild!");
                }
            }
        }
    },
};
