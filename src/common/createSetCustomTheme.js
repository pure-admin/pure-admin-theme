import {
  createSetCustomThemeFile,
  getThemeStyleContent,
} from "@zougt/some-loader-utils"

// import pack from "../../package.json";

export const createSetCustomTheme = (options) => {
  const {
    styleTagId,
    defaultPrimaryColor,
    customThemeOutputPath,
    includeStyleWithColors,
    buildCommand,
    cacheThemeStyleContent,
  } = options
  return getThemeStyleContent().then(({ styleContent, themeRuleValues }) => {
    if (!cacheThemeStyleContent || cacheThemeStyleContent !== styleContent) {
      return createSetCustomThemeFile({
        defaultPrimaryColor,
        customThemeOutputPath,
        styleTagId,
        includeStyleWithColors,
        styleContent,
        themeRuleValues,
        importUtils: buildCommand !== "build",
        appendedContent:
          buildCommand === "build" ? "" : "\nexport default setCustomTheme;",
        preAppendedContent:
          "/**This file created by @pureadmin/theme,you can not modify it.*/\n",
      })
    }
    return Promise.resolve()
  })
}

