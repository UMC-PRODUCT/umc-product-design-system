import type { ReactElement, Ref, SVGProps } from "react"

import { hasAccessibleName } from "./create-icon.tsx"

export type LogoProps = Omit<
  SVGProps<SVGSVGElement>,
  "ref" | "width" | "height"
> & {
  height?: number
  ref?: Ref<SVGSVGElement>
}

type LogoFrame = {
  width: number
  height: number
}

type LogoDefinition = {
  name: string
  frame: LogoFrame
  content: ReactElement
}

const DEFAULT_LOGO_HEIGHT = 22

export const createLogo = ({ name, frame, content }: LogoDefinition) => {
  const viewBox = `0 0 ${frame.width} ${frame.height}`
  const aspectRatio = frame.width / frame.height
  const Logo = ({ height = DEFAULT_LOGO_HEIGHT, ref, ...props }: LogoProps) => {
    const labelled = hasAccessibleName(props)
    return (
      <svg
        ref={ref}
        width={height * aspectRatio}
        height={height}
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
  Logo.displayName = name
  return Logo
}
