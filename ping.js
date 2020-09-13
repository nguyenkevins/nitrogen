module.exports = {
  name: 'ping',
  description: 'bot replies with pong!',
  execute(message, args, connection, client, start_d) {
    message.reply("pong!");
  },
};
