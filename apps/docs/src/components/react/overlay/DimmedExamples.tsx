"use client"

import {
  Button,
  Dimmed,
  SegmentedControl,
  type SegmentedControlItem,
} from "@umc-product/react"
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { createPortal } from "react-dom"

import {
  CODE_PLACEHOLDER,
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { lookup } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type Intensity = "weak" | "medium" | "strong"

const INTENSITIES: readonly Intensity[] = ["weak", "medium", "strong"]

const INTENSITY_ITEMS: SegmentedControlItem<Intensity>[] = INTENSITIES.map(
  (intensity) => ({ value: intensity, label: intensity }),
)

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'

const dimmedCodeOf = (intensity: Intensity) =>
  componentCodeOf(Dimmed, { intensity, onClick: CODE_PLACEHOLDER })

const keepFocusInside = (event: KeyboardEvent<HTMLElement>) => {
  const dialog = event.currentTarget
  const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)]
  const first = focusable.at(0)
  const last = focusable.at(-1)
  if (!first || !last) return
  const active = document.activeElement
  if (event.shiftKey && (active === first || active === dialog)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

function DimmedScene({ intensity }: { intensity: Intensity }) {
  return (
    <figure
      className="docs-dimmed-scene"
      {...codeAttributeOf(dimmedCodeOf(intensity))}
    >
      <div className="docs-dimmed-scene__screen" aria-hidden="true">
        <div className="docs-dimmed-scene__page">
          <span />
          <span />
          <span />
          <span />
        </div>
        <Dimmed
          intensity={intensity}
          className="absolute inset-0"
          data-spec-id={`dimmed-${intensity}`}
        />
        <div className="docs-dimmed-scene__modal">
          <span />
          <span />
          <span />
        </div>
      </div>
      <figcaption>{intensity}</figcaption>
    </figure>
  )
}

export function DimmedStaticPreview() {
  return (
    <div className="umc-example">
      {INTENSITIES.map((intensity) => (
        <DimmedScene key={intensity} intensity={intensity} />
      ))}
    </div>
  )
}

function DimmedGuide({
  intensity,
  onIntensityChange,
  onClose,
}: {
  intensity: Intensity
  onIntensityChange: (intensity: Intensity) => void
  onClose: () => void
}) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dialogRef.current?.focus()
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = "hidden"
    return () => {
      root.style.overflow = previousOverflow
    }
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key === "Tab") keepFocusInside(event)
  }

  return (
    <>
      <Dimmed intensity={intensity} onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="docs-dimmed-guide"
        onKeyDown={handleKeyDown}
      >
        <p
          id={titleId}
          className="docs-dimmed-guide__title text-title-3-medium"
        >
          Dimmed {intensity}
        </p>
        <p
          id={descriptionId}
          className="docs-dimmed-guide__description text-body-2-regular text-neutral-medium-600"
        >
          모달이나 드로어 뒤에 깔아 화면을 어둡게 만듭니다. 강도를 바꿔 보고, 딤
          영역을 누르거나 Esc를 누르면 닫힙니다.
        </p>
        <SegmentedControl
          items={INTENSITY_ITEMS}
          value={intensity}
          onValueChange={onIntensityChange}
          aria-label="딤 강도"
        />
        <dl className="docs-dimmed-guide__token">
          <dt>토큰</dt>
          <dd>
            <code>--umc-color-dimmed-{intensity}</code>
          </dd>
        </dl>
        <pre className="docs-dimmed-guide__code">{dimmedCodeOf(intensity)}</pre>
        <div className="docs-dimmed-guide__actions">
          <Button size="md" variant="weak" color="neutral" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </>
  )
}

export function DimmedIntensities() {
  const [active, setActive] = useState<Intensity | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const close = () => {
    setActive(null)
    triggerRef.current?.focus()
  }

  return (
    <div className="umc-example" style={{ gap: "8px" }}>
      {INTENSITIES.map((intensity) => (
        <Button
          key={intensity}
          size="sm"
          variant="weak"
          color="neutral"
          onClick={(event) => {
            triggerRef.current = event.currentTarget
            setActive(intensity)
          }}
        >
          {intensity}
        </Button>
      ))}
      {active !== null &&
        createPortal(
          <DimmedGuide
            intensity={active}
            onIntensityChange={setActive}
            onClose={close}
          />,
          document.body,
        )}
    </div>
  )
}

const DIMMED_INTENSITIES = {
  Weak: "weak",
  Medium: "medium",
  Strong: "strong",
} as const

export function DimmedAllVariants() {
  return (
    <VariantGrid
      set="dimmed"
      rows={[]}
      columns={["Intensity"]}
      order={{ Intensity: ["Weak", "Medium", "Strong"] }}
      render={(variant) => {
        const intensity = lookup(DIMMED_INTENSITIES, variant, "Intensity")
        return (
          <div
            className="relative h-20 w-20 overflow-hidden rounded-lg bg-[var(--umc-color-fill-neutral-default)]"
            {...codeAttributeOf(componentCodeOf(Dimmed, { intensity }))}
          >
            <Dimmed intensity={intensity} className="absolute inset-0" />
          </div>
        )
      }}
    />
  )
}
