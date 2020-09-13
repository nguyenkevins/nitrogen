const {
    serverName,
    description,
} = require('./config.json');
module.exports = {
    name: 'info',
    description: 'bot replies with information about the server',
    execute(message, args, connection, client, start_d) {
        message.reply("Server Name:  " + serverName);
        message.reply("Description:  " + description);

        let startHour = start_d.getUTCHours();
        let startMinute = start_d.getUTCMinutes();
        let startDay = start_d.getUTCDate();
        let startMonth = (start_d.getUTCMonth() + 1);
        let startYear = start_d.getUTCFullYear();

        const cur_d = new Date();
        let curHour = cur_d.getUTCHours();
        let curMinute = cur_d.getUTCMinutes();
        let curDay = cur_d.getUTCDate();
        let curMonth = (cur_d.getUTCMonth() + 1);
        let curYear = cur_d.getUTCFullYear();

        if(startYear !== curYear) {
            if(curYear - startYear > 1) {
                message.reply("Nitrogen Bot has been on for " + (curYear - startYear) + " years.");
            } else {
                message.reply("Nitrogen Bot has been on for " + (curYear - startYear) + " year.");
            }
        } else if(startMonth !== curMonth) {
            if(curMonth - startMonth > 1) {
                message.reply("Nitrogen Bot has been on for " + (curMonth - startMonth) + " months.");
            } else {
                message.reply("Nitrogen Bot has been on for  " + (curMonth - startMonth) + " month.");
            }
        } else if(startDay !== curDay) {
            if (curDay - startDay > 1) {
                message.reply("Nitrogen Bot has been on for " + (curDay - startDay) + " days.");
            } else {
                message.reply("Nitrogen Bot has been on for " + (curDay - startDay) + " day.");
            }
        } else if(startHour !== curHour) {
            if (curHour - startHour > 1) {
                message.reply("Nitrogen Bot has been on for " + (curHour - startHour) + " hours.");
            } else {
                message.reply("Nitrogen Bot has been on for " + (curHour - startHour) + " hour.");
            }
        } else if(startMinute !== curMinute) {
            if (curMinute - startMinute > 1) {
                message.reply("Nitrogen Bot has been on for " + (curMinute - startMinute) + " minutes.");
            } else {
                message.reply("Nitrogen Bot has been on for " + (curMinute - startMinute) + " minute.");
            }
        } else {
            message.reply("Nitrogen Bot has been on for less than a minute.");
        }
    },
};
