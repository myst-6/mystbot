import { gamemodes } from "../gamemodes";
import { Command } from "./Command";

export const help: Command<string> = function ({ channel }, prefix) {
  channel.send({
    content: `
__**General**__
\`${prefix}help\` - gets a list of commands and what they do
\`${prefix}ping\` - gets the ping of the bot
\`${prefix}dustyyute\` - pings a random person in the text channel and calls them a dusty yute
\`${prefix}ip\` - gets <@446711256737644556>'s IPv4 address
\`${prefix}challenge\` - challenges a user to a game - see the *Games* section for more info
\`${prefix}literallyanythingelse\` - the bot will say that it likes what you put - kinda sus ngl

__**Games**__
\`${prefix}challenge\` - syntax: ${prefix}challenge <@User> <gamemode>
${gamemodes.map(({ code, name }) => `\`${code}\` - ${name}`).join("\n")}
`,
  });
};
