"use client"

import { PaperclipIcon } from "@umc-product/icons"
import {
  useRef,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react"

import { Button } from "../../button/Button.tsx"
import { InputBox } from "../../forms/input-box/InputBox.tsx"
import {
  clearInputValue,
  useInputFilled,
} from "../../forms/input-box/input-value.ts"
import { cx } from "../../internal/cx.ts"
import { mergeRefs } from "../../internal/merge-refs.ts"
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
  removable: boolean
  disabled: boolean
  removeLabel: ReactNode
  onRemove: (() => void) | undefined
}

function AttachedFile({
  attachment,
  removable,
  disabled,
  removeLabel,
  onRemove,
}: AttachedFileProps) {
  return (
    <>
      <InputBox
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
      </InputBox>
      {removable && (
        <Button
          type="button"
          variant="weak"
          color="neutral"
          size="md"
          disabled={disabled}
          onClick={onRemove}
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
      <InputBox
        size="lg"
        disabled={disabled}
        className="umc-form-attachment-field__box"
      >
        <input
          {...inputProps}
          ref={mergeRefs(inputRef, ref)}
          type="text"
          inputMode="url"
          className="umc-input-box__input"
          readOnly={readOnly}
          disabled={disabled}
          data-filled={filled ? "" : undefined}
          onChange={(event) => {
            trackFilled(event)
            onChange?.(event)
          }}
        />
      </InputBox>
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
  readOnly,
  disabled,
  required,
  className,
  style,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ...inputProps
}: FormAttachmentFieldProps) {
  const question = useFormQuestion()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isReadOnly = readOnly ?? question?.readOnly ?? false
  const isDisabled = disabled ?? question?.disabled ?? false

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
    >
      {attachment ? (
        <AttachedFile
          attachment={attachment}
          removable={!isReadOnly}
          disabled={isDisabled}
          removeLabel={removeLabel}
          onRemove={onAttachmentRemove}
        />
      ) : (
        <LinkInput
          inputProps={{
            ...inputProps,
            placeholder,
            required: required ?? question?.required,
            "aria-labelledby": labelledBy ?? question?.titleId,
            "aria-describedby":
              cx(question?.descriptionId, describedBy) || undefined,
          }}
          readOnly={isReadOnly}
          disabled={isDisabled}
          uploadLabel={uploadLabel}
          removeLabel={removeLabel}
          onUploadClick={() => fileInputRef.current?.click()}
        />
      )}
      {!isReadOnly && (
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
