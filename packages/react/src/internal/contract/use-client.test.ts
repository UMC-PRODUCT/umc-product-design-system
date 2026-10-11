import { describe, expect, it } from "vitest"

import { listSourceFiles, readSource } from "./source-files.ts"

const CLIENT_ONLY_PATTERNS = [
  /\buse[A-Z]\w*\(/,
  /from "@base-ui\/react/,
  /\son[A-Z]\w*=\{/,
]

const componentModules = listSourceFiles(".tsx").filter(
  (file) => !file.endsWith(".test.tsx"),
)

describe("Next.js 서버 컴포넌트 경계", () => {
  it.each(componentModules)(
    '%s: 훅, Base UI, 이벤트 핸들러를 쓰면 첫 줄이 "use client"다',
    (file) => {
      const source = readSource(file)
      const needsClient = CLIENT_ONLY_PATTERNS.some((pattern) =>
        pattern.test(source),
      )
      if (needsClient) {
        expect(source.startsWith('"use client"')).toBe(true)
      }
    },
  )
})
