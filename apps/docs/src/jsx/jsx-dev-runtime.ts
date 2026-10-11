import { Fragment, jsxDEV as reactJsxDEV } from "react/jsx-dev-runtime"

import { withCodeAttribute } from "../lib/component-code.ts"

export { Fragment }

export const jsxDEV: typeof reactJsxDEV = (
  type,
  props,
  key,
  isStatic,
  source,
  self,
) =>
  reactJsxDEV(type, withCodeAttribute(type, props), key, isStatic, source, self)
