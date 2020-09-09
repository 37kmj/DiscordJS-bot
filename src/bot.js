require('dotenv').config();
const {Client, WebhookClient} = require('discord.js');

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
); 

const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} logged in...`);
});

client.on('message', async (message) => {

    if (message.author.bot) return; //the function is returned when bot has sent message
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === "kick") {
            if(!message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply("You do not have permissions to use that command!")
            }
            if(args.length === 0) return message.reply("Please provide an ID");
            const member = message.guild.members
            .cache
            .get(args[0])
            if(member) {
                member
                .kick()
                .then((member) => { 
                    message.channel.send(`${member} has been kicked!`)
                })
                .catch((error) => message.channel.send("I don't have permissions to do that..."));
                
            } else {
                message.channel.send("Member not found...");
            }
        } else if(CMD_NAME === "ban") {
            if(!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply("You do not have permissions to use that command!");
            }
            if(args.length === 0) return message.reply("Please provide an ID");
            
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send("User was banned successfully!");
                
            } catch (err) {
                console.log(err);
                message.channel.send("Error occured - user not not found or insufficient permission...")
            }
        } else if (CMD_NAME === "announce") {
            const msg = args.join(" ");
            console.log(msg);
            webhookClient.send(msg);
        }
    }

}); 

client.on("messageReactionAdd", (reaction, user) => {

    console.log("Added");
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '752936349358882976') {
        switch(name) {
            case '🚀':
                member.roles.add('750331688952791130');
                break;
                case '⭐':
                    member.roles.add('750331481196462170');
                    break;
                    case '💻':
                        member.roles.add('750331773380067328');
                        break;
                        case '💰':
                            member.roles.add('750331924521680957');
                            break;
                            case '✍️': 
                            member.roles.add('750331849615736923');
                            break;
        }
    }

});

client.on('messageReactionRemove', (reaction, user) => {

    console.log("Removed");
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === '752936349358882976') {
        switch(name) {
            case '🚀':
                member.roles.remove('750331688952791130');
                break;
                case '⭐':
                    member.roles.remove('750331481196462170');
                    break;
                    case '💻':
                        member.roles.remove('750331773380067328');
                        break;
                        case '💰':
                            member.roles.remove('750331924521680957');
                            break;
                            case '✍️': 
                            member.roles.remove('750331849615736923');
                            break;
        }
    }

});


console.log(process.env.DISCORDJS_BOT_TOKEN)
client.login(process.env.DISCORDJS_BOT_TOKEN);