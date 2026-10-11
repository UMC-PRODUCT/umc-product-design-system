import type { ReactElement, Ref, SVGProps } from "react"

export type IconWeight = "thin" | "regular" | "fill"

export type IconProps<W extends IconWeight = IconWeight> = Omit<
  SVGProps<SVGSVGElement>,
  "ref"
> & {
  weight?: W
  size?: number | string
  ref?: Ref<SVGSVGElement>
}

export type IconVariant = {
  viewBox: string
  content: ReactElement
}

type IconDefinition<W extends IconWeight> = {
  name: string
  defaultWeight: NoInfer<W>
  weights: Readonly<Record<W, IconVariant>>
}

const DEFAULT_ICON_SIZE = 24

export const hasAccessibleName = (props: {
  "aria-label"?: string
  "aria-labelledby"?: string
}): boolean => Boolean(props["aria-label"] ?? props["aria-labelledby"])

export const createIcon = <W extends IconWeight>({
  name,
  defaultWeight,
  weights,
}: IconDefinition<W>) => {
  const Icon = ({
    weight = defaultWeight,
    size = DEFAULT_ICON_SIZE,
    ref,
    ...props
  }: IconProps<W>) => {
    const labelled = hasAccessibleName(props)
    const { viewBox, content } = weights[weight]
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={labelled ? undefined : true}
        role={labelled ? "img" : undefined}
        {...props}
      >
        {content}
      </svg>
    )
  }
  Icon.displayName = name
  return Icon
}
