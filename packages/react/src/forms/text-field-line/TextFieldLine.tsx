"use client"

import { Field as BaseUIField } from "@base-ui/react"
import {
  EyeInvisibleIcon,
  EyeVisibleIcon,
  RemoveCircleIcon,
} from "@umc-product/icons"
import { type ComponentPropsWithRef, useRef, useState } from "react"

import { cx } from "../../internal/cx.ts"
import { mergeRefs } from "../../internal/merge-refs.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"
import {
  clearInputValue,
  useInputFilled,
} from "../text-field-box-field/input-value.ts"
import { TextFieldLineField } from "../text-field-line-field/TextFieldLineField.tsx"

export type TextFieldLineProps = Omit<ComponentPropsWithRef<"input">, "size"> &
  FieldOwnProps & {
    clearable?: boolean
  }

const SHOW_PASSWORD_LABEL = "비밀번호 표시"
const HIDE_PASSWORD_LABEL = "비밀번호 숨기기"
const CLEAR_LABEL = "입력 내용 지우기"

export function TextFieldLine({
  label,
  required,
  caption,
  captionColor,
  captionSize,
  invalid,
  errorMessage,
  clearable = true,
  type = "text",
  disabled,
  readOnly,
  className,
  onChange,
  ref,
  ...inputProps
}: TextFieldLineProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [filled, trackFilled] = useInputFilled(
    inputProps.value,
    inputProps.defaultValue,
  )
  const isPassword = type === "password"
  const showClear = clearable && !isPassword && filled && !disabled && !readOnly

  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      captionSize={captionSize}
      invalid={invalid}
      errorMessage={errorMessage}
      disabled={disabled}
      className={cx("umc-text-field-line", className)}
    >
      <TextFieldLineField invalid={invalid} disabled={disabled}>
        <BaseUIField.Control
          {...inputProps}
          ref={mergeRefs(inputRef, ref)}
          type={isPassword && passwordVisible ? "text" : type}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className="umc-text-field-line-field__input"
          onChange={(event) => {
            trackFilled(event)
            onChange?.(event)
          }}
        />
        {showClear && (
          <button
            type="button"
            className="umc-text-field-line-field__clear"
            aria-label={CLEAR_LABEL}
            tabIndex={-1}
            onClick={() => clearInputValue(inputRef.current)}
          >
            <RemoveCircleIcon weight="fill" size={24} />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            className="umc-text-field-line-field__password-toggle"
            aria-label={
              passwordVisible ? HIDE_PASSWORD_LABEL : SHOW_PASSWORD_LABEL
            }
            disabled={disabled}
            onClick={() => setPasswordVisible((visible) => !visible)}
          >
            {passwordVisible ? (
              <EyeInvisibleIcon size={24} />
            ) : (
              <EyeVisibleIcon size={24} />
            )}
          </button>
        )}
      </TextFieldLineField>
    </Field>
  )
}
