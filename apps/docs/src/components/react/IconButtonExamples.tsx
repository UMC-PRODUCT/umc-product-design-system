import {
  CloseIcon,
  EditIcon,
  MoreVerticalIcon,
  SettingIcon,
  TrashIcon,
} from "@umc-product/icons"
import {
  IconButton,
  Tooltip,
  type IconButtonColor,
  type IconButtonSize,
  type IconButtonVariant,
} from "@umc-product/react"

import { ForceState } from "./variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid } from "./variants/VariantGrid.tsx"

const COLORS: readonly IconButtonColor[] = [
  "primary",
  "white",
  "neutral",
  "error",
]
const VARIANTS: readonly IconButtonVariant[] = ["weak", "fill"]

export function IconButtonBasics() {
  return (
    <div className="umc-example">
      <IconButton icon={<CloseIcon />} aria-label="닫기" />
      <IconButton icon={<EditIcon />} aria-label="수정" color="neutral" />
      <IconButton icon={<TrashIcon />} aria-label="삭제" color="error" />
      <IconButton
        icon={<SettingIcon />}
        aria-label="표 설정"
        color="neutral"
        variant="fill"
      />
    </div>
  )
}

export function IconButtonColors() {
  return (
    <div className="umc-scroll">
      <table className="umc-table">
        <thead>
          <tr>
            <th>color</th>
            {VARIANTS.map((variant) => (
              <th key={variant}>{variant}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map((color) => (
            <tr key={color}>
              <td>
                <code>{color}</code>
              </td>
              {VARIANTS.map((variant) => (
                <td
                  key={variant}
                  className={
                    color === "white" ? "umc-example-muted" : undefined
                  }
                >
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="닫기"
                    color={color}
                    variant={variant}
                    data-spec-id={`icon-button-${variant}-${color} icon-button-${variant}-${color}-icon`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SIZES: readonly IconButtonSize[] = ["sm", "md", "lg"]

export function IconButtonSizes() {
  return (
    <div className="umc-example">
      {SIZES.map((size) => (
        <IconButton
          key={size}
          icon={<CloseIcon />}
          aria-label="닫기"
          size={size}
          data-spec-id={`icon-button-size-${size}`}
        />
      ))}
    </div>
  )
}

export function IconButtonWithTooltip() {
  return (
    <div className="umc-example">
      <Tooltip content="더 보기">
        <IconButton
          icon={<MoreVerticalIcon />}
          aria-label="더 보기"
          color="neutral"
        />
      </Tooltip>
      <IconButton
        icon={<CloseIcon />}
        aria-label="닫기"
        color="neutral"
        disabled
      />
    </div>
  )
}

const FIGMA_COLORS: Readonly<Record<string, IconButtonColor>> = {
  Primary: "primary",
  White: "white",
  Neutral: "neutral",
  Error: "error",
}

const FIGMA_STYLES: Readonly<Record<string, IconButtonVariant>> = {
  Weak: "weak",
  Fill: "fill",
}

const FIGMA_SIZES: Readonly<Record<string, IconButtonSize>> = {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
}

function IconButtonVariantCell({ variant }: { variant: FigmaVariant }) {
  const pressed = variant.props["State"] === "Hover&Pressed"
  return (
    <ForceState states={pressed ? ["active"] : []}>
      <IconButton
        icon={<CloseIcon />}
        aria-label="닫기"
        color={lookup(FIGMA_COLORS, variant, "Color")}
        variant={lookup(FIGMA_STYLES, variant, "Style")}
        size={lookup(FIGMA_SIZES, variant, "Size")}
      />
    </ForceState>
  )
}

export function IconButtonAllVariants() {
  return (
    <VariantGrid
      set="icon-button"
      sections={["Size"]}
      rows={["Color"]}
      columns={["Style", "State"]}
      order={{
        Size: ["Sm", "Md", "Lg"],
        Color: ["Primary", "White", "Neutral", "Error"],
        Style: ["Weak", "Fill"],
        State: ["Default", "Hover&Pressed"],
      }}
      tone={(variant) =>
        variant.props["Color"] === "White" ? "muted" : undefined
      }
      render={(variant) => <IconButtonVariantCell variant={variant} />}
    />
  )
}
