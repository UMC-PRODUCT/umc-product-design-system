import { Fragment, jsxDEV as reactJsxDEV } from "react/jsx-dev-runtime"

import { withComponentCode } from "../lib/component-code.ts"

export { Fragment }

export const jsxDEV: typeof reactJsxDEV = (
  type,
  props,
  key,
  isStatic,
  source,
  self,
) =>
  reactJsxDEV(type, withComponentCode(type, props), key, isStatic, source, self)
