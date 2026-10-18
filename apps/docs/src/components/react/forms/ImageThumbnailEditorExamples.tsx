"use client"

import {
  GuidanceMessage,
  ImageThumbnailEditor,
  type ImageThumbnailEditorRejection,
} from "@umc-product/react"
import { useId, useState } from "react"

import { SAMPLE_IMAGE_SRC } from "../example-images.ts"
import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const REJECTION_MESSAGES: Readonly<
  Record<ImageThumbnailEditorRejection["reason"], string>
> = {
  type: "PNG, SVG 파일만 올릴 수 있어요",
  size: "5MB 이하 파일만 올릴 수 있어요",
}

export function ImageThumbnailEditorDefault() {
  const [logo, setLogo] = useState<File | null>(null)
  const [rejection, setRejection] = useState<ImageThumbnailEditorRejection>()
  const messageId = useId()

  return (
    <div className="umc-example">
      <div className="flex flex-col items-center gap-3">
        <ImageThumbnailEditor
          value={logo}
          onValueChange={(file) => {
            setLogo(file)
            setRejection(undefined)
          }}
          onReject={setRejection}
          aria-describedby={rejection === undefined ? undefined : messageId}
        />
        {rejection !== undefined && (
          <GuidanceMessage id={messageId} color="error" role="status">
            {REJECTION_MESSAGES[rejection.reason]}
          </GuidanceMessage>
        )}
        {logo !== null && (
          <GuidanceMessage color="success" role="status">
            고른 파일: {logo.name}
          </GuidanceMessage>
        )}
      </div>
    </div>
  )
}

export function ImageThumbnailEditorWithImage() {
  return (
    <div className="umc-example">
      <ImageThumbnailEditor src={SAMPLE_IMAGE_SRC} />
    </div>
  )
}

export function ImageThumbnailEditorCustom() {
  return (
    <div className="umc-example">
      <ImageThumbnailEditor
        className="size-[160px]"
        accept={["image/png"]}
        maxSize={2 * 1024 * 1024}
        label="대표 이미지 올리기"
        description="PNG, 2MB 이하"
      />
    </div>
  )
}

type EditorState = {
  forced: readonly ForcedState[]
  src?: string
  specId: string
}

const EDITOR_STATES: Readonly<Record<string, EditorState>> = {
  Default: {
    forced: [],
    specId: [
      "image-thumbnail-editor-default",
      "image-thumbnail-editor-guide",
      "image-thumbnail-editor-icon",
      "image-thumbnail-editor-text",
      "image-thumbnail-editor-label",
      "image-thumbnail-editor-description",
    ].join(" "),
  },
  Hover: { forced: ["hover"], specId: "image-thumbnail-editor-hover" },
  Filled: {
    forced: [],
    src: SAMPLE_IMAGE_SRC,
    specId: "image-thumbnail-editor-filled",
  },
}

function ImageThumbnailEditorVariantCell({
  variant,
}: {
  variant: FigmaVariant
}) {
  const state = EDITOR_STATES[variant.props["State"] ?? ""]
  if (state === undefined) {
    throw new Error(`${variant.name}: 대응하는 상태가 없습니다`)
  }
  return (
    <div data-spec-id={state.specId}>
      <ForceState states={state.forced}>
        <ImageThumbnailEditor src={state.src} />
      </ForceState>
    </div>
  )
}

export function ImageThumbnailEditorAllVariants() {
  return (
    <VariantGrid
      set="image-thumbnail-editor"
      rows={[]}
      columns={["State"]}
      order={{ State: ["Default", "Hover", "Filled"] }}
      render={(variant) => (
        <ImageThumbnailEditorVariantCell variant={variant} />
      )}
    />
  )
}
