"use client"

import { Field as BaseUIField } from "@base-ui/react"
import {
  EyeInvisibleIcon,
  EyeVisibleIcon,
  RemoveCircleIcon,
} from "@umc-product/icons"
import {
  type ComponentPropsWithRef,
  type MutableRefObject,
  type ReactNode,
  useRef,
  useState,
} from "react"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

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
  invalid,
  errorMessage,
  size = "lg",
  unit,
  clearable = true,
  type: typeProp = "text",
  disabled,
  className,
  onChange,
  ref: externalRef,
  ...inputProps
}: TextFieldProps) {
  const isPassword = typeProp === "password"
  const [showPassword, setShowPassword] = useState(false)
  const actualType = isPassword && showPassword ? "text" : typeProp
  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = Boolean(inputProps.value || inputProps.defaultValue)
  const showClear = clearable && !isPassword && hasValue && !disabled

  const handleClear = () => {
    const input = inputRef.current
    if (!input) return
    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set
    nativeSetter?.call(input, "")
    input.dispatchEvent(new Event("input", { bubbles: true }))
  }

  const showError = invalid && errorMessage

  const mergedRef = (el: HTMLInputElement | null) => {
    ;(inputRef as MutableRefObject<HTMLInputElement | null>).current = el
    if (typeof externalRef === "function") externalRef(el)
    else if (externalRef)
      (externalRef as MutableRefObject<HTMLInputElement | null>).current = el
  }

  return (
    <BaseUIField.Root
      invalid={invalid}
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      {label && (
        <BaseUIField.Label className="umc-field__label">
          {label}
          {required && (
            <span aria-hidden="true" className="umc-field__required">
              {" "}
              *
            </span>
          )}
        </BaseUIField.Label>
      )}
      <div
        className="umc-input-box"
        data-size={size}
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
      >
        <BaseUIField.Control
          {...inputProps}
          ref={mergedRef}
          type={actualType}
          disabled={disabled}
          required={required}
          onChange={onChange}
          render={<input className="umc-input-box__input" />}
        />
        {unit && <span className="umc-input-box__unit">{unit}</span>}
        {showClear && (
          <button
            type="button"
            aria-label={CLEAR_LABEL}
            className="umc-input-box__icon-btn"
            tabIndex={-1}
            onClick={handleClear}
          >
            <RemoveCircleIcon size={24} aria-hidden="true" />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            aria-label={
              showPassword ? HIDE_PASSWORD_LABEL : SHOW_PASSWORD_LABEL
            }
            className="umc-input-box__icon-btn"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeInvisibleIcon size={24} aria-hidden="true" />
            ) : (
              <EyeVisibleIcon size={24} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {showError ? (
        <BaseUIField.Error
          match={true}
          render={
            <span className="umc-field__caption umc-field__caption--error" />
          }
        >
          {errorMessage}
        </BaseUIField.Error>
      ) : caption ? (
        <BaseUIField.Description
          render={
            <span
              className={cx(
                "umc-field__caption",
                invalid && "umc-field__caption--error",
                captionColor === "primary" && "umc-field__caption--primary",
              )}
            />
          }
        >
          {caption}
        </BaseUIField.Description>
      ) : null}
    </BaseUIField.Root>
  )
}
