import { Game } from "../games";

export interface Gamemode<T extends any[] = never[]> {
  code: string;
  name: string;
  func: Game<T>;
}
