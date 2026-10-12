"use client"

import { BottomSheet, BottomSheetActions, Button } from "@umc-product/react"
import { useState } from "react"

import {
  CODE_PLACEHOLDER,
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ActionLayout = "full" | "stacked" | "equal" | "emphasis" | "primary-top"

const actionsOf = (layout: ActionLayout) =>
  layout === "full" ? (
    <BottomSheetActions layout="full" primary={{ label: "확인" }} />
  ) : (
    <BottomSheetActions
      layout={layout}
      primary={{ label: "확인" }}
      secondary={{ label: layout === "primary-top" ? "나중에" : "취소" }}
    />
  )

const STATIC_SHEET = {
  width: "320px",
} as const

function BottomSheetPreviewItem({
  titleAlign,
  keyboard = false,
}: {
  titleAlign: "start" | "center"
  keyboard?: boolean
}) {
  const isCentered = titleAlign === "center"
  const title = isCentered ? "학습 일정" : "시트 제목"
  const description = isCentered ? undefined : "설명 문구가 들어갑니다."
  const headerAction = isCentered ? (
    <Button variant="weak" color="primary" size="xs">
      편집
    </Button>
  ) : undefined
  const actions = actionsOf("full")
  const code = componentCodeOf(BottomSheet, {
    open: true,
    title,
    description,
    titleAlign: isCentered ? "center" : undefined,
    headerAction,
    actions,
    children: CODE_PLACEHOLDER,
  })
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="umc-bottom-sheet__popup"
        style={STATIC_SHEET}
        {...codeAttributeOf(code)}
      >
        <span aria-hidden="true" className="umc-bottom-sheet__handle" />
        <div className="umc-bottom-sheet__header" data-align={titleAlign}>
          <div className="umc-bottom-sheet__title">{title}</div>
          {description !== undefined && (
            <div className="umc-bottom-sheet__description">{description}</div>
          )}
          {headerAction !== undefined && (
            <div className="umc-bottom-sheet__header-action">
              {headerAction}
            </div>
          )}
        </div>
        <div className="umc-bottom-sheet__body">
          <div
            style={{
              height: "106px",
              borderRadius: "8px",
              background: "var(--umc-color-fill-neutral-weak-75)",
            }}
          />
        </div>
        {actions}
      </div>
      {keyboard && (
        <div
          aria-hidden="true"
          style={{
            height: "216px",
            background: "var(--umc-color-teal-grey-200)",
          }}
        />
      )}
    </div>
  )
}

export function BottomSheetActionsAll() {
  return (
    <div
      className="umc-example umc-example-stack"
      style={{ maxWidth: "400px" }}
    >
      {(["full", "stacked", "equal", "emphasis", "primary-top"] as const).map(
        (layout) => (
          <div key={layout}>
            <p
              style={{
                fontSize: "12px",
                color: "#606262",
                marginBottom: "4px",
              }}
            >
              {layout}
            </p>
            {actionsOf(layout)}
          </div>
        ),
      )}
    </div>
  )
}

export function BottomSheetInteractiveTitle() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <Button
        size="sm"
        variant="weak"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        BottomSheet 열기 (Title)
      </Button>
      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="시트 제목"
        description="시트 설명 문구가 들어갑니다."
        actions={
          <BottomSheetActions
            layout="full"
            primary={{ label: "확인", onClick: () => setOpen(false) }}
          />
        }
      >
        <div style={{ padding: "8px 0 16px" }}>
          <p>바텀 시트의 본문 내용이 들어갑니다.</p>
        </div>
      </BottomSheet>
    </div>
  )
}

export function BottomSheetInteractiveCenter() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <Button
        size="sm"
        variant="weak"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        BottomSheet 열기 (Center)
      </Button>
      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="가운데 정렬 제목"
        titleAlign="center"
        actions={
          <BottomSheetActions
            layout="stacked"
            primary={{ label: "확인", onClick: () => setOpen(false) }}
            secondary={{ label: "취소", onClick: () => setOpen(false) }}
          />
        }
      >
        <div style={{ padding: "8px 0 16px" }}>
          <p>제목이 가운데 정렬된 바텀 시트입니다.</p>
        </div>
      </BottomSheet>
    </div>
  )
}

const ACTION_LAYOUTS: Record<string, ActionLayout> = {
  Full: "full",
  Stacked: "stacked",
  Equal: "equal",
  Emphasis: "emphasis",
  PrimaryTop: "primary-top",
}

const TITLE_ALIGNS: Record<string, "start" | "center"> = {
  Title: "start",
  Center: "center",
}

export function BottomSheetAllVariants() {
  return (
    <VariantGrid
      set="bottom-sheet"
      rows={["Type"]}
      columns={["Keyboard"]}
      render={(variant: FigmaVariant) => {
        const typeValue = variant.props["Type"] ?? "Title"
        const align = TITLE_ALIGNS[typeValue] ?? "start"
        return (
          <BottomSheetPreviewItem
            titleAlign={align}
            keyboard={variant.props["Keyboard"] === "On"}
          />
        )
      }}
    />
  )
}

export function BottomSheetButtonAreaVariants() {
  return (
    <VariantGrid
      set="bottom-sheet-button-area"
      rows={["Type"]}
      columns={[]}
      render={(variant: FigmaVariant) => {
        const typeValue = variant.props["Type"] ?? "Full"
        const layout = ACTION_LAYOUTS[typeValue] ?? "full"
        return actionsOf(layout)
      }}
    />
  )
}
