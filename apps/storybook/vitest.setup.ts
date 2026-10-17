import { setProjectAnnotations } from "@storybook/react-vite"
import { afterEach, beforeAll, beforeEach, expect, vi } from "vitest"

import preview from "./.storybook/preview.tsx"

const annotations = setProjectAnnotations([preview])

beforeAll(annotations.beforeAll)

const consoleError = vi.spyOn(console, "error")

beforeEach(() => {
  consoleError.mockClear()
})

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled()
})
