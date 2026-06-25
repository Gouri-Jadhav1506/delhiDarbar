const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// ── Monorepo root ──
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// ── Tell Metro to look for packages in the monorepo root ──
config.watchFolders = [monorepoRoot];

// ── Let Metro resolve node_modules from both the app AND the root ──
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// ── Wrap with NativeWind ──
module.exports = withNativeWind(config, { input: "./global.css" });
