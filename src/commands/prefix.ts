import { Command } from "./Command";

export const prefix: Command<string> = function ({ channel }, prefix) {
  channel.send({
    content: `Hello, my prefix is ${prefix}. Run ${prefix}help for a list of commands`,
  });
};
