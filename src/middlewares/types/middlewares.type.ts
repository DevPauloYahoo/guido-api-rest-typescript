export type TConstraints = { [p: string]: string } | undefined;
export type ResErroZod =
  | { message: string; path: (string | number)[] }
  | undefined;
