import { DMChannel, NewsChannel, TextChannel, User } from "discord.js";
import { awaitMessage } from "../utils";
import { internal } from "../utils/internal";
import { Game } from "./Game";

const names: Record<string, string> = { r: "rock", p: "paper", s: "scissors" };

export const rps: Game = function (channel, user1, user2) {
  channel.send({
    content: `${user1.toString()} and ${user2.toString()}, check your DMs to choose your weapon`,
  });
  const options = ["", ""];

  const promise1 = getOption(channel, user1, (option) => (options[0] = option));

  const promise2 = getOption(channel, user2, (option) => (options[1] = option));

  Promise.all([promise1, promise2]).then(() => {
    if (options[0] && options[1]) {
      channel.send({
        content: `${user1.toString()} chose ${
          names[options[0]]
        } and ${user2.toString()} chose ${names[options[1]]}`,
      });
      const winner = check(options[0], options[1]);
      if (winner === 0) {
        channel.send({
          content: "It was a draw!",
        });
      } else if (winner === 1) {
        channel.send({
          content: `${user1.toString()} has won!`,
        });
      } else if (winner === 2) {
        channel.send({
          content: `${user2.toString()} has won!`,
        });
      }
    } else {
      internal(channel);
    }
  });
};

async function getOption(
  channel: TextChannel | DMChannel | NewsChannel,
  user: User,
  success: (option: string) => void
) {
  if (!user.dmChannel) {
    await user.createDM().catch((error) => {
      console.error(error);
      internal(channel);
    });
  }

  user.dmChannel!.send({
    content: "Please choose either rock (r), paper (p) or scissors (s)",
  });

  return awaitMessage(
    user.dmChannel!,
    user,
    ({ content }) => /^[rps]$/.test(content),
    30000
  )
    .then((message) => {
      if (message) {
        user.dmChannel!.send({
          content: `OK. Locked in with ${names[message.content]}`,
        });
        channel.send(`Received response from ${user.toString()}`);
        success(message.content);
      } else {
        channel.send(`${user.toString()} took too long to reply`);
      }
    })
    .catch((error) => {
      console.error(error);
      internal(channel);
    });
}

function check(option1: string, option2: string) {
  if (
    (option1 === "r" && option2 === "s") ||
    (option1 === "p" && option2 === "r") ||
    (option1 === "s" && option2 === "p")
  ) {
    return 1;
  }

  if (
    (option2 === "r" && option1 === "s") ||
    (option2 === "p" && option1 === "r") ||
    (option2 === "s" && option1 === "p")
  ) {
    return 2;
  }

  return 0;
}
