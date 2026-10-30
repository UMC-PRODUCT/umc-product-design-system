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

export function Check16Glyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={16} className={className}>
      <StrokePath d="M4 7.76923L6.8 11L12 5" width={1.5} />
    </GlyphFrame>
  )
}

export function Check20Glyph({ className }: GlyphProps) {
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

export function ProfileSilhouetteGlyph({ className }: GlyphProps) {
  return (
    <GlyphFrame size={36} className={className}>
      <path
        d="M18 18C26.4216 18 30.2652 21.5957 32.0986 24.7637C33.1254 26.5543 33.7693 28.6184 33.9736 30.7754C33.9887 30.9464 33.9961 31.0714 33.9961 31.1494L34 31.2256V31.5C34 32.6934 33.6033 33.8378 32.8975 34.6816C32.1915 35.5255 31.2338 36 30.2354 36H5.76465C4.76621 36 3.80854 35.5255 3.10254 34.6816C2.39665 33.8378 2 32.6934 2 31.5V31.1533L2.02637 30.7803C2.23066 28.6232 2.87458 26.5582 3.90137 24.7676C5.73487 21.5952 9.5787 18 18 18ZM18 0C22.4183 0 26 3.58172 26 8C26 12.4183 22.4183 16 18 16C13.5817 16 10 12.4183 10 8C10 3.58172 13.5817 0 18 0Z"
        fill="currentColor"
      />
    </GlyphFrame>
  )
}
