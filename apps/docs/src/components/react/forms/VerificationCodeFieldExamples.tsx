"use client"

import { TextInfoButton, VerificationCodeField } from "@umc-product/react"
import { useEffect, useState } from "react"

const CODE_LIFETIME_SECONDS = 180

const formatSeconds = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`

function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds)
  useEffect(() => {
    if (remaining === 0) return
    const timer = window.setTimeout(
      () => setRemaining((value) => value - 1),
      1000,
    )
    return () => window.clearTimeout(timer)
  }, [remaining])
  return [remaining, () => setRemaining(initialSeconds)] as const
}

export function VerificationCodeFieldDefault() {
  const [remaining, restart] = useCountdown(CODE_LIFETIME_SECONDS)
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="verification-code-box verification-code-timer verification-code-info"
      >
        <VerificationCodeField
          label="인증번호"
          placeholder="숫자 6자리"
          maxLength={6}
          caption="메일로 받은 인증번호를 입력하세요"
          timer={formatSeconds(remaining)}
          info={
            <TextInfoButton onClick={restart}>
              인증번호 다시 받기
            </TextInfoButton>
          }
        />
      </div>
    </div>
  )
}

export function VerificationCodeFieldStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="verification-code-filled"
      >
        <VerificationCodeField
          label="인증번호"
          defaultValue="123456"
          timer="02:31"
        />
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="verification-code-invalid"
      >
        <VerificationCodeField
          label="인증번호"
          defaultValue="123450"
          timer="01:12"
          invalid
          errorMessage="인증번호가 일치하지 않습니다"
        />
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="verification-code-disabled"
      >
        <VerificationCodeField
          label="인증번호"
          placeholder="숫자 6자리"
          timer="00:00"
          disabled
        />
      </div>
    </div>
  )
}
