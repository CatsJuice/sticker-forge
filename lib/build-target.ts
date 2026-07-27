export const BUILD_TARGET =
  typeof __BUILD_TARGET__ === "undefined" ? "web" : __BUILD_TARGET__;

export const IS_XHS_BUILD =
  typeof __XHS_BUILD__ === "undefined"
    ? BUILD_TARGET === "xhs"
    : __XHS_BUILD__;
