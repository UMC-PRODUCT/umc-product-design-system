import react from "@astrojs/react"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

import { BASE_PATH, SITE_URL, STORYBOOK_URL } from "./site-config.mjs"
import { componentCodePlugin } from "./src/lib/component-code-plugin.mjs"

const REPOSITORY_URL =
  "https://github.com/UMC-PRODUCT/umc-product-design-system"

const COMPONENT_GROUPS = [
  { label: "액션", directory: "components/actions" },
  { label: "폼 입력", directory: "components/forms" },
  { label: "선택", directory: "components/selection" },
  { label: "표시", directory: "components/display" },
  { label: "오버레이와 피드백", directory: "components/overlay" },
  { label: "앱 셸", directory: "components/shell" },
  { label: "질문지", directory: "components/questionnaire" },
  { label: "차트", directory: "components/chart" },
  { label: "캘린더", directory: "components/calendar" },
]

const MOVED_PAGES = {
  "/components/forms/text-info-button": `${BASE_PATH}/components/actions/text-info-button/`,
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH || "/",
  server: { port: 5174 },
  redirects: MOVED_PAGES,
  integrations: [
    react(),
    starlight({
      title: "UMC Design System",
      description: "UMC 프로덕트 팀의 디자인 토큰과 사용 가이드",
      favicon: "/favicon.svg",
      social: [
        { icon: "github", label: "GitHub", href: REPOSITORY_URL },
        ...(STORYBOOK_URL === undefined
          ? []
          : [{ icon: "storybook", label: "Storybook", href: STORYBOOK_URL }]),
      ],
      lastUpdated: true,
      defaultLocale: "root",
      locales: {
        root: { label: "한국어", lang: "ko" },
      },
      customCss: ["./src/styles/global.css"],
      components: {
        Head: "./src/components/starlight/Head.astro",
        Header: "./src/components/starlight/Header.astro",
        Sidebar: "./src/components/starlight/Sidebar.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
        Pagination: "./src/components/starlight/Pagination.astro",
        ThemeSelect: "./src/components/starlight/ThemeSelect.astro",
        ThemeProvider: "./src/components/starlight/ThemeProvider.astro",
      },
      sidebar: [
        {
          label: "시작하기",
          items: [
            "getting-started/installation",
            "getting-started/tailwind",
            "getting-started/troubleshooting",
          ],
        },
        {
          label: "파운데이션",
          items: [
            "foundations/color",
            "foundations/typography",
            "foundations/grid",
            "foundations/spacing",
            "foundations/radius",
            "foundations/shadow",
            "foundations/icons",
          ],
        },
        {
          label: "컴포넌트",
          items: COMPONENT_GROUPS.map(({ label, directory }) => ({
            label,
            items: [{ autogenerate: { directory } }],
          })),
        },
        {
          label: "릴리스",
          items: ["releases/changelog", "releases/versioning"],
        },
      ],
      plugins: [starlightLlmsTxt({ rawContent: true })],
    }),
  ],
  vite: {
    plugins: [tailwindcss(), componentCodePlugin()],
  },
})
