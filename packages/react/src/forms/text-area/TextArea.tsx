"use client"

import { Field as BaseUIField } from "@base-ui/react"
import type {
  ChangeEventHandler,
  ComponentPropsWithRef,
  FocusEventHandler,
  Ref,
} from "react"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

export type TextAreaProps = Omit<ComponentPropsWithRef<"textarea">, "size"> &
  FieldOwnProps & {
    size?: "lg" | "md"
  }

export function TextArea({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  size = "lg",
  disabled,
  className,
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  ref,
  rows,
  maxLength,
  placeholder,
  readOnly,
  autoFocus,
  id: _id,
  ...restTextareaProps
}: TextAreaProps) {
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
        className="umc-input-box umc-textarea"
        data-size={size}
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
      >
        <BaseUIField.Control
          name={name}
          value={value as string | undefined}
          defaultValue={defaultValue as string | undefined}
          onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
          onBlur={onBlur as unknown as FocusEventHandler<HTMLInputElement>}
          ref={ref as unknown as Ref<HTMLInputElement>}
          disabled={disabled}
          required={required}
          render={
            <textarea
              className="umc-input-box__input umc-textarea__input"
              rows={rows}
              maxLength={maxLength}
              placeholder={placeholder}
              readOnly={readOnly}
              autoFocus={autoFocus}
              {...restTextareaProps}
            />
          }
        />
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
