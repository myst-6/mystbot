import dotenv from "dotenv";
import Discord from "discord.js";
import { prefix, ping, ip, dustyyute, challenge, help } from "./commands";
import { gamemodes } from "./gamemodes";
import { stringify } from "./gamemodes/stringify";

dotenv.config();

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  const { content } = message;
  const expectedPrefix = "?!";
  const receivedPrefix = content.slice(0, expectedPrefix.length);

  if (expectedPrefix === receivedPrefix) {
    const args = content.slice(receivedPrefix.length).split(" ");
    const command = args.splice(0, 1)[0];

    switch (command) {
      case "help":
        help(message, expectedPrefix);
        break;
      case "ping":
        ping(message);
        break;
      case "ip":
        ip(message);
        break;
      case "dustyyute":
        dustyyute(message);
        break;
      case "challenge":
        if (!args[1]) {
          message.reply({
            content: `Please specify a gamemode. Options are ${gamemodes
              .map(stringify)
              .join(", ")}`,
          });
        } else {
          for (const gamemode of gamemodes) {
            if (args[1] === gamemode.code) {
              return challenge(message, gamemode);
            }
          }
          message.reply({
            content: `Unknown gamemode '${args[1]}.' Options are ${gamemodes
              .map(stringify)
              .join(", ")}`,
          });
          break;
        }

      default:
        message.channel.send({
          content: `I love ${[command, ...args].join(" ")}`,
        });
        break;
    }
  } else {
    if (message.mentions.users.has(client.user!.id)) {
      prefix(message, expectedPrefix);
    }
  }
});

client.login(process.env.TOKEN);
