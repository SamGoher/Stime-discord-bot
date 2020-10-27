const express = require(`express`);
const path = require(`path`);
const app = express();
const discord = require(`discord.js`);
const bot = new discord.Client();
const embed = new discord.MessageEmbed();
const PORT = process.env.PORT || 80;

const token = `NzIzMjI2ODkzOTE4NDA0NjUw.XuzhZg.6qzPjOSUmKuxId4TT0PnhwwHAkY`;

app.use(express.static(`public`));

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `./views/home.html`));
});

app.use((req, res) => {
    res.redirect(`/`);
})

bot.login(token);

bot.on(`ready`, () => {
    console.log(`Let's study!!`);
});

bot.on(`message`, (message) => {
    if(message.content === `$st`){
        if(message.member.voice.serverMute === true) {
            message.reply(`you already study`);
            return;
        }
        else if(!message.member.voice.channel){
            message.reply('You need to join a voice channel first!!');
            return;
        } else {
            message.reply(`Let's do it!!`);
            message.member.voice.channel.join();
            message.member.voice.channel.leave();
            message.member.voice.setMute(true);
            setTimeout(() => {
                message.member.voice.setMute(false);
                message.member.voice.channel.join();
                message.member.voice.channel.leave();
            },1500000);
        }
        console.log(`${message.member.displayName}=st`);
        return;
    }

    else if(message.content === `$rem`) {
        if(message.member.voice.serverMute === true) {
            message.reply(`you already study`);
            return;
        }
        else if(!message.member.voice.channel){
            message.reply('You need to join a voice channel first!!');
            return;
        } else {
            message.reply(`OK, i'll remind you`);
            reminder(embed, message);
            console.log(`${message.member.displayName}=rem`);
            return;
        }
    }

    else if(message.content === `$help`) {
        message.reply(`
        '$st' => study time : you can't speak for 25 minutes
        '$rem' => reminder : remind you for studying every 5 minutes
        '$stop' => server unmute
        '$help' => recursion ;)
        `);
        console.log(`${message.member.displayName} $help`);
        return;
    }
    else if(message.content === `$stop`) {
        if(message.member.voice.serverMute === false) {
            message.reply(`you already have fun`);
            return;
        }
        else if(!message.member.voice.channel){
            message.reply('You need to join a voice channel first!!');
            console.log(`${message.member.displayName}=stop`);
            return;
        } else {
            message.reply('OK, have fun!!');
            message.member.voice.setMute(false);
            console.log(`${message.member.displayName}=stop`);
            return;
        }
    }
});

let i = 4;
function reminder(x, y) {
    setTimeout(() => {
        x
        .setTitle(`Studying alert!!`)
        .setDescription(`it's time, Let's study man!!`);
        y.author.send(x);
        if(i >0){
            i--;
            reminder(x, y);
        }
    },300000);
};

app.listen(PORT, () => {
    console.log(`listening to port ${PORT} ...`);
});