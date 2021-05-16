import { chopsticks } from "../games/chopsticks";
import { Gamemode } from "./Gamemode";
import { GameOptions } from "./GameOptions";

export default {
  code: "chopsticks",
  name: "Chopsticks",
  func: chopsticks,
} as Gamemode<GameOptions<typeof chopsticks>>;
