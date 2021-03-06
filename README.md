[![Build Status](https://travis-ci.com/nguyenkevins/nitrogen.svg?branch=master)](https://travis-ci.com/nguyenkevins/nitrogen)
# nitrogen

![Demo1](https://github.com/nguyenkevins/nitrogen/blob/master/misc/wallpaper.png)

### To-Do List: 
* Warning Database 
* Auto-Kick 
* Activity Bug Fix

## Summary
Nitrogen is a multi-purpose discord bot, which has the following functionalities:
* Remove a message that contains a banned word
* See the time when the user was last online
* View user experience progression and level
* Display server information
* Kick/Ban a user
* and many more...

## Prerequisite
* MySQL v8.x
* Node.js v12.x
* npm v6.x
* Discord.js v12

## MySQL Setup
This bot currently has 2 tables for it to run:
* exp (experience)
* date (user recent online time)

To create the exp table, do this:
```mysql
CREATE TABLE exp(id VARCHAR(30) NOT NULL, exp INT NOT NULL);
```

To create the date table, do this:
```mysql
CREATE TABLE date(id VARCHAR(30) NOT NULL, month INT NOT NULL, day INT NOT NULL, year INT NOT NULL, hour INT NOT NULL, minute INT NOT NULL);
```

By performing those 2 commands, the 2 tables should be described like this:

```
exp
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | varchar(30) | NO   |     | NULL    |       |
| exp   | int         | NO   |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+

date
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | varchar(30) | NO   |     | NULL    |       |
| month  | int         | NO   |     | NULL    |       |
| day    | int         | NO   |     | NULL    |       |
| year   | int         | NO   |     | NULL    |       |
| hour   | int         | NO   |     | NULL    |       |
| minute | int         | NO   |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+
```
