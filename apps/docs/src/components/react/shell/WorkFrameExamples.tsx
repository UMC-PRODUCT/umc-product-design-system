"use client"

import {
  Header,
  HeaderHomeLink,
  NumberBadge,
  PageHeader,
  SideNavigation,
  type BreadcrumbItem,
  type NavItem,
  type NumberBadgeColor,
  type SideNavigationItem,
} from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"

import { PreviewLinks } from "./PreviewLinks.tsx"

type MenuPage = { label: string; href: string }
type MenuGroup = { label: string; children: MenuPage[] }
type MenuEntry = MenuPage | MenuGroup
type LabelPlace = "header" | "side" | "breadcrumb" | "title"
type LabelOf = (entry: MenuEntry, place: LabelPlace) => ReactNode

const RECRUITING_AREA: MenuPage = { label: "리크루팅", href: "/recruiting" }

const NAV_ITEMS: MenuPage[] = [
  { label: "소개", href: "/about" },
  { label: "모집 안내", href: "/guide" },
  { label: "프로젝트", href: "/projects" },
  RECRUITING_AREA,
  { label: "설정", href: "/settings" },
]

const RECRUITMENT_LIST: MenuPage = {
  label: "모집 목록",
  href: "/recruiting/list",
}

const RECRUITMENT_GROUP: MenuGroup = {
  label: "모집 관리",
  children: [
    { label: "모집 생성", href: "/recruiting/new" },
    RECRUITMENT_LIST,
    { label: "모집 인원 설정", href: "/recruiting/capacity" },
  ],
}

const RECRUITING_MENU: MenuEntry[] = [
  { label: "대시보드", href: "/recruiting" },
  RECRUITMENT_GROUP,
  { label: "평가 관리", href: "/recruiting/reviews" },
  { label: "히스토리", href: "/recruiting/history" },
]

const CURRENT_GENERATION = 11

const PAGE_DESCRIPTION = "페이지를 간결하고 명확하게 설명합니다."

const menuIcon = <PeoplePictogram color="currentColor" />

const isMenuGroup = (entry: MenuEntry): entry is MenuGroup =>
  "children" in entry

const plainLabel: LabelOf = (entry) => entry.label

function locate(path: string) {
  for (const entry of RECRUITING_MENU) {
    if (!isMenuGroup(entry)) {
      if (entry.href === path) return { page: entry }
      continue
    }
    const page = entry.children.find((child) => child.href === path)
    if (page) return { page, group: entry }
  }
  return undefined
}

function navItemsOf(labelOf: LabelOf): NavItem[] {
  return NAV_ITEMS.map((item) => ({
    label: labelOf(item, "header"),
    href: item.href,
  }))
}

function sideItemsOf(labelOf: LabelOf): SideNavigationItem[] {
  return RECRUITING_MENU.map((entry) =>
    isMenuGroup(entry)
      ? {
          label: labelOf(entry, "side"),
          icon: menuIcon,
          children: entry.children.map((child) => ({
            label: labelOf(child, "side"),
            href: child.href,
          })),
        }
      : { label: labelOf(entry, "side"), href: entry.href, icon: menuIcon },
  )
}

function breadcrumbsOf(
  path: string,
  labelOf: LabelOf,
): BreadcrumbItem[] | undefined {
  const location = locate(path)
  if (!location) return undefined
  return [
    {
      label: labelOf(RECRUITING_AREA, "breadcrumb"),
      href: RECRUITING_AREA.href,
    },
    ...(location.group
      ? [{ label: labelOf(location.group, "breadcrumb") }]
      : []),
    { label: labelOf(location.page, "breadcrumb") },
  ]
}

function titleOf(path: string, labelOf: LabelOf): ReactNode {
  const location = locate(path)
  if (location) return labelOf(location.page, "title")
  const area = NAV_ITEMS.find((item) => item.href === path)
  return area ? labelOf(area, "title") : "페이지"
}

type RecruitingFrameProps = {
  path: string
  labelOf: LabelOf
  className: string
  children?: ReactNode
}

function RecruitingFrame({
  path,
  labelOf,
  className,
  children,
}: RecruitingFrameProps) {
  return (
    <div className={`flex min-w-[960px] flex-col ${className}`}>
      <Header
        logo={
          <HeaderHomeLink context="operation" generation={CURRENT_GENERATION} />
        }
        navItems={navItemsOf(labelOf)}
        currentPath={path}
      />
      <div className="flex min-h-0 flex-1">
        <SideNavigation items={sideItemsOf(labelOf)} currentPath={path} />
        <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-auto px-8 pt-12 pb-20">
          <PageHeader
            title={titleOf(path, labelOf)}
            description={PAGE_DESCRIPTION}
            breadcrumbs={breadcrumbsOf(path, labelOf)}
          />
          {children}
        </main>
      </div>
    </div>
  )
}

