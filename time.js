module.exports = {
    name: 'time',
    description: 'bot replies with time based on UTC',
    execute(message, args, connection, client, start_d) {
        const d = new Date();
        const hour = d.getUTCHours();
        const minute = d.getUTCMinutes();
        const day = d.getUTCDate();
        const month = d.getUTCMonth() + 1;
        const year = d.getUTCFullYear();
        message.reply(month + "/" + day + "/" + year + "  " + hour + ":" + minute);
        message.reply("this server uses Coordinated Universal Time (UTC).");
    },
};
