const {
    token,
	prefix,
    host,
    user,
    password,
    database,
    startingExperience,
    incrementExperience,
    decrementExperience,
} = require('./config.json');

const Discord = require('discord.js');
const fs = require('fs');
const mysql = require("mysql");
let acalg = require('ahocorasick');

const client = new Discord.Client();


const start_d = new Date();

// put all commands into a Discord-made Map
client.commands = new Discord.Collection();

let connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

// Read misc/wordban.txt
let text = fs.readFileSync("misc/wordban.txt", "utf-8");
let textByLine = text.split("\r\n");


connection.connect(err => {
  if(err) {
    throw err
  }

  console.log("Connected to database!");
  connection.query("SHOW TABLES", console.log);
});

const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./${file}`);
  client.commands.set(command.name, command);
}

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function startXP() {
  return parseInt(startingExperience);
}

function incrementXP() {
  return parseInt(incrementExperience);
}

function decrementXP() {
  return parseInt(decrementExperience);
}

// command event
client.on('message', async message => {

  if (message.author.bot) {
    return;
  }

  let ac = new acalg(textByLine);
  let results = ac.search(message.toString());
  if(results.length > 0) {
    await message.delete();
    await message.reply("that is not allowed!");
    return;
  }

  await connection.query(`SELECT * FROM exp WHERE id = '${message.author.id}'`, (err, rows) => {
    if (err) throw err;
    let sql;
    //console.log(rows.length);
    //console.log(message.author.id);
    if (rows.length < 1) {
      sql = `INSERT INTO exp (id, exp) VALUES ('${message.author.id}', ${startXP()})`;
    } else {
      let exp = rows[0].exp;
      sql = `UPDATE exp SET exp = ${exp + incrementXP()} WHERE id = '${message.author.id}'`;
    }
    connection.query(sql);
  });

  //if (message.content === 'lenny') {
    //await message.delete();
    //await message.reply("that is not allowed!");
  //}

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)) {
    return;
  }

  try {
    client.commands.get(command).execute(message, args, connection, client, start_d);
    //console.log(args);
  } catch(error) {
    console.error(error);
    await message.reply("there is an issue with the command!")
  }
});

// presence update event
client.on('presenceUpdate', (oldPresence, newPresence) => {
  let member = newPresence.member;
  if (oldPresence.status !== newPresence.status) {
    if (newPresence.status === "offline") {
      const d = new Date();
      const hour = d.getUTCHours();
      const minute = d.getUTCMinutes();
      const day = d.getUTCDate();
      const month = d.getUTCMonth() + 1;
      const year = d.getUTCFullYear();
      //console.log(month + "/" + day + "/" + year + "   " + hour + ":" + minute);
      connection.query(`SELECT * FROM date WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;
        let sql;
        //console.log(rows.length);
        //console.log(message.author.id);
        if (rows.length < 1) {
          sql = `INSERT INTO date (id, month, day, year, hour, minute) VALUES ('${member.id}', ${month}, ${day}, ${year}, ${hour}, ${minute})`;
          connection.query(sql);
        } else {
          let sql1 = `UPDATE date SET month = ${month} WHERE id = '${member.id}'`;
          let sql2 = `UPDATE date SET day = ${day} WHERE id = '${member.id}'`;
          let sql3 = `UPDATE date SET year = ${year} WHERE id = '${member.id}'`;
          let sql4 = `UPDATE date SET hour = ${hour} WHERE id = '${member.id}'`;
          let sql5 = `UPDATE date SET minute = ${minute} WHERE id = '${member.id}'`;
          connection.query(sql1);
          connection.query(sql2);
          connection.query(sql3);
          connection.query(sql4);
          connection.query(sql5);
        }
      });
    }
  }
});