export function WorkFrameDemo() {
  const [path, setPath] = useState(RECRUITMENT_LIST.href)

  return (
    <PreviewLinks onNavigate={setPath}>
      <div className="umc-example umc-example-flush overflow-x-auto">
        <RecruitingFrame path={path} labelOf={plainLabel} className="h-[640px]">
          <div
            className="min-h-40 flex-1 rounded-xl"
            style={{
              boxShadow:
                "inset 0 0 0 1px var(--umc-color-border-neutral-weaker-100)",
            }}
          />
        </RecruitingFrame>
      </div>
    </PreviewLinks>
  )
}

const LEVEL_COLORS = {
  1: "neutral",
  2: "brand",
  3: "warning",
} as const satisfies Record<number, NumberBadgeColor>

type Level = keyof typeof LEVEL_COLORS

const LEVEL_OF = new Map<MenuEntry, Level>([
  [RECRUITING_AREA, 1],
  [RECRUITMENT_GROUP, 2],
  [RECRUITMENT_LIST, 3],
])

const isLevel = (value: number): value is Level => value in LEVEL_COLORS

const anchoredLabel: LabelOf = (entry, place) => {
  const level = LEVEL_OF.get(entry)
  if (level === undefined) return entry.label
  return (
    <span data-level-mark={level} data-level-place={place}>
      {entry.label}
    </span>
  )
}

const MARK_SIZE = 20
const MARK_GAP = 6

type MarkPosition = { left: number; top: number }

const MARK_POSITION: Record<LabelPlace, (box: DOMRect) => MarkPosition> = {
  header: (box) => ({
    left: box.left - MARK_SIZE / 2,
    top: box.top - MARK_SIZE / 2,
  }),
  side: (box) => ({
    left: box.right + MARK_GAP,
    top: box.top + (box.height - MARK_SIZE) / 2,
  }),
  breadcrumb: (box) => ({
    left: box.left + (box.width - MARK_SIZE) / 2,
    top: box.top - MARK_SIZE - MARK_GAP,
  }),
  title: (box) => ({
    left: box.left - MARK_SIZE - MARK_GAP,
    top: box.top + (box.height - MARK_SIZE) / 2,
  }),
}

const isLabelPlace = (value: string | undefined): value is LabelPlace =>
  value !== undefined && value in MARK_POSITION

type PlacedMark = MarkPosition & { key: string; level: Level }

function placeMarks(frame: HTMLElement): PlacedMark[] {
  const origin = frame.getBoundingClientRect()
  const anchors = frame.querySelectorAll<HTMLElement>("[data-level-mark]")
  return [...anchors].flatMap((anchor, index) => {
    const level = Number(anchor.dataset.levelMark)
    const place = anchor.dataset.levelPlace
    if (!isLevel(level) || !isLabelPlace(place)) return []
    const target = place === "header" ? (anchor.closest("a") ?? anchor) : anchor
    const position = MARK_POSITION[place](target.getBoundingClientRect())
    return [
      {
        key: `${place}-${index}`,
        level,
        left: position.left - origin.left,
        top: position.top - origin.top,
      },
    ]
  })
}

function LevelMarks({ frameRef }: { frameRef: RefObject<HTMLElement | null> }) {
  const [marks, setMarks] = useState<PlacedMark[]>([])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const update = () => setMarks(placeMarks(frame))
    update()
    document.fonts.ready.then(update)
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [frameRef])

  return marks.map((mark) => (
    <NumberBadge
      key={mark.key}
      color={LEVEL_COLORS[mark.level]}
      size="md"
      className="docs-level-mark"
      style={{ left: mark.left, top: mark.top }}
    >
      {mark.level}
    </NumberBadge>
  ))
}

export function WorkFrameLevels() {
  const frameRef = useRef<HTMLDivElement>(null)

  return (
    <figure>
      <PreviewLinks>
        <div className="umc-example umc-example-flush overflow-x-auto">
          <div ref={frameRef} inert className="relative">
            <RecruitingFrame
              path={RECRUITMENT_LIST.href}
              labelOf={anchoredLabel}
              className="h-[440px]"
            />
            <LevelMarks frameRef={frameRef} />
          </div>
        </div>
      </PreviewLinks>
      <figcaption className="text-body-3-regular text-neutral-medium-600">
        ① 헤더 메뉴, ② 사이드 내비게이션 그룹, ③ 그룹 안 메뉴가 브레드크럼과
        제목에 같은 이름으로 다시 나옵니다.
      </figcaption>
    </figure>
  )
}
