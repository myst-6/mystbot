import { Gamemode } from "./Gamemode";

export const stringify = function ({ code, name }: Gamemode) {
  return `${code} (${name})`;
};
