"use client"

import { Field as BaseUIField } from "@base-ui/react"
import {
  EyeInvisibleIcon,
  EyeVisibleIcon,
  RemoveCircleIcon,
} from "@umc-product/icons"
import {
  type ComponentPropsWithRef,
  type ReactNode,
  useRef,
  useState,
} from "react"

import { mergeRefs } from "../../internal/merge-refs.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"
import { InputBox } from "../input-box/InputBox.tsx"
import { clearInputValue, useInputFilled } from "../input-box/input-value.ts"

export type TextFieldProps = Omit<ComponentPropsWithRef<"input">, "size"> &
  FieldOwnProps & {
    size?: "lg" | "md"
    unit?: ReactNode
    clearable?: boolean
  }

const SHOW_PASSWORD_LABEL = "비밀번호 표시"
const HIDE_PASSWORD_LABEL = "비밀번호 숨기기"
const CLEAR_LABEL = "입력 내용 지우기"

export function TextField({
  label,
  required,
  caption,
  captionColor,
  captionSize,
  invalid,
  errorMessage,
  size = "lg",
  unit,
  clearable = true,
  type = "text",
  disabled,
  readOnly,
  className,
  onChange,
  ref,
  ...inputProps
}: TextFieldProps) {
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
      className={className}
    >
      <InputBox
        size={size}
        invalid={invalid}
        disabled={disabled}
        data-type="text"
      >
        <BaseUIField.Control
          {...inputProps}
          ref={mergeRefs(inputRef, ref)}
          type={isPassword && passwordVisible ? "text" : type}
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
        {isPassword && (
          <button
            type="button"
            className="umc-input-box__password-toggle"
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
        {unit && <span className="umc-input-box__unit">{unit}</span>}
      </InputBox>
    </Field>
  )
}
