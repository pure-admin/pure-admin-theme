/* eslint-disable global-require */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-env browser */
import {
  basePath,
  assetsDir,
  buildCommand,
  browerPreprocessorOptions,
} from "./toBrowerEnvs"

/** hex转rgb */
const hexToRgb = (str) => {
  let hxs = str.replace("#", "").match(/../g)
  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  return hxs
}

/** rgb转hex */
const rgbToHex = (a, b, c) => {
  let hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  }
  return `#${hexs.join("")}`
}

/** 加深颜色值 */
export const darken = (color, level) => {
  let rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

/** 变浅颜色值 */
export const lighten = (color, level) => {
  let rgbc = hexToRgb(color)
  for (let i = 0; i < 3; i++)
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

const getRegstr = (scopeName) => {
  return `(^${scopeName}\\s+|\\s+${scopeName}\\s+|\\s+${scopeName}$|^${scopeName}$)`
}

const addClassNameToHtmlTag = ({ scopeName, multipleScopeVars }) => {
  const $multipleScopeVars =
    Array.isArray(multipleScopeVars) && multipleScopeVars.length
      ? multipleScopeVars
      : browerPreprocessorOptions.multipleScopeVars

  let currentClassName = document.documentElement.className

  if (new RegExp(getRegstr(scopeName)).test(currentClassName)) {
    return
  }
  $multipleScopeVars.forEach((item) => {
    currentClassName = currentClassName.replace(
      new RegExp(getRegstr(item.scopeName), "g"),
      ` ${scopeName} `
    )
  })
  document.documentElement.className = currentClassName.replace(
    /(^\s+|\s+$)/g,
    ""
  )
}

const createThemeLinkTag = ({ id, href }) => {
  // 不存在的话，则新建一个
  const styleLink = document.createElement("link")
  styleLink.rel = "stylesheet"
  styleLink.href = href
  styleLink.id = id
  return styleLink
}

/**
 *
 * @param {object} opts
 * @param {string} opts.scopeName
 * @returns
 */
export const toggleTheme = (opts) => {
  const options = {
    // multipleScopeVars: [],
    scopeName: "theme-default",
    customLinkHref: (href) => href,
    // themeLinkTagId: "theme-link-tag",
    // "head" || "body"
    // themeLinkTagInjectTo: "head",
    ...opts,
  }

  if (buildCommand !== "build" || !browerPreprocessorOptions.extract) {
    addClassNameToHtmlTag(options)
    return
  }
  const linkId =
    options.themeLinkTagId || browerPreprocessorOptions.themeLinkTagId
  let styleLink = document.getElementById(linkId)
  const href = options.customLinkHref(
    `${(basePath || "").replace(/\/$/, "")}${`/${browerPreprocessorOptions.outputDir || assetsDir || ""
      }/${options.scopeName}.css`.replace(/\/+(?=\/)/g, "")}`
  )
  if (styleLink) {
    // 假如存在id为theme-link-tag 的link标签，创建一个新的添加上去加载完成后再60毫秒后移除旧的
    styleLink.id = `${linkId}_old`
    const newLink = createThemeLinkTag({ id: linkId, href })
    if (styleLink.nextSibling) {
      styleLink.parentNode.insertBefore(newLink, styleLink.nextSibling)
    } else {
      styleLink.parentNode.appendChild(newLink)
    }
    newLink.onload = () => {
      setTimeout(() => {
        styleLink.parentNode.removeChild(styleLink)
        styleLink = null
      }, 60)
      // 注：如果是removeCssScopeName:true移除了主题文件的权重类名，就可以不用修改className 操作
      if (!browerPreprocessorOptions.removeCssScopeName) {
        addClassNameToHtmlTag(options)
      }
    }
    return
  }
  // 不存在的话，则新建一个
  styleLink = createThemeLinkTag({ id: linkId, href })
  // 注：如果是removeCssScopeName:true移除了主题文件的权重类名，就可以不用修改className 操作
  if (!browerPreprocessorOptions.removeCssScopeName) {
    addClassNameToHtmlTag(options)
  }
  document[
    (
      options.themeLinkTagInjectTo ||
      browerPreprocessorOptions.themeLinkTagInjectTo ||
      ""
    ).replace("-prepend", "")
  ].appendChild(styleLink)
}
