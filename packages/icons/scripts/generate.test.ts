import { describe, expect, it } from "vitest"

import {
  assertIconPrimaryColor,
  assertLogoPrimaryColor,
  buildComponents,
  frameSize,
  generateAll,
  pictogramDefaultColor,
  readIconManifest,
  resolveCanvas,
  resolveMode,
  resolveWeight,
  toComponentName,
} from "./generate.ts"
import { mapIconColor, mapPictogramColor } from "./rules.ts"

const icon = (nodeId: string) => ({ nodeId, kind: "icon" as const })
const pictogram = (nodeId: string) => ({ nodeId, kind: "pictogram" as const })
const exported = (width: number, height: number) => ({
  viewBox: `0 0 ${width} ${height}`,
  width,
  height,
})

describe("toComponentName", () => {
  it("구분자와 접두사가 달라도 같은 규칙으로 이름을 만든다", () => {
    expect(toComponentName("Icon/Chevron_Left", "Icon")).toBe("ChevronLeftIcon")
    expect(toComponentName("Icon_Check_circle", "Icon")).toBe("CheckCircleIcon")
    expect(toComponentName("Icon/home", "Icon")).toBe("HomeIcon")
    expect(toComponentName("Icon/Notification-Off", "Icon")).toBe(
      "NotificationOffIcon",
    )
    expect(toComponentName("Icon/ThumbsUp", "Icon")).toBe("ThumbsUpIcon")
    expect(toComponentName("Pictogram/Under-construction", "Pictogram")).toBe(
      "UnderConstructionPictogram",
    )
  })

  it("피그마 이름의 오타를 고친다", () => {
    expect(toComponentName("Icon/Menu", "Icon")).toBe("MenuIcon")
    expect(toComponentName("Icon_menu", "Icon")).toBe("MenuIcon")
    expect(toComponentName("Icon/Eye_visable", "Icon")).toBe("EyeVisibleIcon")
    expect(toComponentName("Icon/Eye_invisable", "Icon")).toBe(
      "EyeInvisibleIcon",
    )
  })
})

describe("resolveWeight", () => {
  it("Weight 축의 값을 코드 굵기로 읽는다", () => {
    expect(resolveWeight("Weight=Thin").weight).toBe("thin")
    expect(resolveWeight("Size=24 icon, Weight=Fill").weight).toBe("fill")
    expect(resolveWeight("Weight=Regular")).toMatchObject({
      weight: "regular",
      rule: { status: "accepted" },
    })
  })

  it("속성과 값이 뒤집힌 변형 이름은 바로잡고 확인 대기로 남긴다", () => {
    expect(resolveWeight("Regular=Weight")).toMatchObject({
      weight: "regular",
      rule: { status: "pending" },
    })
  })

  it("규칙에 없는 굵기와 피그마가 지운 임시 이름은 실패한다", () => {
    expect(() => resolveWeight("Weight=Heavy")).toThrow("굵기 규칙이 없는")
    expect(() => resolveWeight("Size=24")).toThrow("굵기 규칙이 없는")
    expect(() => resolveWeight("Weight=Bold")).toThrow("굵기 규칙이 없는")
    expect(() => resolveWeight("Property 1=Regular")).toThrow(
      "굵기 규칙이 없는",
    )
  })
})

describe("resolveMode", () => {
  it("모드 축이 없으면 light이고 Varient 오타도 읽는다", () => {
    expect(resolveMode("")).toBe("light")
    expect(resolveMode("Size=30px")).toBe("light")
    expect(resolveMode("Varient=Dark")).toBe("dark")
  })

  it("규칙에 없는 모드는 실패한다", () => {
    expect(() => resolveMode("Mode=Sepia")).toThrow("모드 규칙이 없는")
  })
})

