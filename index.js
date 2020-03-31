const Discord = require('discord.js');
const fs = require('fs');
const Features = require('./files/features.js');
const Commands = require('./files/utils.js');
const client = new Discord.Client();

const key = '.Ck8VSJRHxhmAvsJgFzPXuCx0ljs';
const token = 'NjkxMTAxNzU3MDMxMzE3NTQ0.XoKkaA' + key;

const PREFIX = '|'
const COLOR = '#FF918B'

//Data
var dataLoad = fs.readFileSync('./data/data.json');
var data = JSON.parse(dataLoad);

//Features data
var featuresEnables = data.enables.features;
var channelsDisabled = data.enables.channelsDisabled;
var words = data.words;

//Msg
var msgRecording = false;

//Embeds
const helpEmbed = 
"```" +
"HELP PANEL - Chicken-Bot\n\n" +
"Commands(Prefix:'|')                         Description\n" +
"help                                         - Information about this bot.\n" +
"feature [feature name] [optional:true/false] - Disable/Enable features.\n" +
"msg [start/end/data]                         - Start/End/Show message data.\n" +
"channel [true/false]                         - Disable/Enable this bot in this channel.\n\n" +
"Features                                     Description\n" +
"dad_greeting                                 - The dad greeting meme.\n" +
"nato_censor                                  - Censor swears with NATO alphabet." +
"```";

//Ready
client.on('ready', () => {
    console.log("Let's go");
})

