"use client"

import { PaperclipIcon } from "@umc-product/icons"
import {
  useId,
  useRef,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react"

import { Button } from "../../button/Button.tsx"
import { TextFieldBoxField } from "../../forms/text-field-box-field/TextFieldBoxField.tsx"
import {
  clearInputValue,
  useInputFilled,
} from "../../forms/text-field-box-field/input-value.ts"
import { cx } from "../../internal/cx.ts"
import { mergeRefs } from "../../internal/merge-refs.ts"
import { useFormQuestionEditor } from "../form-question-editor/form-question-editor-context.ts"
import { useFormQuestion } from "../form-question/form-question-context.ts"

export type FormAttachment = {
  label: ReactNode
  href?: string
}

export type FormAttachmentRejection = {
  file: File
  reason: "type" | "size"
}

type NativeInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "accept" | "multiple" | "size" | "children"
>

export type FormAttachmentFieldProps = NativeInputProps & {
  attachment?: FormAttachment | null
  onAttachmentRemove?: () => void
  onFileSelect?: (file: File) => void
  onReject?: (rejection: FormAttachmentRejection) => void
  accept?: readonly string[]
  maxSize?: number
  uploadLabel?: ReactNode
  removeLabel?: ReactNode
  preview?: boolean
  invalid?: boolean
  errorMessage?: ReactNode
}

const MEGABYTE = 1024 * 1024
const DEFAULT_ACCEPT: readonly string[] = ["application/pdf"]
const DEFAULT_MAX_SIZE = 200 * MEGABYTE
const DEFAULT_PLACEHOLDER =
  "링크를 입력하거나 파일을 첨부하세요. 파일은 200MB 이하의 PDF 파일만 업로드 할 수 있어요"
const DEFAULT_UPLOAD_LABEL = "파일 업로드"
const DEFAULT_REMOVE_LABEL = "삭제"

const rejectionReasonOf = (
  file: File,
  accept: readonly string[],
  maxSize: number,
): FormAttachmentRejection["reason"] | undefined => {
  if (!accept.includes(file.type)) return "type"
  if (file.size > maxSize) return "size"
  return undefined
}

type AttachedFileProps = {
  attachment: FormAttachment
  disabled: boolean
  removeLabel: ReactNode
  onRemove: (() => void) | undefined
}

function AttachedFile({
  attachment,
  disabled,
  removeLabel,
  onRemove,
}: AttachedFileProps) {
  return (
    <>
      <TextFieldBoxField
        size="lg"
        disabled={disabled}
        className="umc-form-attachment-field__box"
      >
        <PaperclipIcon
          weight="fill"
          size={18}
          className="umc-form-attachment-field__clip"
        />
        {attachment.href === undefined ? (
          <span className="umc-form-attachment-field__name">
            {attachment.label}
          </span>
        ) : (
          <a
            className="umc-form-attachment-field__name"
            href={attachment.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {attachment.label}
          </a>
        )}
      </TextFieldBoxField>
      {onRemove !== undefined && (
        <Button
          type="button"
          variant="weak"
          color="neutral"
          size="md"
          disabled={disabled}
          onClick={() => onRemove()}
        >
          {removeLabel}
        </Button>
      )}
    </>
  )
}

type LinkInputProps = {
  inputProps: NativeInputProps
  readOnly: boolean
  disabled: boolean
  uploadLabel: ReactNode
  removeLabel: ReactNode
  onUploadClick: () => void
}

function LinkInput({
  inputProps: { ref, onChange, ...inputProps },
  readOnly,
  disabled,
  uploadLabel,
  removeLabel,
  onUploadClick,
}: LinkInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filled, trackFilled] = useInputFilled(
    inputProps.value,
    inputProps.defaultValue,
  )

  return (
    <>
      <TextFieldBoxField
        size="lg"
        disabled={disabled}
        className="umc-form-attachment-field__box"
      >
        <input
          {...inputProps}
          ref={mergeRefs(inputRef, ref)}
          type="text"
          inputMode="url"
          className="umc-text-field-box-field__input"
          readOnly={readOnly}
          disabled={disabled}
          data-filled={filled ? "" : undefined}
          onChange={(event) => {
            trackFilled(event)
            onChange?.(event)
          }}
        />
      </TextFieldBoxField>
      {!readOnly &&
        (filled ? (
          <Button
            type="button"
            variant="weak"
            color="neutral"
            size="md"
            disabled={disabled}
            onClick={() => clearInputValue(inputRef.current)}
          >
            {removeLabel}
          </Button>
        ) : (
          <Button
            type="button"
            variant="weak"
            color="primary"
            size="md"
            disabled={disabled}
            onClick={onUploadClick}
          >
            {uploadLabel}
          </Button>
        ))}
    </>
  )
}

type AttachmentPreviewProps = {
  inputProps: NativeInputProps
  disabled: boolean
  uploadLabel: ReactNode
}

function AttachmentPreview({
  inputProps,
  disabled,
  uploadLabel,
}: AttachmentPreviewProps) {
  return (
    <>
      <TextFieldBoxField
        size="lg"
        disabled={disabled}
        className="umc-form-attachment-field__box"
      >
        <input
          {...inputProps}
          type="text"
          className="umc-text-field-box-field__input"
          readOnly
          disabled={disabled}
        />
      </TextFieldBoxField>
      <Button type="button" variant="weak" color="primary" size="md" disabled>
        {uploadLabel}
      </Button>
    </>
  )
}

export function FormAttachmentField({
  attachment,
  onAttachmentRemove,
  onFileSelect,
  onReject,
  accept = DEFAULT_ACCEPT,
  maxSize = DEFAULT_MAX_SIZE,
  uploadLabel = DEFAULT_UPLOAD_LABEL,
  removeLabel = DEFAULT_REMOVE_LABEL,
  placeholder = DEFAULT_PLACEHOLDER,
  preview = false,
  invalid,
  errorMessage,
  readOnly,
  disabled,
  required,
  className,
  style,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...inputProps
}: FormAttachmentFieldProps) {
  const question = useFormQuestion()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const errorId = useId()
  const isReadOnly = readOnly ?? question?.readOnly ?? false
  const editor = useFormQuestionEditor()
  const lockedByEditor = editor?.disabled ?? false
  const isDisabled = lockedByEditor || (disabled ?? question?.disabled ?? false)
  const showError = Boolean(invalid && errorMessage)
  const linkInputAriaProps = {
    "aria-labelledby": labelledBy ?? question?.titleId,
    "aria-describedby":
      cx(question?.descriptionId, describedBy, showError && errorId) ||
      undefined,
    "aria-invalid": invalid || ariaInvalid,
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (file === undefined) return
    const reason = rejectionReasonOf(file, accept, maxSize)
    if (reason === undefined) {
      onFileSelect?.(file)
    } else {
      onReject?.({ file, reason })
    }
  }

  return (
    <div
      className={cx("umc-form-attachment-field", className)}
      style={style}
      data-attached={attachment ? "" : undefined}
      data-preview={preview ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
    >
      <div className="umc-form-attachment-field__row">
        {preview ? (
          <AttachmentPreview
            inputProps={{
              ...inputProps,
              ...linkInputAriaProps,
              placeholder,
            }}
            disabled={isDisabled}
            uploadLabel={uploadLabel}
          />
        ) : attachment ? (
          <AttachedFile
            attachment={attachment}
            disabled={isDisabled}
            removeLabel={removeLabel}
            onRemove={isReadOnly ? undefined : onAttachmentRemove}
          />
        ) : (
          <LinkInput
            inputProps={{
              ...inputProps,
              ...linkInputAriaProps,
              placeholder,
              required: required ?? question?.required,
            }}
            readOnly={isReadOnly}
            disabled={isDisabled}
            uploadLabel={uploadLabel}
            removeLabel={removeLabel}
            onUploadClick={() => fileInputRef.current?.click()}
          />
        )}
      </div>
      {showError && (
        <p id={errorId} className="umc-form-attachment-field__error">
          {errorMessage}
        </p>
      )}
      {!isReadOnly && !preview && (
        <input
          ref={fileInputRef}
          type="file"
          className="umc-form-attachment-field__file"
          accept={accept.join(",")}
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleFileChange}
        />
      )}
    </div>
  )
}
