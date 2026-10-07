"use client"

import { Field as BaseUIField } from "@base-ui/react"
import { RemoveCircleIcon } from "@umc-product/icons"
import { type ComponentPropsWithRef, type ReactNode, useRef } from "react"

import { mergeRefs } from "../../internal/merge-refs.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"
import { InputBox } from "../input-box/InputBox.tsx"
import { clearInputValue, useInputFilled } from "../input-box/input-value.ts"

export type VerificationCodeFieldProps = Omit<
  ComponentPropsWithRef<"input">,
  "size"
> &
  FieldOwnProps & {
    size?: "lg" | "md"
    timer?: ReactNode
    info?: ReactNode
    clearable?: boolean
  }

const CLEAR_LABEL = "인증번호 지우기"

export function VerificationCodeField({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  size = "lg",
  timer,
  info,
  clearable = true,
  disabled,
  readOnly,
  className,
  onChange,
  ref,
  ...inputProps
}: VerificationCodeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filled, trackFilled] = useInputFilled(
    inputProps.value,
    inputProps.defaultValue,
  )
  const showClear = clearable && filled && !disabled && !readOnly

  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      invalid={invalid}
      errorMessage={errorMessage}
      info={info}
      disabled={disabled}
      className={className}
    >
      <InputBox
        size={size}
        invalid={invalid}
        disabled={disabled}
        data-type="text"
      >
        <BaseUIField.Control
          inputMode="numeric"
          autoComplete="one-time-code"
          {...inputProps}
          ref={mergeRefs(inputRef, ref)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className="umc-input-box__input"
          onChange={(event) => {
            trackFilled(event)
            onChange?.(event)
          }}
        />
        {showClear && (
          <button
            type="button"
            className="umc-input-box__clear"
            aria-label={CLEAR_LABEL}
            tabIndex={-1}
            onClick={() => clearInputValue(inputRef.current)}
          >
            <RemoveCircleIcon weight="fill" size={24} />
          </button>
        )}
        {timer && <span className="umc-input-box__timer">{timer}</span>}
      </InputBox>
    </Field>
  )
}
