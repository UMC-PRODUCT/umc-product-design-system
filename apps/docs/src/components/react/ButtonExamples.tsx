import { AddIcon, ChevronRightIcon } from "@umc-product/icons"
import {
  Button,
  type ButtonColor,
  type ButtonIconOnlySize,
  type ButtonSize,
  type ButtonVariant,
} from "@umc-product/react"

import { ForceState } from "./variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid } from "./variants/VariantGrid.tsx"

const COLORS: readonly ButtonColor[] = ["primary", "neutral", "red", "white"]
const VARIANTS: readonly ButtonVariant[] = ["fill", "weak"]
const SIZES: readonly ButtonSize[] = ["lg", "md", "sm", "xs"]
const STATES = [
  { key: "default", label: "기본" },
  { key: "disabled", label: "비활성" },
  { key: "loading", label: "로딩" },
] as const

export function ButtonMatrix() {
  return (
    <div className="umc-scroll">
      <table className="umc-table">
        <thead>
          <tr>
            <th>color · variant</th>
            {STATES.map((state) => (
              <th key={state.key}>{state.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.flatMap((color) =>
            VARIANTS.map((variant) => (
              <tr key={`${color}-${variant}`}>
                <td>
                  <code>
                    {color} · {variant}
                  </code>
                </td>
                {STATES.map((state) => (
                  <td
                    key={state.key}
                    className={
                      color === "white" ? "umc-example-muted" : undefined
                    }
                  >
                    <Button
                      variant={variant}
                      color={color}
                      size="lg"
                      disabled={state.key === "disabled"}
                      isLoading={state.key === "loading"}
                      data-spec-id={`button-${variant}-${color}-lg-${state.key}`}
                    >
                      버튼
                    </Button>
                  </td>
                ))}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  )
}

export function ButtonSizes() {
  return (
    <div className="umc-example">
      {SIZES.map((size) => (
        <Button
          key={size}
          size={size}
          data-spec-id={`button-fill-primary-${size}-default`}
        >
          버튼 {size}
        </Button>
      ))}
    </div>
  )
}

export function ButtonIcons() {
  return (
    <div className="umc-example">
      <Button
        size="md"
        color="neutral"
        leadingIcon={<AddIcon weight="fill" />}
        data-spec-id="button-fill-neutral-md-leading-icon"
      >
        추가
      </Button>
      <Button
        size="sm"
        trailingIcon={<ChevronRightIcon weight="fill" />}
        data-spec-id="button-fill-primary-sm-trailing-icon"
      >
        다음
      </Button>
      <Button size="xs" variant="weak" leadingIcon={<AddIcon weight="fill" />}>
        추가
      </Button>
    </div>
  )
}

export function ButtonWhiteIcons() {
  return (
    <div className="umc-example umc-example-muted">
      <Button
        size="xs"
        variant="weak"
        color="white"
        leadingIcon={<AddIcon weight="fill" />}
        data-spec-id="button-weak-white-xs-leading-icon button-weak-white-xs-leading-icon-icon"
      >
        추가
      </Button>
      <Button
        size="xs"
        color="white"
        trailingIcon={<ChevronRightIcon weight="fill" />}
      >
        다음
      </Button>
    </div>
  )
}

export function ButtonIconOnly() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="umc-example">
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          color="neutral"
          size="md"
          data-spec-id="button-icon-only-fill-neutral-md button-icon-only-fill-neutral-md-icon"
        />
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          color="neutral"
          size="sm"
          data-spec-id="button-icon-only-fill-neutral-sm button-icon-only-fill-neutral-sm-icon"
        />
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          color="neutral"
          size="xs"
          data-spec-id="button-icon-only-fill-neutral-xs button-icon-only-fill-neutral-xs-icon"
        />
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          variant="weak"
          color="neutral"
          size="md"
          data-spec-id="button-icon-only-weak-neutral-md"
        />
      </div>
      <div className="umc-example umc-example-muted">
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          color="white"
          size="md"
          data-spec-id="button-icon-only-fill-white-md-icon"
        />
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          variant="weak"
          color="white"
          size="md"
        />
        <Button
          icon={<AddIcon weight="fill" />}
          aria-label="추가"
          color="white"
          size="md"
          disabled
          data-spec-id="button-icon-only-fill-white-md-disabled-icon"
        />
      </div>
    </div>
  )
}

export function ButtonLoadingWidth() {
  return (
    <div className="umc-example umc-example-stack">
      <Button size="md">지원서 제출하기</Button>
      <Button size="md" isLoading>
        지원서 제출하기
      </Button>
    </div>
  )
}

export function ButtonOverride() {
  return (
    <div className="umc-example">
      <Button size="md" className="rounded-full">
        className="rounded-full"
      </Button>
      <Button size="md" variant="weak" className="w-60">
        className="w-60"
      </Button>
    </div>
  )
}

const FIGMA_SIZES: Readonly<Record<string, ButtonSize>> = {
  Lg: "lg",
  Md: "md",
  Sm: "sm",
  XS: "xs",
}

const FIGMA_ICON_ONLY_SIZES: Readonly<Record<string, ButtonIconOnlySize>> = {
  Md: "md",
  Sm: "sm",
  XS: "xs",
}

const FIGMA_COLORS: Readonly<Record<string, ButtonColor>> = {
  Primary: "primary",
  Neutral: "neutral",
  White: "white",
  Red: "red",
}

const FIGMA_STYLES: Readonly<Record<string, ButtonVariant>> = {
  Fill: "fill",
  Weak: "weak",
}

const figmaIcon = <AddIcon weight="fill" />

function ButtonVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  const iconPosition = variant.props["Icon Position"]
  if (variant.props["Icon Only"] === "True") {
    return (
      <ForceState states={state === "Pressed" ? ["active"] : []}>
        <Button
          icon={figmaIcon}
          aria-label="추가"
          size={lookup(FIGMA_ICON_ONLY_SIZES, variant, "Size")}
          color={lookup(FIGMA_COLORS, variant, "Color")}
          variant={lookup(FIGMA_STYLES, variant, "Style")}
          disabled={state === "Disabled"}
          isLoading={state === "Loading"}
        />
      </ForceState>
    )
  }
  return (
    <ForceState states={state === "Pressed" ? ["active"] : []}>
      <Button
        size={lookup(FIGMA_SIZES, variant, "Size")}
        color={lookup(FIGMA_COLORS, variant, "Color")}
        variant={lookup(FIGMA_STYLES, variant, "Style")}
        disabled={state === "Disabled"}
        isLoading={state === "Loading"}
        leadingIcon={iconPosition === "Left" ? figmaIcon : undefined}
        trailingIcon={iconPosition === "Right" ? figmaIcon : undefined}
      >
        버튼
      </Button>
    </ForceState>
  )
}

export function ButtonAllVariants() {
  return (
    <VariantGrid
      set="button"
      sections={["Icon Only", "Icon Position", "Size"]}
      rows={["Color", "Style"]}
      columns={["State"]}
      order={{
        Size: ["Lg", "Md", "Sm", "XS"],
        State: ["Default", "Pressed", "Loading", "Disabled"],
      }}
      tone={(variant) =>
        variant.props["Color"] === "White" ? "muted" : undefined
      }
      render={(variant) => <ButtonVariantCell variant={variant} />}
    />
  )
}
