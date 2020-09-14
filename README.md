[![Build Status](https://travis-ci.com/nguyenkevins/nitrogen.svg?branch=master)](https://travis-ci.com/nguyenkevins/nitrogen)
# nitrogen

![Demo1](https://github.com/nguyenkevins/nitrogen/blob/master/misc/wallpaper.png)

### To-Do List: 
* Warning Database 
* Auto-Kick 
* Activity Bug Fix

## Summary
Nitrogen is a multi-purpose discord bot, which has the following functionalities:
* Remove a message that contains a listed banned word
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
* Aho Corasick Javascript

## MySQL Setup
This bot currently has 2 tables for it to run:
* exp (experience)
* date (user recent online time)

To create the exp table, do this:
