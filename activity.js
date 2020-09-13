module.exports = {
    name: 'activity',
    description: 'bot replies with the username most recent activity online',
    execute(message, args, connection, client, start_d) {
        if(args === "") {
            message.reply("write someone's username.");
        } else {
            let stringPhrase = args.toString();
            if(stringPhrase.substring(0,2) !== "<@") {
                message.reply("that is not a username.");
            } else if(stringPhrase.substring(0,2) === "<@") {
                //console.log(stringPhrase.substring(2,stringPhrase.length-1));
                connection.query(`SELECT * FROM date WHERE id = '${stringPhrase.substring(2,stringPhrase.length-1)}'`, (err, rows) => {
                    if (err) throw err;
                    let monthDB = parseInt(rows[0].month);
                    let dayDB = parseInt(rows[0].day);
                    let yearDB = parseInt(rows[0].year);
                    let hourDB = parseInt(rows[0].hour);
                    let minuteDB = parseInt(rows[0].minute);
                    const d = new Date();
                    let curHour = d.getUTCHours();
                    let curMinute = d.getUTCMinutes();
                    let curDay = d.getUTCDate();
                    let curMonth = (d.getUTCMonth() + 1);
                    let curYear = d.getUTCFullYear();
                    // FIX THIS
                    const selectUser = client.users.cache.get(stringPhrase.substring(2,stringPhrase.length-1));
                    if(selectUser.presence.status === "online" || selectUser.presence.status === "idle" || selectUser.presence.status === "dnd") {
                        message.reply("that user is present at the moment.");
                    } else if(yearDB !== curYear) {
                        if(curYear - yearDB > 1) {
                            message.reply("that user has not been online for " + (curYear - yearDB) + "years.");
                        } else {
                            message.reply("that user has not been online for " + (curYear - yearDB) + "year.");
                        }
                    } else if(monthDB !== curMonth) {
                        if(curMonth - monthDB > 1) {
                            message.reply("that user has not been online for " + (curMonth - monthDB) + "months.");
                        } else {
                            message.reply("that user has not been online for " + (curMonth - monthDB) + "month.");
                        }
                    } else if(dayDB !== curDay) {
                        if (curDay - dayDB > 1) {
                            message.reply("that user has not been online for " + (curDay - dayDB) + "days.");
                        } else {
                            message.reply("that user has not been online for " + (curDay - dayDB) + "day.");
                        }
                    } else if(hourDB !== curHour) {
                        if (curHour - hourDB > 1) {
                            message.reply("that user has not been online for " + (curHour - hourDB) + "hours.");
                        } else {
                            message.reply("that user has not been online for " + (curHour - hourDB) + "hour.");
                        }
                    } else if(minuteDB !== curMinute) {
                        if (curMinute - minuteDB > 1) {
                            message.reply("that user has not been online for " + (curMinute - minuteDB) + "minutes.");
                        } else {
                            message.reply("that user has not been online for " + (curMinute - minuteDB) + "minute.");
                        }
                    } else {
                        message.reply("that user has not been online for less than a minute.");
                    }
                    //connection.query(sql);
                });
            }
        }
    },
};