"use client"

import { Field as BaseUIField } from "@base-ui/react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useState, type ChangeEvent, type ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"
import { mergeRefs } from "../../internal/merge-refs.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"

export type TextAreaProps = ComponentPropsWithRef<"textarea"> & FieldOwnProps

type TextAreaValue = TextAreaProps["value"]

const lengthOf = (text: TextAreaValue) =>
  text === undefined ? 0 : String(text).length

export function TextArea({
  label,
  required,
  caption,
  captionColor,
  captionSize,
  invalid,
  errorMessage,
  disabled,
  readOnly,
  className,
  value,
  defaultValue,
  maxLength,
  onChange,
  ref,
  ...textareaProps
}: TextAreaProps) {
  const [typedLength, setTypedLength] = useState(() => lengthOf(defaultValue))
  const isControlled = value !== undefined
  const currentLength = isControlled ? lengthOf(value) : typedLength
  const showCounter = maxLength !== undefined

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setTypedLength(event.target.value.length)
    onChange?.(event)
  }

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
      className={cx("umc-text-area-field", className)}
    >
      <div
        className="umc-text-area"
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
      >
        <BaseUIField.Control
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          render={(controlProps) => (
            <textarea
              {...mergeProps<"textarea">(controlProps, {
                ...textareaProps,
                maxLength,
                onChange: handleChange,
                className: "umc-text-area__input",
              })}
              ref={mergeRefs(controlProps.ref, ref)}
            />
          )}
        />
        {showCounter && (
          <span className="umc-text-area__counter">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  )
}
