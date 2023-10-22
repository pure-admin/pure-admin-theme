import { PluginOption } from "vite";

interface multipleScopeVarsOptions {
  /** 预设主题色的名称 */
  scopeName?: string;
  /** 变量文件内容不应该夹带样式代码，设定上只需存在变量 */
  path?: any;
  /** `varsContent` 参数等效于 `path` 文件的内容，可以让 `defaultPrimaryColor` 与 `@primary-color` 值只写一遍，`varsContent` 与 `path` 必须选一个使用 */
  varsContent?: string;
}

interface includeStyleWithColorsOptions {
  /** 颜色 */
  color?: string;
  /** 该颜色是否跟随主题色梯度变化，默认 `false` */
  inGradient?: boolean;
}

interface Options {
  scss: {
    /** 是否启用任意主题色模式，默认 `false` 不启用 */
    arbitraryMode?: boolean;
    /** 默认的主题色，用于对其他颜色值形成对比值 */
    defaultPrimaryColor?: string;
    /** 提供多组变量文件 */
    multipleScopeVars?: Array<multipleScopeVarsOptions>;
    /** `css` 中不是由主题色变量生成的颜色，也让它抽取到主题 `css` 内，可以提高权重 */
    includeStyleWithColors?: Array<includeStyleWithColorsOptions>;
    /** 默认取 `multipleScopeVars[0].scopeName` */
    defaultScopeName?: string;
    /** 在生产环境是否抽取独立的主题 `css` 文件，默认 `false` 不抽取 */
    extract?: boolean;
    /** 独立主题 `css` 文件的输出路径，默认取 `vite` 指定生成静态资源的存放路径 `build.assetsDir` https://cn.vitejs.dev/config/build-options.html#build-assetsdir */
    outputDir?: string;
    /** 会选取 `defaultScopeName` 对应的主题 `css` 文件在 `html` 添加 `link`，默认 `theme-link-tag` */
    themeLinkTagId?: string;
    /** 将主题样式文件插入到哪里，默认 `head` */
    themeLinkTagInjectTo?: "head" | "head-prepend" | "body" | "body-prepend";
    /** 是否移除抽取的 `css` 文件内对应 `scopeName` 的权重类名，默认 `false` 不移除 */
    removeCssScopeName?: boolean;
    /** 自定义 `css` 文件名称的函数 */
    customThemeCssFileName?: Function;
  };
}

declare const themePreprocessorPlugin: (rawOptions?: Options) => PluginOption;

export {
  themePreprocessorPlugin,
  PluginOption,
  multipleScopeVarsOptions,
  includeStyleWithColorsOptions,
  Options,
};
