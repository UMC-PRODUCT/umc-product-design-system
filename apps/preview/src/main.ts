import "./style.css"

import { cssVariables, textStyleUtilities } from "@umc-product/design-tokens"

import { renderColorSection } from "./colors.ts"
import { element } from "./dom.ts"
import { renderGridSection } from "./grid.ts"
import { renderTypographySection } from "./typography.ts"
import { renderVariableSection } from "./variables.ts"

const app = document.querySelector<HTMLDivElement>("#app")
if (!app) {
  throw new Error("#app 요소가 없습니다")
}

const header = element("header", "px-8 py-8", [
  element("h1", "text-heading-1-semibold", ["UMC 디자인 토큰 미리보기"]),
  element("p", "text-body-3-regular mt-2 text-black/60", [
    `@umc-product/design-tokens 생성물을 그대로 불러온 페이지입니다. CSS 변수 ${cssVariables.length}개, 텍스트 스타일 ${textStyleUtilities.length}개.`,
  ]),
])

const typography = renderTypographySection()

app.append(
  header,
  renderColorSection(),
  typography.node,
  renderGridSection(),
  renderVariableSection(),
)

typography.fillComputedSpecs()
