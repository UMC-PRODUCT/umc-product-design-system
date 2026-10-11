import type { ReactElement, Ref, SVGProps } from "react"

import { hasAccessibleName } from "./create-icon.tsx"

export type PictogramMode = "light" | "dark"

export type PictogramProps<M extends PictogramMode = "light"> = Omit<
  SVGProps<SVGSVGElement>,
  "ref" | "color" | "mode"
> & {
  mode?: M
  size?: number | string
  color?: string
  ref?: Ref<SVGSVGElement>
}

export type PictogramVariant = {
  viewBox: string
  color: string
  content: ReactElement
}

type PictogramDefinition<M extends PictogramMode> = {
  name: string
  defaultMode: NoInfer<M>
  modes: Readonly<Record<M, PictogramVariant>>
}

const DEFAULT_PICTOGRAM_SIZE = 30

export const createPictogram = <M extends PictogramMode>({
  name,
  defaultMode,
  modes,
}: PictogramDefinition<M>) => {
  const Pictogram = ({
    mode = defaultMode,
    size = DEFAULT_PICTOGRAM_SIZE,
    color,
    style,
    ref,
    ...props
  }: PictogramProps<M>) => {
    const labelled = hasAccessibleName(props)
    const variant = modes[mode]
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={variant.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={labelled ? undefined : true}
        role={labelled ? "img" : undefined}
        style={{ color: color ?? variant.color, ...style }}
        {...props}
      >
        {variant.content}
      </svg>
    )
  }
  Pictogram.displayName = name
  return Pictogram
}
