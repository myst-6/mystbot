"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var discord_js_1 = __importDefault(require("discord.js"));
var commands_1 = require("./commands");
var gamemodes_1 = require("./gamemodes");
var stringify_1 = require("./gamemodes/stringify");
dotenv_1.default.config();
var client = new discord_js_1.default.Client();
client.once("ready", function () {
    console.log("Ready!");
});
client.on("message", function (message) {
    var content = message.content;
    var expectedPrefix = "?!";
    var receivedPrefix = content.slice(0, expectedPrefix.length);
    if (expectedPrefix === receivedPrefix) {
        var args = content.slice(receivedPrefix.length).split(" ");
        var command = args.splice(0, 1)[0];
        switch (command) {
            case "help":
                commands_1.help(message, expectedPrefix);
                break;
            case "ping":
                commands_1.ping(message);
                break;
            case "ip":
                commands_1.ip(message);
                break;
            case "dustyyute":
                commands_1.dustyyute(message);
                break;
            case "challenge":
                if (!args[1]) {
                    message.reply({
                        content: "Please specify a gamemode. Options are " + gamemodes_1.gamemodes
                            .map(stringify_1.stringify)
                            .join(", "),
                    });
                }
                else {
                    for (var _i = 0, gamemodes_2 = gamemodes_1.gamemodes; _i < gamemodes_2.length; _i++) {
                        var gamemode = gamemodes_2[_i];
                        if (args[1] === gamemode.code) {
                            return commands_1.challenge(message, gamemode);
                        }
                    }
                    message.reply({
                        content: "Unknown gamemode '" + args[1] + ".' Options are " + gamemodes_1.gamemodes
                            .map(stringify_1.stringify)
                            .join(", "),
                    });
                    break;
                }
            default:
                message.channel.send({
                    content: "I love " + __spreadArray([command], args).join(" "),
                });
                break;
        }
    }
    else {
        if (message.mentions.users.has(client.user.id)) {
            commands_1.prefix(message, expectedPrefix);
        }
    }
});
client.login(process.env.TOKEN);
