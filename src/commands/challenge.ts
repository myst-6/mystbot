import { Gamemode } from "../gamemodes";
import { awaitMessage } from "../utils";
import { Command } from "./Command";

export const challenge: Command<Gamemode> = function (
  { author, channel, mentions },
  { name, func }
) {
  const user = mentions.users.array()[0];
  if (author.id === user.id) {
    return channel.send({
      content: `${user.toString()}, you cannot challenge yourself`,
    });
  }
  if (user.bot) {
    return channel.send({
      content: "Please mention a user, and not a bot",
    });
  }
  if (user) {
    channel.send({
      content: `${user.toString()}, ${author.toString()} is challenging you to a game of ${name}. Type 'yes' to accept or 'no' to deny`,
    });
    awaitMessage(channel, user)
      .then((message) => {
        if (message) {
          if (message.content.toLowerCase().includes("y")) {
            channel.send({
              content: `OK. Starting game between ${author.toString()} and ${user.toString()}`,
            });
            func(channel, author, user);
          } else {
            channel.send({
              content: `${author.toString()}, challenge declined by ${user.toString()}`,
            });
          }
        } else {
          channel.send({
            content: `${user.toString()} took too long to reply`,
          });
        }
      })
      .catch(() => {
        channel.send({
          content: "There was an internal error",
        });
      });
  } else {
    channel.send({
      content: "Please mention a user, and not a role",
    });
  }
};
