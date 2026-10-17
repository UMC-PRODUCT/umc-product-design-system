type FigmaSpec = {
  component: string
  page?: string
}

const PAGES_DOCS_URL = "https://umc-product.github.io/umc-product-design-system"

export const DOCS_SITE_URL = (
  import.meta.env.STORYBOOK_DOCS_URL || PAGES_DOCS_URL
).replace(/\/+$/, "")

const PAGES_OUTSIDE_SPEC: Readonly<Record<string, string>> = {
  TopNavigation: "/components/shell/top-navigation/",
  BottomNavigation: "/components/shell/bottom-navigation/",
}

const specs = Object.values(
  import.meta.glob<FigmaSpec>(
    "../../../packages/react/src/**/figma-spec.json",
    { eager: true, import: "default" },
  ),
)

export const specComponents = specs.map((spec) => spec.component)

const docsLinkOf = (page: string) =>
  `<a href="${DOCS_SITE_URL}${page}" target="_blank" rel="noreferrer">문서 사이트에서 모든 변형 보기</a>`

export const docsParameters = (page: string, summary?: string) => ({
  docs: {
    description: {
      component:
        summary === undefined
          ? docsLinkOf(page)
          : `${summary}\n\n${docsLinkOf(page)}`,
    },
  },
})

export const componentParameters = (component: string, summary?: string) => {
  const page =
    specs.find((spec) => spec.component === component)?.page ??
    PAGES_OUTSIDE_SPEC[component]
  if (page === undefined) {
    throw new Error(
      `${component}의 figma-spec.json에서 문서 경로를 찾지 못했습니다`,
    )
  }
  return { specComponent: component, ...docsParameters(page, summary) }
}
