"use client"

import { BottomSheet, BottomSheetActions, Button } from "@umc-product/react"
import { useState } from "react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ActionLayout = "full" | "stacked" | "equal" | "emphasis" | "primary-top"

function ActionsPreviewItem({ layout }: { layout: ActionLayout }) {
  if (layout === "full") {
    return (
      <div
        className="umc-bottom-sheet-actions"
        data-layout="full"
        style={{ background: "#f4f5f5", borderRadius: "4px" }}
      >
        <button
          className="umc-button"
          data-variant="fill"
          data-color="primary"
          data-size="md"
          type="button"
          style={{ width: "100%" }}
        >
          <span className="umc-button__label">확인</span>
        </button>
      </div>
    )
  }

  if (layout === "primary-top") {
    return (
      <div
        className="umc-bottom-sheet-actions"
        data-layout="primary-top"
        style={{ background: "#f4f5f5", borderRadius: "4px" }}
      >
        <button
          className="umc-button"
          data-variant="fill"
          data-color="primary"
          data-size="md"
          type="button"
          style={{ width: "100%" }}
        >
          <span className="umc-button__label">확인</span>
        </button>
        <button
          className="umc-text-button"
          data-color="neutral"
          data-size="xs"
          data-variant="plain"
          type="button"
          style={{ alignSelf: "center" }}
        >
          <span className="umc-text-button__label">나중에</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className="umc-bottom-sheet-actions"
      data-layout={layout}
      style={{ background: "#f4f5f5", borderRadius: "4px" }}
    >
      <button
        className="umc-button"
        data-variant="fill"
        data-color="neutral"
        data-size="md"
        type="button"
        {...(layout === "emphasis" ? { style: { width: "110px" } } : {})}
      >
        <span className="umc-button__label">취소</span>
      </button>
      <button
        className="umc-button"
        data-variant="fill"
        data-color="primary"
        data-size="md"
        type="button"
      >
        <span className="umc-button__label">확인</span>
      </button>
    </div>
  )
}

function BottomSheetPreviewItem({
  titleAlign,
}: {
  titleAlign: "start" | "center"
}) {
  return (
    <div
      style={{
        background: "#f4f5f5",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        width: "311px",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden="true"
        className="umc-bottom-sheet__handle"
        style={{ display: "block" }}
      />
      <div className="umc-bottom-sheet__header" data-align={titleAlign}>
        <div className="umc-bottom-sheet__title">시트 제목</div>
        <div className="umc-bottom-sheet__description">
          설명 문구가 들어갑니다.
        </div>
      </div>
      <div className="umc-bottom-sheet__body" style={{ padding: "8px 20px 0" }}>
        <p>본문 내용</p>
      </div>
      <ActionsPreviewItem layout="full" />
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
            <ActionsPreviewItem layout={layout} />
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
        return <BottomSheetPreviewItem titleAlign={align} />
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
        return <ActionsPreviewItem layout={layout} />
      }}
    />
  )
}
