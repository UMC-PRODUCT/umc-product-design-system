"use client"

import { Button, Tooltip } from "@umc-product/react"

type TooltipPreviewItemProps = {
  specId: string
  mode: "dark" | "light"
  size?: "xs" | "sm" | "md"
  title?: string
  text: string
}

function TooltipPreviewItem({
  specId,
  mode,
  size = "md",
  title,
  text,
}: TooltipPreviewItemProps) {
  return (
    <div data-spec-id={specId} className="pb-3">
      <div
        className="umc-tooltip__positioner"
        data-size={size}
        data-mode={mode}
      >
        <div className="umc-tooltip__popup" data-mode={mode}>
          <div
            className="umc-tooltip__arrow"
            data-side="top"
            style={{
              position: "absolute",
              left: "calc(50% - var(--umc-tooltip-arrow-width) / 2)",
            }}
          />
          <div
            className="umc-tooltip__content"
            data-mode={mode}
            data-titled={title === undefined ? undefined : ""}
          >
            {title !== undefined && (
              <span className="umc-tooltip__label">{title}</span>
            )}
            <div className="umc-tooltip__text">{text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TooltipStaticPreview() {
  return (
    <div className="umc-example items-start gap-6">
      <TooltipPreviewItem
        specId="tooltip-dark-xs tooltip-dark-xs-arrow"
        mode="dark"
        size="xs"
        text="툴팁이에요"
      />
      <TooltipPreviewItem
        specId="tooltip-dark-sm"
        mode="dark"
        size="sm"
        text="툴팁이에요"
      />
      <TooltipPreviewItem
        specId="tooltip-light-sm tooltip-light-shadow"
        mode="light"
        size="sm"
        text="툴팁이에요"
      />
      <TooltipPreviewItem
        specId="tooltip-dark-md tooltip-dark-md-arrow"
        mode="dark"
        text="사용자에게 정보를 안내 할 Tooltip Message 여러줄 가능"
      />
      <TooltipPreviewItem
        specId="tooltip-light-md-label tooltip-light-md-titled"
        mode="light"
        title="라벨"
        text="사용자에게 정보를 안내 할 Tooltip Message 여러줄 가능"
      />
    </div>
  )
}

export function TooltipHover() {
  return (
    <div className="umc-example" style={{ gap: "24px" }}>
      <Tooltip content="기본 툴팁입니다.">
        <Button size="md">마우스를 올려보세요</Button>
      </Tooltip>
      <Tooltip content="빛 배경 모드입니다." mode="light">
        <Button size="md" variant="weak" color="neutral">
          light 모드
        </Button>
      </Tooltip>
    </div>
  )
}

export function TooltipWithTitle() {
  return (
    <div className="umc-example">
      <Tooltip title="제목" content="제목이 있는 툴팁입니다.">
        <Button size="md" color="neutral">
          제목 있는 툴팁
        </Button>
      </Tooltip>
    </div>
  )
}

export function TooltipSides() {
  return (
    <div className="umc-example" style={{ gap: "12px", flexWrap: "wrap" }}>
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} content={`side="${side}"`} side={side}>
          <Button size="sm" variant="weak" color="neutral">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  )
}

export function TooltipClick() {
  return (
    <div className="umc-example">
      <Tooltip content="클릭으로 열립니다." openOn="click">
        <Button size="md" color="neutral">
          클릭 트리거
        </Button>
      </Tooltip>
    </div>
  )
}

export function TooltipSizes() {
  return (
    <div className="umc-example" style={{ gap: "12px" }}>
      <Tooltip size="xs" content="xs 크기 툴팁">
        <Button size="sm" variant="weak" color="neutral">
          xs
        </Button>
      </Tooltip>
      <Tooltip size="sm" content="sm 크기 툴팁">
        <Button size="sm" variant="weak" color="neutral">
          sm
        </Button>
      </Tooltip>
      <Tooltip
        size="md"
        content="md 크기는 최대 폭 240px 안에서 여러 줄로 줄바꿈합니다."
      >
        <Button size="sm" variant="weak" color="neutral">
          md
        </Button>
      </Tooltip>
    </div>
  )
}
