export type GameOptions<T> = T extends (
  arg0: any,
  arg1: any,
  arg2: any,
  ...args: infer P
) => any
  ? P
  : never;
