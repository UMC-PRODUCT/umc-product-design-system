import { describe, expect, it } from "vitest"

import { isActivePath } from "./isActivePath.ts"

describe("isActivePath", () => {
  it("currentPath가 href와 정확히 같으면 true", () => {
    expect(isActivePath("/projects", "/projects")).toBe(true)
  })

  it("currentPath가 href의 하위 경로면 true", () => {
    expect(isActivePath("/projects/123", "/projects")).toBe(true)
    expect(isActivePath("/projects/123/edit", "/projects")).toBe(true)
  })

  it("currentPath가 href 접두사를 포함하지만 다른 경로면 false", () => {
    expect(isActivePath("/projects-old", "/projects")).toBe(false)
    expect(isActivePath("/projectsadmin", "/projects")).toBe(false)
  })

  it("currentPath가 undefined이면 false", () => {
    expect(isActivePath(undefined, "/projects")).toBe(false)
    expect(isActivePath(undefined, "/")).toBe(false)
  })

  it("href가 '/'이면 currentPath가 정확히 '/'일 때만 true", () => {
    expect(isActivePath("/", "/")).toBe(true)
    expect(isActivePath("/projects", "/")).toBe(false)
    expect(isActivePath("/home", "/")).toBe(false)
  })

  it("currentPath와 href가 모두 루트 이외의 경로일 때 정확히 일치하면 true", () => {
    expect(isActivePath("/admin/members", "/admin/members")).toBe(true)
  })

  it("currentPath가 빈 문자열이면 false", () => {
    expect(isActivePath("", "/projects")).toBe(false)
  })
})