client.on('message', msg => {
    //Commands
    if (msg.content.startsWith(PREFIX)) {
        let args = msg.content.substring(1).split(' ');
        let lowargs = msg.content.toLowerCase().substring(1).split(' ');

            switch(args[0]) {
                case 'feature':
                    if (!channelsDisabled.includes(msg.channel.id)) {
                        switch(args[1]) {
                            case 'all':
                                featuresEnables.dad_greeting = Commands.toggle(featuresEnables.dad_greeting, args[2]);
                                msg.channel.send('Dad Greeting => ' + featuresEnables.dad_greeting);
                                featuresEnables.nato_censor = Commands.toggle(featuresEnables.nato_censor, args[2]);
                                msg.channel.send('NATO Censor => ' + featuresEnables.nato_censor);
                            break;

                            case 'dad_greeting':
                                featuresEnables.dad_greeting = Commands.toggle(featuresEnables.dad_greeting, args[2]);
                                msg.channel.send('Dad Greeting => ' + featuresEnables.dad_greeting);
                            break;

                            case 'nato_censor':
                                featuresEnables.nato_censor = Commands.toggle(featuresEnables.nato_censor, args[2]);
                                msg.channel.send('NATO Censor => ' + featuresEnables.nato_censor);
                            break;

                            case undefined:
                                msg.channel.send(`Status:
                                Dad Greeting: ` + featuresEnables.dad_greeting + `
                                NATO Censor: ` + featuresEnables.nato_censor);
                            break;
                        }
                        data.enables.features = featuresEnables;
                    }
                break;

                case 'msg':
                    if (!channelsDisabled.includes(msg.channel.id)) {
                        switch(args[1]) {
                            case 'start':
                                if (msgRecording) {
                                    msg.channel.send('Already recording words');
                                    break;
                                }
                                msgRecording = true;
                                msg.channel.send('Start recording words');
                            break;

                            case 'end':
                                if (!msgRecording) {
                                    msg.channel.send('Not recording words');
                                    break;
                                }
                                msgRecording = false;
                                msg.channel.send('Stopped recording words');
                            break;

                            case 'clear':
                                if (args[2] === 'all' || args[2] === undefined) {
                                    words.word = [];
                                    words.count = [];
                                    msg.channel.send('Cleared all word data');
                                } else if (!isNaN(args[2])) {
                                    for (i = 0; i < args[2] - '0'; ++i) {
                                        words.word.pop();
                                        words.count.pop()
                                    }
                                    msg.channel.send('Cleared ' + args[2] - '0' + ' word data');
                                }
                            break;

                            case 'data':
                                let wordStr = '';
                                let countStr = '';
                                let n = 50;
                                if (!isNaN(args[2])) {
                                    n = args[2] - '0';
                                }

                                if (words.word.length < 50) {
                                    n = words.word.length;
                                }

                                let sorted = Commands.insertionSort(words.count, words.word);

                                for (i = 0; i < n; ++i) {
                                    wordStr += sorted.word[i] + '\n';
                                    countStr += sorted.arr[i] + '\n';
                                }

                                let wordEmbed = new Discord.MessageEmbed()
                                .setTitle('Top ' + n + ' frequently used words')
                                .setColor(COLOR)
                                .addFields(
                                    { name: 'Word', value: wordStr, inline: true },
                                    { name: 'Count', value: countStr, inline: true },
                                )
                                msg.channel.send(wordEmbed);
                            break;
                        }
                    }
                break;

            case 'channel':
                switch(args[1]) {
                    case 'false':
                        let flag = false;
                        for (i = 0; i < channelsDisabled.length; ++i) {
                            if (channelsDisabled[i] === msg.channel.id) {
                                msg.channel.send('Chicken-Bot is already disabled in ' + msg.channel.name + '!');
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            channelsDisabled.push(msg.channel.id);
                            msg.channel.send('Chicken-Bot is disabled in ' + msg.channel.name + '.');
                        }
                    break;

                    case 'true':
                        for (i = 0; i < channelsDisabled.length; ++i) {
                            if (channelsDisabled[i] === msg.channel.id) {
                                for (j = i; j < channelsDisabled.length; ++j) {
                                    channelsDisabled[j] = channelsDisabled[j + 1];
                                }
                                channelsDisabled.length--;
                                msg.channel.send('Chicken-Bot is enabled in ' + msg.channel.name + '.');
                                break;
                            }
                        }
                    break;
                }
                data.enables.channelsDisabled = channelsDisabled;
            break;

            case 'help':
                switch (args[1]) {
                    case undefined:
                        msg.channel.send(helpEmbed);
                    break;

                    case 'emoji':
                        msg.channel.send('Emoji link for bot dev: \nhttps://getemoji.com/');
                    break;
                }
            break;
        }

        //React
        switch(lowargs[0]) {
            case 'good':
                switch(lowargs[1]) {
                    case 'bot':
                        msg.react('❤️');
                    break;
                }
            break;

            case 'bad':
                switch(lowargs[1]) {
                    case 'bot':
                        msg.react('😢');
                    break;
                }
            break;
        }
    }

    let lowmsg = msg.content.toLowerCase();
    //Creeper
    if (lowmsg === 'creeper' && !channelsDisabled.includes(msg.channel.id)) {
        msg.channel.send('Aw man.')
    }

    //Sad
    if (lowmsg === 'sad' && !channelsDisabled.includes(msg.channel.id)) {
        msg.channel.send('☹️')
    }

    //NATO censor
    if (featuresEnables.nato_censor && !channelsDisabled.includes(msg.channel.id)) {
        let output = Features.nato_censor(msg.content);

        if (output) {
            msg.delete();
            msg.channel.send('**[NATO alphabet censor]**' + msg.author.toString() + ': ' + output);
        }
    }

    //Dad greeting
    if (featuresEnables.dad_greeting && !msg.author.bot && !channelsDisabled.includes(msg.channel.id)) {
        let output = Features.dad_greeting(msg.content) 
        if (output) {
            msg.channel.send('Hi ' + output.toString() + ', I am Dad.');
        }
    }

    //Saving words
    if (!msg.author.bot && msgRecording) {
        let args = msg.content.toLowerCase().split(/[\W]+/);

        for (i = 0; i < args.length; ++i) {
            if (args[i] != '') {
                if (words.word.includes(args[i])) {
                    words.count[words.word.indexOf(args[i])]++;
                } else {
                    words.word.push(args[i]);
                    words.count.push(1);
                }
            }
        }
    }

    //Saving data
    let dataSave = JSON.stringify(data, null, 4);
    fs.writeFile('./data/data.json', dataSave, saved);
    function saved(err) { }
})

client.login(token);