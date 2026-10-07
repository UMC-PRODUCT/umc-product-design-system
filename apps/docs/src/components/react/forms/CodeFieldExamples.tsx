"use client"

import { CodeField, TextInfoButton } from "@umc-product/react"
import { useState } from "react"

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
