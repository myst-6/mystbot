import { DMChannel, NewsChannel, TextChannel } from "discord.js";

export const internal = function (
  channel: TextChannel | DMChannel | NewsChannel
) {
  channel.send({
    content: "There was an internal error",
  });
};
