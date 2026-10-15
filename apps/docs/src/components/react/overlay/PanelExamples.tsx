"use client"

import { CloseIcon, ResetIcon } from "@umc-product/icons"
import {
  BottomSheetActions,
  Button,
  Checkbox,
  Panel,
  TextButton,
} from "@umc-product/react"
import { useState, type ReactNode } from "react"

import {
  CODE_PLACEHOLDER,
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"

const CHAPTERS = [
  "Chromium",
  "Ferrum",
  "Neon",
  "Platinum",
  "Selenium",
  "Xenon",
] as const

type Chapter = (typeof CHAPTERS)[number]

const SCHOOLS: Readonly<Record<Chapter, readonly string[]>> = {
  Chromium: [
    "가람대학교",
    "나래대학교",
    "다온대학교",
    "라온대학교",
    "마루대학교",
    "바다대학교",
    "새솔대학교",
    "아라대학교",
    "온새대학교",
    "한별대학교",
  ],
  Ferrum: ["누리대학교", "다솜대학교", "미르대학교", "보람대학교"],
  Neon: ["가온대학교", "늘봄대학교", "든솔대학교"],
  Platinum: ["로아대학교", "모아대학교", "비나대학교", "새봄대학교"],
  Selenium: ["슬기대학교", "여울대학교", "윤슬대학교"],
  Xenon: ["이든대학교", "지음대학교", "초롱대학교", "하람대학교"],
}

const PANEL_TITLE = "모집 공고 복제하기"
const PANEL_DESCRIPTION = "선택한 학교의 공유 보관함에 추가돼요"

const PREVIEW_HEIGHT_LIMIT = "max-h-[601px]"

const PREVIEW_SELECTED: readonly string[] = [
  "가람대학교",
  "다온대학교",
  "라온대학교",
]

function SchoolPicker({
  chapter,
  onChapterChange,
  selected,
  onSelectedChange,
}: {
  chapter: Chapter
  onChapterChange: (chapter: Chapter) => void
  selected: readonly string[]
  onSelectedChange: (school: string, checked: boolean) => void
}) {
  return (
    <div className="flex min-h-full">
      <div className="flex shrink-0 flex-col gap-1.5 pt-2 pr-4 pb-5">
        {CHAPTERS.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={name === chapter}
            onClick={() => onChapterChange(name)}
            className={
              name === chapter
                ? "h-11 w-[142px] rounded-xl bg-fill-primary-medium-100 px-4 text-left text-label-1-semibold text-brand-default-600"
                : "h-11 w-[142px] rounded-xl bg-transparent px-4 text-left text-label-1-medium text-neutral-medium-600"
            }
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-5 border-l border-neutral-weak-200 bg-surface-neutral-weak p-6">
        {SCHOOLS[chapter].map((school) => (
          <Checkbox
            key={school}
            size="lg"
            color="brand"
            labelPlacement="end"
            checked={selected.includes(school)}
            onCheckedChange={(checked) => onSelectedChange(school, checked)}
          >
            {school}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}

function SelectionControl({
  selected,
  onReset,
  onRemove,
}: {
  selected: readonly string[]
  onReset: () => void
  onRemove: (school: string) => void
}) {
  return (
    <div className="flex items-center gap-4">
      <TextButton
        color="brand"
        trailingIcon={<ResetIcon />}
        onClick={onReset}
        aria-label={`선택 ${selected.length}개 모두 지우기`}
      >
        선택 {selected.length}
      </TextButton>
      <span
        aria-hidden="true"
        className="self-stretch border-l border-neutral-weak-200"
      />
      <div className="flex flex-wrap gap-x-4 gap-y-2.5">
        {selected.map((school) => (
          <TextButton
            key={school}
            color="neutral"
            trailingIcon={<CloseIcon />}
            onClick={() => onRemove(school)}
            aria-label={`${school} 선택 해제`}
          >
            {school}
          </TextButton>
        ))}
      </div>
    </div>
  )
}

function useSchoolSelection(initial: readonly string[]) {
  const [chapter, setChapter] = useState<Chapter>("Chromium")
  const [selected, setSelected] = useState<readonly string[]>(initial)
  const remove = (school: string) =>
    setSelected((current) => current.filter((item) => item !== school))
  const change = (school: string, checked: boolean) =>
    checked
      ? setSelected((current) =>
          current.includes(school) ? current : [...current, school],
        )
      : remove(school)
  const reset = () => setSelected([])
  return { chapter, setChapter, selected, change, remove, reset }
}

function PanelPreview({
  description,
  control,
  actions,
  children,
}: {
  description?: string
  control?: ReactNode
  actions?: ReactNode
  children: ReactNode
}) {
  const code = componentCodeOf(Panel, {
    open: true,
    title: PANEL_TITLE,
    description,
    control: control === undefined ? undefined : CODE_PLACEHOLDER,
    actions: actions === undefined ? undefined : CODE_PLACEHOLDER,
    children: CODE_PLACEHOLDER,
  })
  const hasFooter = control !== undefined || actions !== undefined
  return (
    <div
      className={`umc-panel__popup ${PREVIEW_HEIGHT_LIMIT}`}
      data-spec-id="panel"
      {...codeAttributeOf(code)}
    >
      <div className="umc-panel__main" data-spec-id="panel-main">
        <div className="umc-panel__header" data-spec-id="panel-header">
          <h2 className="umc-panel__title" data-spec-id="panel-title">
            {PANEL_TITLE}
          </h2>
          {description !== undefined && (
            <p
              className="umc-panel__description"
              data-spec-id="panel-description"
            >
              {description}
            </p>
          )}
        </div>
        <div className="umc-panel__content">{children}</div>
      </div>
      {hasFooter && (
        <div className="umc-panel__footer">
          {control !== undefined && (
            <div className="umc-panel__control" data-spec-id="panel-control">
              {control}
            </div>
          )}
          {actions !== undefined && (
            <div className="contents" data-spec-id="panel-actions">
              {actions}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const EMPHASIS_ACTIONS = (
  <BottomSheetActions
    layout="emphasis"
    primary={{ label: "복제하기" }}
    secondary={{ label: "돌아가기" }}
  />
)

export function PanelStaticPreview() {
  const selection = useSchoolSelection(PREVIEW_SELECTED)
  return (
    <div className="umc-example umc-example-muted">
      <PanelPreview
        description={PANEL_DESCRIPTION}
        control={
          <SelectionControl
            selected={selection.selected}
            onReset={selection.reset}
            onRemove={selection.remove}
          />
        }
        actions={EMPHASIS_ACTIONS}
      >
        <SchoolPicker
          chapter={selection.chapter}
          onChapterChange={selection.setChapter}
          selected={selection.selected}
          onSelectedChange={selection.change}
        />
      </PanelPreview>
    </div>
  )
}

function OpenButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <Button size="sm" variant="weak" color="neutral" onClick={onClick}>
      {label}
    </Button>
  )
}

export function PanelExample() {
  const [open, setOpen] = useState(false)
  const selection = useSchoolSelection(PREVIEW_SELECTED)
  return (
    <div className="umc-example">
      <OpenButton label="패널 열기" onClick={() => setOpen(true)} />
      <Panel
        open={open}
        onOpenChange={setOpen}
        className="w-[733px]"
        title={PANEL_TITLE}
        description={PANEL_DESCRIPTION}
        control={
          <SelectionControl
            selected={selection.selected}
            onReset={selection.reset}
            onRemove={selection.remove}
          />
        }
        actions={
          <BottomSheetActions
            layout="emphasis"
            primary={{ label: "복제하기", onClick: () => setOpen(false) }}
            secondary={{ label: "돌아가기", onClick: () => setOpen(false) }}
          />
        }
      >
        <SchoolPicker
          chapter={selection.chapter}
          onChapterChange={selection.setChapter}
          selected={selection.selected}
          onSelectedChange={selection.change}
        />
      </Panel>
    </div>
  )
}

const INTRODUCTION = [
  "UMC의 첫걸음을 내딛는 챌린저를 위해 각 학교와 중앙운영사무국이 여는 자리입니다.",
  "UMC가 어떤 곳인지, 우리만의 문화와 앞으로 도전할 목표, 커리큘럼을 소개합니다.",
  "스터디가 어떻게 진행되는지, 파트별로 무엇을 준비하면 좋은지 함께 나눕니다.",
  "기수가 끝날 때까지 함께할 운영진과 챌린저를 처음 만나는 자리이기도 합니다.",
  "행사 뒤에는 학교별로 모여 다음 일정을 정합니다.",
]

export function PanelContentOnlyExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <OpenButton label="본문만 있는 패널 열기" onClick={() => setOpen(true)} />
      <Panel
        open={open}
        onOpenChange={setOpen}
        className="w-[799px]"
        title="OT 안내"
      >
        <div className="flex flex-col gap-4 text-body-1-regular text-neutral-medium-600">
          {[...INTRODUCTION, ...INTRODUCTION].map((sentence, index) => (
            <p key={`${index}-${sentence}`} className="m-0">
              {sentence}
            </p>
          ))}
        </div>
      </Panel>
    </div>
  )
}
