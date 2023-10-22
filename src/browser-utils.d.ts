import { multipleScopeVarsOptions } from "./index";

/**
 * @description 颜色值加深
 * @param color `hex` 格式
 * @param level 色值度
 * @returns 加深后的颜色值，`hex` 格式
 */
declare const darken: (color: string, level: number) => string;

/**
 * @description 颜色值变浅
 * @param color `hex` 格式
 * @param level 色值度
 * @returns 变浅后的颜色值，`hex` 格式
 */
declare const lighten: (color: string, level: number) => string;

/**
 * @description 切换预设主题
 */
declare const toggleTheme: (options: multipleScopeVarsOptions) => void;

export { darken, lighten, toggleTheme };
