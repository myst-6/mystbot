import { Command } from "./Command";

export const dustyyute: Command = function ({ channel, guild }) {
  let user;
  while ((user = guild?.members.cache.random())) {
    if (user.permissionsIn(channel).has("VIEW_CHANNEL") && !user.user.bot) {
      break;
    }
  }
  channel.send({
    content: "Wagwan you dusty yute " + user?.user.toString(),
  });
};
