import { cssVariables } from "@umc-product/design-tokens"

import { element, readVariable, section } from "./dom.ts"

const variableRow = (name: string): HTMLElement =>
  element("tr", "text-caption-1-regular border-t border-black/5", [
    element("td", "py-2 pr-6 font-mono", [name]),
    element("td", "py-2 font-mono text-black/70", [readVariable(name)]),
  ])

export const renderVariableSection = (): HTMLElement =>
  section(
    "전체 CSS 변수",
    `base.css가 선언한 변수 ${cssVariables.length}개와 브라우저가 계산한 값입니다.`,
    [
      element("div", "overflow-x-auto", [
        element("table", "w-full text-left", [
          element("thead", "", [
            element("tr", "text-label-5-semibold text-black/60", [
              element("th", "py-2 pr-6", ["변수"]),
              element("th", "py-2", ["값"]),
            ]),
          ]),
          element("tbody", "", cssVariables.map(variableRow)),
        ]),
      ]),
    ],
  )
