import react from "@astrojs/react"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

const SITE_URL = "https://umc-product.github.io"
const BASE_PATH = "/umc-product-design-system"
const REPOSITORY_URL =
  "https://github.com/UMC-PRODUCT/umc-product-design-system"

const COMPONENT_GROUPS = [
  { label: "액션", directory: "components/actions" },
  { label: "폼 입력", directory: "components/forms" },
  { label: "선택", directory: "components/selection" },
  { label: "오버레이와 피드백", directory: "components/overlay" },
  { label: "앱 셸", directory: "components/shell" },
]

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  server: { port: 5174 },
  integrations: [
    react(),
    starlight({
      title: "UMC Design System",
      description: "UMC 프로덕트 팀의 디자인 토큰과 사용 가이드",
      favicon: "/favicon.svg",
      social: [{ icon: "github", label: "GitHub", href: REPOSITORY_URL }],
      editLink: { baseUrl: `${REPOSITORY_URL}/edit/develop/apps/docs/` },
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
        ThemeSelect: "./src/components/starlight/ThemeSelect.astro",
        ThemeProvider: "./src/components/starlight/ThemeProvider.astro",
      },
      sidebar: [
        {
          label: "시작하기",
          items: [
            "getting-started/installation",
            "getting-started/tailwind",
            "getting-started/vanilla-extract",
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
        {
          label: "기여하기",
          items: [
            "contributing/local-development",
            "contributing/release-process",
            "contributing/token-workflow",
            "contributing/component-guide",
            "contributing/decisions",
          ],
        },
      ],
      plugins: [starlightLlmsTxt({ rawContent: true })],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
