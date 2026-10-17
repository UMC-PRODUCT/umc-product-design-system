"use client"

import { Field as BaseUIField } from "@base-ui/react"
import { mergeProps } from "@base-ui/react/merge-props"
import type { ComponentPropsWithRef } from "react"

import { mergeRefs } from "../../internal/merge-refs.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"
import { InputBox } from "../input-box/InputBox.tsx"

export type TextFieldAreaProps = Omit<
  ComponentPropsWithRef<"textarea">,
  "size"
> &
  FieldOwnProps & {
    size?: "lg" | "md"
  }

const DEFAULT_ROWS = 2

export function TextFieldArea({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  size = "lg",
  rows = DEFAULT_ROWS,
  disabled,
  className,
  value,
  defaultValue,
  ref,
  ...textareaProps
}: TextFieldAreaProps) {
  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      invalid={invalid}
      errorMessage={errorMessage}
      disabled={disabled}
      className={className}
    >
      <InputBox
        size={size}
        invalid={invalid}
        disabled={disabled}
        className="umc-text-field-area"
      >
        <BaseUIField.Control
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          render={(controlProps) => (
            <textarea
              {...mergeProps<"textarea">(controlProps, {
                ...textareaProps,
                rows,
                className: "umc-input-box__input umc-text-field-area__input",
              })}
              ref={mergeRefs(controlProps.ref, ref)}
            />
          )}
        />
      </InputBox>
    </Field>
  )
}
