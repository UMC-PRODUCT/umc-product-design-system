import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import starlightLlmsTxt from "starlight-llms-txt"

const LOCAL_SITE_URL = "http://localhost:5174"

export default defineConfig({
  site: LOCAL_SITE_URL,
  server: { port: 5174 },
  integrations: [
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
          ],
        },
        {
          label: "기여하기",
          items: [
            "contributing/token-workflow",
            "contributing/figma-normalization",
          ],
        },
      ],
      plugins: [starlightLlmsTxt()],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
