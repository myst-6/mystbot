import { DMChannel, Message, NewsChannel, TextChannel, User } from "discord.js";

export const awaitMessage = function (
  channel: TextChannel | DMChannel | NewsChannel,
  user: User,
  predicate: (message: Message) => boolean = () => true,
  time = 15000
) {
  return channel
    .awaitMessages(
      (...messages) => {
        return messages.some(
          (message) =>
            message?.channel?.id === channel.id &&
            message?.author?.id === user.id &&
            predicate(message)
        );
      },
      {
        time,
        max: 1,
      }
    )
    .then((messages) => {
      if (messages.size === 0) {
        return null;
      } else {
        return messages.array()[0];
      }
    })
    .catch((error) => {
      throw error;
    });
};
