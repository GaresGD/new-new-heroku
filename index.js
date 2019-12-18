const Discord = require('discord.js');
const bot = new Discord.Client;
const ms = require('ms');
const ytdl = require('ytdl-core');

const token = 'NjU1NjczNzMyNTMwMTc2MDA5.XfXh8A.nEOretmmO230nRpySu1SNnrn9iA';
const PREFIX = '?';

var version = '**__1.0.0__**'
var botPrefix = '**__?__**'
var botStatus = '**__Online__**'

var servers = {};





var d = new Date,
    dformat = [d.getMonth() + 1,
        d.getDate(),
        d.getFullYear()
    ].join('/') + ' ' + [d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].join(':');






bot.on('ready', () => {
    console.log('The bot has been successfully started!');
    bot.user.setActivity('children play', {
        type: "WATCHING"
    });
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if (!channel) return;

    channel.send(`Welcome ${member}!`);
});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'info':
            const embed = new Discord.RichEmbed()
                .setTitle('Bot Information')
                .addField('Current Bot Version:', version)
                .addField('Current Bot Prefix:', botPrefix)
                .addField('Bot Status:', botStatus)
                .setColor(0x58D68D)
                .setTimestamp(d)
            message.channel.sendEmbed(embed);
            break;

        case 'mute':
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if (!person) return message.channel.send("Couldn't find that member, make sure you have entered their name properly!")

            let mainrole = message.guild.roles.find(role => role.name === "Newbie");
            let muterole = message.guild.roles.find(role => role.name === "muted");

            if (!muterole) return message.channel.send("Couldn't find the mute role!");

            let time = args[2];

            if (!time) {
                return message.reply("You did not specify a time!");
            }

            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`);

            setTimeout(function () {
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);
                message.channel.send(`@${person.user.tag} has been unmuted!`)
            }, ms(time));

            break;

        case 'kick':
            if (!args[1]) message.channel.send('Please specify a user!')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('Kicked!').then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('Unable to kick the member!');
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn\t in the server!")

                }
            } else {
                message.reply('that user isn\'t in the guild!');
            }
            break;
        case 'ban':
            message.delete(5000)
            message.reply('The **Ban Function** is currently unavailable!')
                .then(msg => {
                    msg.delete(10000)
                })
                .catch
            break;
        case 'play':
                message.delete(5000)
            function play(connection, message) {
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {
                    filter: "audioonly"
                }));

                server.queue.shift();

                server.dispatcher.on("end", function () {
                    if (server.queue[0]) {
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });

            }

            if (!args[1]) {
                message.channel.send("Please specify a link!");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("You must be in a voice channel to play music!");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);
            })





            break;
    }

})

// bot.login(token);
client.login(process.env.NjU1NjczNzMyNTMwMTc2MDA5.Xfm3pg.ggpxxY89FT8odI202SqimFjHCdg);
