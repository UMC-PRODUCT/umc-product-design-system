import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from "react/jsx-runtime"

import { withCodeAttribute } from "../lib/component-code.ts"

export { Fragment }

export const jsx: typeof reactJsx = (type, props, key) =>
  reactJsx(type, withCodeAttribute(type, props), key)

export const jsxs: typeof reactJsxs = (type, props, key) =>
  reactJsxs(type, withCodeAttribute(type, props), key)
