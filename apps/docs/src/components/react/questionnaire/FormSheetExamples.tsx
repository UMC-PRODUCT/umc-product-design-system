"use client"

import { OpenNewIcon, UmcSymbolLogo } from "@umc-product/icons"
import {
  Button,
  FormChoiceList,
  FormHeader,
  FormQuestion,
  FormSection,
  FormSheet,
  FormTextAnswer,
  IconButton,
  StatusTag,
  type FormChoiceOption,
} from "@umc-product/react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PARTS: readonly FormChoiceOption[] = [
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
]

const INTRO =
  "디자이너, 개발자, 기획자가 아이디어와 역량을 연결해 사이드 프로젝트와 팀 빌딩을 시작하는 플랫폼입니다"

const RECRUITING = [
  { part: "Design", count: "0/2", status: "모집 완료" },
  { part: "Web", count: "1/3", status: "모집 중" },
] as const

function SheetDescription() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-5">
      <p className="m-0 max-w-[560px] text-[15px] leading-[1.5] text-[var(--umc-color-text-neutral-medium-600)]">
        {INTRO}
      </p>
      <dl className="m-0 grid grid-cols-[auto_auto_auto] gap-x-8 gap-y-2 text-[15px] leading-[1.5]">
        {RECRUITING.map((row) => (
          <div key={row.part} className="contents">
            <dt className="font-medium text-[var(--umc-color-text-neutral-default-900)]">
              {row.part}
            </dt>
            <dd className="m-0 text-[var(--umc-color-text-neutral-medium-600)]">
              {row.count}
            </dd>
            <dd className="m-0 text-[var(--umc-color-text-neutral-medium-600)]">
              {row.status}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function SheetQuestions({ readOnly }: { readOnly: boolean }) {
  return (
    <FormSection title="기본 문항">
      <div className="flex flex-col gap-8 px-6 py-6">
        <FormQuestion
          number="01"
          title="자기소개를 적어 주세요"
          description="500자 이내로 적어 주세요"
          required
          readOnly={readOnly}
        >
          <FormTextAnswer
            maxLength={500}
            placeholder="작성하세요"
            defaultValue={
              readOnly
                ? "서비스를 끝까지 만들어 보고 싶어 지원했습니다"
                : undefined
            }
          />
        </FormQuestion>
        <FormQuestion
          number="02"
          title="지원 파트를 골라 주세요"
          required
          readOnly={readOnly}
        >
          <FormChoiceList
            type="single"
            options={PARTS}
            defaultValue={readOnly ? "web" : undefined}
          />
        </FormQuestion>
      </div>
    </FormSection>
  )
}

const thumbnail = <UmcSymbolLogo height={28} />

export function FormSheetEditable() {
  return (
    <div className="umc-example umc-example-muted">
      <div
        className="w-full max-w-[1000px]"
        data-spec-id="form-sheet-body form-sheet-actions form-sheet-content form-sheet-control form-header-tab form-header-thumbnail form-header-title form-header-subtitle form-header-bar"
      >
        <FormSheet
          header={
            <FormHeader
              title="UMC 10기 지원서"
              subtitle="Web Product Engineering"
              thumbnail={thumbnail}
            />
          }
          action={
            <IconButton
              size="sm"
              color="white"
              icon={<OpenNewIcon />}
              aria-label="새 창에서 열기"
            />
          }
          description={<SheetDescription />}
          control={<Button size="md">다음</Button>}
        >
          <SheetQuestions readOnly={false} />
        </FormSheet>
      </div>
    </div>
  )
}

export function FormSheetReadOnly() {
  return (
    <div className="umc-example umc-example-muted">
      <div className="w-full max-w-[1000px]" data-spec-id="form-header-caption">
        <FormSheet
          header={
            <FormHeader
              title="UMC 10기 지원서"
              subtitle="Web Product Engineering"
              thumbnail={thumbnail}
              caption={
                <>
                  <span>2026-10-25 14:00 제출됨</span>
                  <StatusTag color="success">합격</StatusTag>
                </>
              }
            />
          }
          description={<SheetDescription />}
          control={
            <Button size="md" variant="weak" color="neutral">
              목록으로
            </Button>
          }
        >
          <SheetQuestions readOnly />
        </FormSheet>
      </div>
    </div>
  )
}

function FormHeaderVariantCell({ variant }: { variant: FigmaVariant }) {
  const withCaption = variant.props["Caption"] === "True"
  return (
    <div className="w-[928px] max-w-full">
      <FormHeader
        title="타이틀"
        subtitle="서브 타이틀"
        caption={
          withCaption ? (
            <>
              <span>2000-00-00 00:00 제출됨</span>
              <StatusTag color="success">합격</StatusTag>
            </>
          ) : undefined
        }
      />
    </div>
  )
}

export function FormHeaderAllVariants() {
  return (
    <VariantGrid
      set="form-header"
      rows={["Caption"]}
      columns={["Size"]}
      render={(variant) => <FormHeaderVariantCell variant={variant} />}
    />
  )
}
