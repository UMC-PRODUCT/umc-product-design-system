const ROOT_FONT_SIZE_PX = 16
const DECIMAL_SCALE = 10_000

export type DimensionUnit = "px" | "em"

export type Dimension = {
  value: number
  unit: DimensionUnit
}

export const round4 = (value: number): number => {
  const rounded = Math.round(value * DECIMAL_SCALE) / DECIMAL_SCALE
  return Object.is(rounded, -0) ? 0 : rounded
}

export const px = (value: number): Dimension => ({ value, unit: "px" })

export const percentToEm = (percent: number): Dimension => ({
  value: round4(percent / 100),
  unit: "em",
})

export const formatDimension = ({ value, unit }: Dimension): string =>
  unit === "px"
    ? `${round4(value / ROOT_FONT_SIZE_PX)}rem`
    : `${round4(value)}em`