describe("색 규칙", () => {
  it("아이콘 주색은 currentColor, 고정색은 토큰 style이다", () => {
    expect(mapIconColor("#3f4141")).toEqual({ attribute: "currentColor" })
    expect(mapIconColor("#dc3d3d")).toEqual({
      style: "var(--umc-color-red-500)",
    })
    expect(() => mapIconColor("#123456")).toThrow("#123456")
  })

  it("픽토그램 주색은 모두 currentColor이고 토큰에 없는 고정색은 피그마 값 그대로다", () => {
    expect(mapPictogramColor("#02746c")).toEqual({ attribute: "currentColor" })
    expect(mapPictogramColor("#008a80")).toEqual({ attribute: "currentColor" })
    expect(mapPictogramColor("#b3e6e1")).toEqual({ attribute: "#b3e6e1" })
    expect(() => mapPictogramColor("#123456")).toThrow("#123456")
  })

  it("아이콘에 주색이 없으면 실패한다", () => {
    expect(() => assertIconPrimaryColor(["#3f4141", "#ffffff"])).not.toThrow()
    expect(() => assertIconPrimaryColor(["#ffffff"])).toThrow("주색")
  })

  it("로고에 주색이 없으면 실패한다", () => {
    expect(() => assertLogoPrimaryColor(["#3f4141"])).not.toThrow()
    expect(() => assertLogoPrimaryColor([])).toThrow("로고 주색")
  })

  it("프레임은 0 0에서 시작하고 너비와 높이가 양수여야 한다", () => {
    expect(frameSize("0 0 148 44")).toEqual({ width: 148, height: 44 })
    expect(frameSize("0  0 148  44")).toEqual({ width: 148, height: 44 })
    expect(() => frameSize("0 0 148")).toThrow("형식")
    expect(() => frameSize("0 0 148 0")).toThrow("형식")
    expect(() => frameSize("1 0 148 44")).toThrow("형식")
  })

  it("픽토그램 기본색은 주색의 토큰이고 주색이 하나가 아니면 실패한다", () => {
    expect(pictogramDefaultColor(["#02746c", "#ddf4f1"])).toBe(
      "var(--umc-color-icon-brand-strong-600)",
    )
    expect(pictogramDefaultColor(["#008a80", "#b3e6e1"])).toBe(
      "var(--umc-color-icon-brand-medium-500)",
    )
    expect(pictogramDefaultColor(["#0b6b64"])).toBe("#0b6b64")
    expect(() => pictogramDefaultColor(["#02746c", "#008a80"])).toThrow(
      "하나가 아닙니다",
    )
    expect(() => pictogramDefaultColor(["#ffffff"])).toThrow("하나가 아닙니다")
  })
})

describe("resolveCanvas", () => {
  it("규칙이 없으면 기본 캔버스만 받는다", () => {
    expect(resolveCanvas(icon("1:1"), exported(24, 24))).toEqual({
      viewBox: "0 0 24 24",
      offset: undefined,
    })
    expect(resolveCanvas(pictogram("1:1"), exported(30, 30)).viewBox).toBe(
      "0 0 30 30",
    )
    expect(() => resolveCanvas(icon("1:1"), exported(23.8462, 25))).toThrow(
      "규칙을 추가하세요",
    )
  })

  it("viewBox 예외 노드는 피그마 프레임 값을 그대로 쓴다", () => {
    expect(resolveCanvas(icon("3095:97510"), exported(23.8462, 25))).toEqual({
      viewBox: "0 0 23.8462 25",
      offset: undefined,
    })
    expect(() => resolveCanvas(icon("3095:97510"), exported(24, 24))).toThrow(
      "0 0 23.8462 25",
    )
  })

  it("안쪽 도형만 내보낸 노드는 프레임 안 원래 위치로 옮긴다", () => {
    expect(resolveCanvas(icon("3060:94614"), exported(16, 24))).toEqual({
      viewBox: "0 0 24 24",
      offset: { x: 4, y: 0 },
    })
    expect(() => resolveCanvas(icon("3060:94614"), exported(24, 24))).toThrow(
      "들어가지 않습니다",
    )
  })

  it("원점이 0 0이 아닌 viewBox는 실패한다", () => {
    expect(() =>
      resolveCanvas(icon("1:1"), {
        viewBox: "2 2 24 24",
        width: 24,
        height: 24,
      }),
    ).toThrow("0 0에서 시작하지")
  })
})

