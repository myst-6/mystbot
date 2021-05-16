import { Message } from "discord.js";

export type Command<T = undefined> = T extends undefined
  ? (message: Message) => void
  : (message: Message, options: T) => void;
