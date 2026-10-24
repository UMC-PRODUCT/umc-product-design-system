import { composeStories } from "@storybook/react-vite"
import * as components from "@umc-product/react"
import { describe, expect, it } from "vitest"

import { specComponents } from "./docs-links.ts"

type StoryModule = Parameters<typeof composeStories>[0]

const STORY_GROUPS = [
  "액션",
  "폼 입력",
  "선택",
  "표시",
  "오버레이와 피드백",
  "앱 셸",
  "질문지",
  "차트",
  "캘린더",
]
const COMPONENTS_WITHOUT_STORY = new Set(["LinkProvider"])

const storyModules = import.meta.glob<StoryModule>(
  "./stories/**/*.stories.tsx",
  { eager: true },
)

const metas = Object.values(storyModules).map((module) => module.default)

type RunnableStory = { run: () => Promise<void> }

const isRunnableStory = (story: unknown): story is RunnableStory =>
  typeof story === "function" && "run" in story

const runnableStoriesOf = (module: StoryModule) =>
  Object.entries(composeStories(module)).flatMap(([name, story]) =>
    isRunnableStory(story) ? [[name, story] as const] : [],
  )

const isComponentExport = ([name, value]: [string, unknown]) =>
  /^[A-Z]/.test(name) && typeof value === "function"

describe.each(Object.entries(storyModules))("%s", (_, module) => {
  it("내보낸 스토리가 하나 이상 있다", () => {
    expect(runnableStoriesOf(module).length).toBeGreaterThan(0)
  })

  it.each(runnableStoriesOf(module))(
    "%s 스토리가 렌더된다",
    async (_, story) => {
      await story.run()
      expect(document.body.querySelector("[class*='umc-']")).not.toBeNull()
    },
  )
})

describe("스토리 목록", () => {
  it("모든 제목이 문서 사이트의 그룹 이름으로 시작한다", () => {
    const outsideGroups = metas
      .map((meta) => meta.title ?? "")
      .filter(
        (title) => !STORY_GROUPS.some((group) => title.startsWith(`${group}/`)),
      )
    expect(outsideGroups).toEqual([])
  })

  it("figma-spec.json이 있는 컴포넌트마다 스토리가 있다", () => {
    const covered = new Set(
      metas.map((meta) => meta.parameters?.["specComponent"]),
    )
    expect(specComponents.filter((name) => !covered.has(name))).toEqual([])
  })

  it("@umc-product/react가 export하는 컴포넌트마다 스토리가 있다", () => {
    const covered = new Set<unknown>(
      metas.flatMap((meta) => [
        meta.component,
        ...Object.values(meta.subcomponents ?? {}),
      ]),
    )
    const missing = Object.entries(components)
      .filter(isComponentExport)
      .filter(
        ([name, value]) =>
          !COMPONENTS_WITHOUT_STORY.has(name) && !covered.has(value),
      )
      .map(([name]) => name)
    expect(missing).toEqual([])
  })
})
