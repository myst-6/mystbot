"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
var gamemodes_1 = require("../gamemodes");
var help = function (_a, prefix) {
    var channel = _a.channel;
    channel.send({
        content: "\n__**General**__\n`" + prefix + "help` - gets a list of commands and what they do\n`" + prefix + "ping` - gets the ping of the bot\n`" + prefix + "dustyyute` - pings a random person in the text channel and calls them a dusty yute\n`" + prefix + "ip` - gets <@446711256737644556>'s IPv4 address\n`" + prefix + "challenge` - challenges a user to a game - see the *Games* section for more info\n`" + prefix + "literallyanythingelse` - the bot will say that it likes what you put - kinda sus ngl\n\n__**Games**__\n`" + prefix + "challenge` - syntax: " + prefix + "challenge <@User> <gamemode>\n" + gamemodes_1.gamemodes.map(function (_a) {
            var code = _a.code, name = _a.name;
            return "`" + code + "` - " + name;
        }).join("\n") + "\n",
    });
};
exports.help = help;
