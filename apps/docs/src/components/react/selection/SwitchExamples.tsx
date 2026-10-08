"use client"

import { Switch, type SwitchSize } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const SIZES: readonly SwitchSize[] = ["sm", "md"]

export function SwitchBasics() {
  return (
    <div className="umc-example">
      <Switch>알림 받기</Switch>
      <Switch defaultChecked>지원서 공개</Switch>
      <Switch labelPlacement="end" size="md">
        면접 진행
      </Switch>
      <Switch aria-label="다크 모드" />
    </div>
  )
}

const STATES = [
  { key: "off", label: "꺼짐", checked: false, disabled: false },
  { key: "on", label: "켜짐", checked: true, disabled: false },
  { key: "disabled-off", label: "비활성 꺼짐", checked: false, disabled: true },
  { key: "disabled-on", label: "비활성 켜짐", checked: true, disabled: true },
] as const

const SPEC_IDS: Readonly<Record<string, string>> = {
  "sm-off": "switch-sm switch-sm-label switch-sm-track switch-sm-thumb",
  "sm-on": "switch-sm-on-track switch-sm-on-thumb",
  "sm-disabled-off": "switch-disabled-track switch-disabled-thumb",
  "sm-disabled-on": "switch-disabled-on-track",
  "md-off": "switch-md switch-md-label switch-md-track switch-md-thumb",
  "md-on": "switch-md-on-track switch-md-on-thumb",
}

export function SwitchStates() {
  return (
    <div className="umc-scroll">
      <table className="umc-table">
        <thead>
          <tr>
            <th>size</th>
            {STATES.map((state) => (
              <th key={state.key}>{state.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZES.map((size) => (
            <tr key={size}>
              <td>
                <code>{size}</code>
              </td>
              {STATES.map((state) => (
                <td key={state.key}>
                  <span data-spec-id={SPEC_IDS[`${size}-${state.key}`]}>
                    <Switch
                      size={size}
                      defaultChecked={state.checked}
                      disabled={state.disabled}
                    >
                      라벨
                    </Switch>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FIGMA_SIZES: Readonly<Record<string, SwitchSize>> = {
  Sm: "sm",
  Md: "md",
}

export function SwitchAllVariants() {
  return (
    <VariantGrid
      set="switch"
      sections={["Size"]}
      rows={["State"]}
      columns={["Disabled"]}
      order={{
        Size: ["Sm", "Md"],
        State: ["Off", "On"],
        Disabled: ["False", "True"],
      }}
      render={(variant: FigmaVariant) => (
        <Switch
          size={lookup(FIGMA_SIZES, variant, "Size")}
          defaultChecked={variant.props["State"] === "On"}
          disabled={variant.props["Disabled"] === "True"}
        >
          라벨
        </Switch>
      )}
    />
  )
}
