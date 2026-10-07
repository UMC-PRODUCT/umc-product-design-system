"use client"

import { Field as BaseUIField } from "@base-ui/react"
import { InfoIcon } from "@umc-product/icons"
import {
  type ComponentPropsWithRef,
  type MutableRefObject,
  type ReactNode,
  useRef,
} from "react"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

export type VerificationCodeFieldProps = Omit<
  ComponentPropsWithRef<"input">,
  "size"
> &
  FieldOwnProps & {
    size?: "lg" | "md"
    timer?: ReactNode
    infoSlot?: ReactNode
  }

export function VerificationCodeField({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  size = "lg",
  timer,
  infoSlot,
  disabled,
  className,
  onChange,
  ref: externalRef,
  ...inputProps
}: VerificationCodeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const mergedRef = (el: HTMLInputElement | null) => {
    ;(inputRef as MutableRefObject<HTMLInputElement | null>).current = el
    if (typeof externalRef === "function") externalRef(el)
    else if (externalRef)
      (externalRef as MutableRefObject<HTMLInputElement | null>).current = el
  }

  const showError = invalid && errorMessage

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
        className="umc-input-box umc-verification-code-field"
        data-size={size}
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
      >
        <BaseUIField.Control
          {...inputProps}
          ref={mergedRef}
          disabled={disabled}
          required={required}
          onChange={onChange}
          inputMode="numeric"
          render={<input className="umc-input-box__input" />}
        />
        {timer && (
          <span className="umc-input-box__accessory umc-verification-code-field__timer">
            {timer}
          </span>
        )}
      </div>
      {infoSlot && (
        <div className="umc-verification-code-field__info">
          <InfoIcon size={14} aria-hidden="true" />
          <span>{infoSlot}</span>
        </div>
      )}
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
