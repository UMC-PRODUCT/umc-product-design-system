"use client"

import { CodeField, TextInfoButton } from "@umc-product/react"
import { useState } from "react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const VALID_CODE = "123456"

export function CodeFieldDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="code-field-root code-field-cells code-field-cell code-field-cell-hover">
        <CodeField
          label="개별 지원 코드"
          required
          info={<TextInfoButton>개별 지원 코드란?</TextInfoButton>}
        />
      </div>
      <div data-spec-id="code-field-cell-filled">
        <CodeField label="개별 지원 코드" defaultValue="123" />
      </div>
    </div>
  )
}

export function CodeFieldVerify() {
  const [code, setCode] = useState("")
  const [invalid, setInvalid] = useState(false)
  return (
    <div className="umc-example umc-example-stack">
      <CodeField
        label="개별 지원 코드"
        value={code}
        onValueChange={(next) => {
          setCode(next)
          if (next === "") setInvalid(false)
        }}
        onValueComplete={(next) => setInvalid(next !== VALID_CODE)}
        invalid={invalid}
        errorMessage="코드가 일치하지 않습니다"
        caption={`예시 코드는 ${VALID_CODE}입니다`}
      />
    </div>
  )
}

export function CodeFieldSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="code-field-cells-md code-field-cell-md">
        <CodeField
          label="개별 지원 코드"
          required
          size="md"
          info={<TextInfoButton>개별 지원 코드란?</TextInfoButton>}
        />
      </div>
      <div data-spec-id="code-field-cell-md-invalid">
        <CodeField
          label="개별 지원 코드"
          size="md"
          defaultValue="000000"
          invalid
          errorMessage="코드가 일치하지 않습니다"
        />
      </div>
    </div>
  )
}

export function CodeFieldStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="code-field-cell-invalid">
        <CodeField
          label="개별 지원 코드"
          defaultValue="000000"
          invalid
          errorMessage="코드가 일치하지 않습니다"
        />
      </div>
      <div data-spec-id="code-field-cell-disabled">
        <CodeField label="개별 지원 코드" defaultValue="000000" disabled />
      </div>
    </div>
  )
}

const FORCED_CELL_STATES: Readonly<Record<string, readonly ForcedState[]>> = {
  Hover: ["hover"],
  Focus: ["focus"],
}

const CELL_STATES_WITH_VALUE = new Set(["Filled", "Error", "Disabled"])

function CodeCellVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"] ?? ""
  return (
    <ForceState states={FORCED_CELL_STATES[state] ?? []}>
      <CodeField
        length={1}
        defaultValue={CELL_STATES_WITH_VALUE.has(state) ? "7" : undefined}
        invalid={state === "Error"}
        disabled={state === "Disabled"}
      />
    </ForceState>
  )
}

function CodeInputVariantCell({ variant }: { variant: FigmaVariant }) {
  const invalid = variant.props["Error"] === "True"
  const size = variant.props["Size"] === "Md" ? "md" : "lg"
  return (
    <CodeField
      label="개별 지원 코드"
      required
      size={size}
      info={<TextInfoButton>개별 지원 코드란?</TextInfoButton>}
      defaultValue={invalid ? "000000" : undefined}
      invalid={invalid}
      errorMessage={invalid ? "코드가 일치하지 않습니다" : undefined}
    />
  )
}

export function CodeFieldAllVariants() {
  return (
    <>
      <VariantGrid
        set="code-cell"
        rows={["State"]}
        columns={["Size"]}
        order={{
          State: ["Default", "Hover", "Focus", "Filled", "Error", "Disabled"],
        }}
        render={(variant) => <CodeCellVariantCell variant={variant} />}
      />
      <VariantGrid
        set="code-input"
        rows={["Error"]}
        columns={["Size"]}
        order={{ Error: ["False", "True"], Size: ["Lg", "Md"] }}
        render={(variant) => <CodeInputVariantCell variant={variant} />}
      />
    </>
  )
}
