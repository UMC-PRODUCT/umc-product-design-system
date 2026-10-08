import type { ReactNode } from "react"

type GlyphProps = {
  className?: string
}

type GlyphFrameProps = GlyphProps & {
  size: number
  children: ReactNode
}

type StrokePathProps = {
  d: string
  width: number
}

function GlyphFrame({ size, className, children }: GlyphFrameProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function StrokePath({ d, width }: StrokePathProps) {
  return (
    <path
      d={d}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

export function LegacyCheckGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={16} className={className}>
      <StrokePath
        d="M3.33203 7.56427L6.5987 11.3335L12.6654 4.3335"
        width={1.4}
      />
    </GlyphFrame>
  )
}

export function LegacyExpandMoreGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={16} className={className}>
      <StrokePath d="M12.7 5.5L8 10.5L3.3 5.5" width={1.4} />
    </GlyphFrame>
  )
}

export function LegacyCloseGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={24} className={className}>
      <path
        d="M17.2187 5.7195C17.5116 5.42695 17.9865 5.42672 18.2792 5.7195C18.572 6.01228 18.5718 6.48713 18.2792 6.78005L13.0595 11.9988L18.2792 17.2185C18.5719 17.5114 18.5719 17.9862 18.2792 18.2791C17.9864 18.5719 17.5116 18.5718 17.2187 18.2791L11.999 13.0593L6.78022 18.2791C6.48732 18.572 6.01256 18.572 5.71967 18.2791C5.42678 17.9862 5.42678 17.5114 5.71967 17.2185L10.9384 11.9988L5.71967 6.78005C5.42694 6.48714 5.42683 6.01234 5.71967 5.7195C6.01252 5.42683 6.48737 5.42683 6.78022 5.7195L11.999 10.9383L17.2187 5.7195Z"
        fill="currentColor"
      />
    </GlyphFrame>
  )
}

export function SegmentedCheck16Glyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={16} className={className}>
      <StrokePath d="M4 7.76923L6.8 11L12 5" width={1.5} />
    </GlyphFrame>
  )
}

export function SegmentedCheck20Glyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={20} className={className}>
      <path
        d="M16.0774 4.20602C16.4385 3.78875 17.0699 3.74281 17.4876 4.10348C17.9053 4.46456 17.951 5.09676 17.5901 5.51461L8.70632 15.7929C8.51761 16.0113 8.24391 16.138 7.95534 16.1396C7.66667 16.1411 7.39146 16.0172 7.20046 15.8007L2.41628 10.3789C2.0511 9.96473 2.09108 9.33306 2.50515 8.96774C2.91925 8.60268 3.55096 8.64172 3.91628 9.05563L7.94167 13.6191L16.0774 4.20602Z"
        fill="currentColor"
      />
    </GlyphFrame>
  )
}

export function CheckboxCheckMdGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={20} className={className}>
      <StrokePath d="M5 9.73077L8.5 13.5L15 6.5" width={1.8} />
    </GlyphFrame>
  )
}

export function CheckboxCheckLgGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={24} className={className}>
      <StrokePath d="M6 11.6769L10.2 16.2L18 7.8" width={2} />
    </GlyphFrame>
  )
}

export function CheckButtonGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={24} className={className}>
      <StrokePath d="M5 11.3462L9.9 17L19 6.5" width={2.4} />
    </GlyphFrame>
  )
}
