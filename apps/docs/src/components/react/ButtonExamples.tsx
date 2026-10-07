import { AddIcon, ChevronRightIcon } from "@umc-product/icons"
import {
  Button,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from "@umc-product/react"

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
        leadingIcon={<AddIcon />}
        data-spec-id="button-fill-neutral-md-leading-icon"
      >
        추가
      </Button>
      <Button
        size="sm"
        trailingIcon={<ChevronRightIcon />}
        data-spec-id="button-fill-primary-sm-trailing-icon"
      >
        다음
      </Button>
      <Button size="xs" variant="weak" leadingIcon={<AddIcon />}>
        추가
      </Button>
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
