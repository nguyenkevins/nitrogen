module.exports = {
    name: 'exp',
    description: 'bot replies with exp of the selected username',
    execute(message, args, connection, client, start_d) {
        if(args === "") {
            message.reply("write someone's username.");
        } else {
            let stringPhrase = args.toString();
            if(stringPhrase.substring(0,2) !== "<@") {
                message.reply("that is not a username.");
            } else if(stringPhrase.substring(0,2) === "<@") {
                //console.log(stringPhrase.substring(2,stringPhrase.length-1));
                connection.query(`SELECT * FROM exp WHERE id = '${stringPhrase.substring(2,stringPhrase.length-1)}'`, (err, rows) => {
                    if (err) throw err;
                    let expDB = parseInt(rows[0].exp);
                    message.reply(stringPhrase + " is level " + Math.floor(expDB/100) + ".");
                    message.reply(stringPhrase + " is " + Math.floor((((expDB/100))-Math.floor(expDB/100))*100) + "% of the way to level-up.");
                });
            }
        }
    },
};