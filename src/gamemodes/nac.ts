import { Gamemode } from "./Gamemode";
import { nac } from "../games";
import { GameOptions } from "./GameOptions";

export default {
  code: "nac",
  name: "naughts and crosses",
  func: nac,
} as Gamemode<GameOptions<typeof nac>>;
