import { Fragment, jsx as reactJsx, jsxs as reactJsxs } from "react/jsx-runtime"

import { withComponentCode } from "../lib/component-code.ts"

export { Fragment }

export const jsx: typeof reactJsx = (type, props, key) =>
  reactJsx(type, withComponentCode(type, props), key)

export const jsxs: typeof reactJsxs = (type, props, key) =>
  reactJsxs(type, withComponentCode(type, props), key)
