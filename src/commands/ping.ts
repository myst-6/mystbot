import { Command } from "./Command";

export const ping: Command = function ({ channel, createdTimestamp }) {
  channel.send({
    content: `Pong! ${Date.now() - createdTimestamp}ms`,
  });
};
