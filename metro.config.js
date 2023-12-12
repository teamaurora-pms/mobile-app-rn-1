// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('mjs');
defaultConfig.resolver.assetExts.push('glb');
defaultConfig.resolver.assetExts.push('gltf');
defaultConfig.resolver.assetExts.push('png');
defaultConfig.resolver.assetExts.push('jpg');
module.exports = defaultConfig;