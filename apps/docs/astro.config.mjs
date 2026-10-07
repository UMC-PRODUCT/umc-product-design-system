import react from "@astrojs/react"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

const LOCAL_SITE_URL = "http://localhost:5174"

const COMPONENT_GROUPS = [
  { label: "액션", directory: "components/actions" },
  { label: "폼 입력", directory: "components/forms" },
  { label: "선택", directory: "components/selection" },
  { label: "오버레이와 피드백", directory: "components/overlay" },
  { label: "앱 셸", directory: "components/shell" },
]

export default defineConfig({
  site: LOCAL_SITE_URL,
  server: { port: 5174 },
  integrations: [
    react(),
    starlight({
      title: "UMC Design System",
      description: "UMC 프로덕트 팀의 디자인 토큰과 사용 가이드",
      defaultLocale: "root",
      locales: {
        root: { label: "한국어", lang: "ko" },
      },
      customCss: ["./src/styles/global.css"],
      sidebar: [
        {
          label: "시작하기",
          items: [
            "getting-started/installation",
            "getting-started/tailwind",
            "getting-started/vanilla-extract",
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
          label: "기여하기",
          items: [
            "contributing/token-workflow",
            "contributing/component-guide",
            "contributing/decisions",
            "contributing/figma-normalization",
            "contributing/icon-normalization",
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