describe("buildComponents", () => {
  const components = buildComponents(readIconManifest())
  const byName = (name: string) => {
    const found = components.find((component) => component.name === name)
    if (!found) {
      throw new Error(`${name}이 없습니다`)
    }
    return found
  }

  it("Person 픽토그램을 뺀 모든 원문을 컴포넌트로 만든다", () => {
    const variantCount = components.reduce(
      (count, component) => count + component.variants.length,
      0,
    )
    expect(variantCount).toBe(readIconManifest().sources.length - 1)
    expect(
      components.some((component) => component.name === "PersonPictogram"),
    ).toBe(false)
  })

  it("Logo/UMC를 currentColor로 그리는 UmcLogo로 만든다", () => {
    const logo = byName("UmcLogo")
    expect(logo.kind).toBe("logo")
    expect(logo.figmaName).toBe("Logo/UMC")
    expect(logo.variants.map((variant) => variant.viewBox)).toEqual([
      "0 0 148 44",
    ])
    expect(logo.variants[0]?.jsx).toContain('fill="currentColor"')
    expect(logo.variants[0]?.jsx).not.toMatch(/#[0-9a-f]{6}/i)
  })

  it("로고 모듈은 프레임 크기를 숫자로 넘겨 화면에서 viewBox를 읽지 않는다", () => {
    const module = [...generateAll()].find(([file]) =>
      file.endsWith("UmcLogo.tsx"),
    )?.[1]
    expect(module).toContain("frame: { width: 148, height: 44 },")
    expect(module).not.toContain("viewBox")
  })

  it("피그마에서 바로잡힌 변형 이름 규칙이 남아 있으면 실패한다", () => {
    const manifest = readIconManifest()
    const fixed = {
      ...manifest,
      sources: manifest.sources.filter(
        (source) => source.variantName !== "Regular=Weight",
      ),
    }
    expect(() => buildComponents(fixed)).toThrow("원문에 없는 변형 이름 규칙")
  })

  it("배치 보정과 viewBox 예외를 변형마다 반영한다", () => {
    const chevron = byName("ChevronLeftIcon").variants
    expect(chevron.map((variant) => variant.viewBox)).toEqual([
      "0 0 24 24",
      "0 0 24 24",
      "0 0 24 24",
    ])
    expect(
      chevron.every((variant) =>
        variant.jsx.startsWith('<g transform="translate(4 0)">'),
      ),
    ).toBe(true)

    const time = byName("TimeIcon").variants
    expect(
      Object.fromEntries(time.map((variant) => [variant.key, variant.viewBox])),
    ).toEqual({
      thin: "0 0 24 24",
      regular: "0 0 24 24",
      fill: "0 0 23.8462 25",
    })
  })

  it("고정색은 토큰 style로, 주색은 currentColor로 바꾼다", () => {
    const notification = byName("NotificationIcon").variants[0]
    expect(notification?.jsx).toContain('fill="currentColor"')
    expect(notification?.jsx).toContain('fill: "var(--umc-color-red-500)"')
    expect(notification?.jsx).not.toMatch(/"#[0-9a-f]{6}"/i)

    const underConstruction = byName("UnderConstructionPictogram").variants
    expect(
      Object.fromEntries(
        underConstruction.map((variant) => [variant.key, variant.color]),
      ),
    ).toEqual({
      light: "var(--umc-color-icon-brand-strong-600)",
      dark: "var(--umc-color-icon-brand-medium-500)",
    })
  })

  it("아이콘에는 피그마 색 리터럴이 남지 않는다", () => {
    const literals = components
      .filter((component) => component.kind === "icon")
      .flatMap((component) =>
        component.variants.flatMap(
          (variant) => variant.jsx.match(/"#[0-9a-f]{3,8}"/gi) ?? [],
        ),
      )
    expect(literals).toEqual([])
  })
})
