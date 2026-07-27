import { IS_XHS_BUILD } from "./build-target";

export function assetPath(path: string) {
  const normalized = path.replace(/^\.?\//, "");
  return IS_XHS_BUILD ? `./${normalized}` : `/${normalized}`;
}
