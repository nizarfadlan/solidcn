export { defaultTheme } from "./default.js";
export { slateTheme } from "./slate.js";
export { zincTheme } from "./zinc.js";
export { roseTheme } from "./rose.js";
export { blueTheme } from "./blue.js";
export { greenTheme } from "./green.js";
export { orangeTheme } from "./orange.js";

import type { ThemeDefinition } from "../tokens.js";
import { blueTheme } from "./blue.js";
import { defaultTheme } from "./default.js";
import { greenTheme } from "./green.js";
import { orangeTheme } from "./orange.js";
import { roseTheme } from "./rose.js";
import { slateTheme } from "./slate.js";
import { zincTheme } from "./zinc.js";

export type BuiltInTheme = "default" | "slate" | "zinc" | "rose" | "blue" | "green" | "orange";

export const builtInThemes: Record<BuiltInTheme, ThemeDefinition> = {
  default: defaultTheme,
  slate: slateTheme,
  zinc: zincTheme,
  rose: roseTheme,
  blue: blueTheme,
  green: greenTheme,
  orange: orangeTheme,
};

export function getTheme(name: BuiltInTheme): ThemeDefinition {
  return builtInThemes[name];
}
