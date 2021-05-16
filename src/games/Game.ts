import { DMChannel, NewsChannel, TextChannel, User } from "discord.js";

export type Game<T extends any[] = never[]> = (
  channel: TextChannel | DMChannel | NewsChannel,
  user1: User,
  user2: User,
  ...args: T
) => void;
