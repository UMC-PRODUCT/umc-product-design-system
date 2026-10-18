"use client"

import { CloudUploadIcon } from "@umc-product/icons"
import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react"

import { cx } from "../../internal/cx.ts"

export type ImageThumbnailEditorRejection = {
  file: File
  reason: "type" | "size"
}

export type ImageThumbnailEditorProps = Omit<
  ComponentPropsWithRef<"input">,
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "accept"
  | "multiple"
  | "children"
> & {
  value?: File | null
  defaultValue?: File | null
  onValueChange?: (value: File) => void
  onReject?: (rejection: ImageThumbnailEditorRejection) => void
  src?: string
  accept?: readonly string[]
  maxSize?: number
  label?: ReactNode
  description?: ReactNode
}

const MEGABYTE = 1024 * 1024
const DEFAULT_ACCEPT: readonly string[] = ["image/png", "image/svg+xml"]
const DEFAULT_MAX_SIZE = 5 * MEGABYTE
const DEFAULT_LABEL = "클릭 후 업로드"
const DEFAULT_DESCRIPTION = (
  <>
    PNG, SVG 형식의 <br />
    5MB 이하 파일
  </>
)

const rejectionReasonOf = (
  file: File,
  accept: readonly string[],
  maxSize: number,
): ImageThumbnailEditorRejection["reason"] | undefined => {
  if (!accept.includes(file.type)) return "type"
  if (file.size > maxSize) return "size"
  return undefined
}

const usePreviewUrl = (file: File | null) => {
  const [previewUrl, setPreviewUrl] = useState<string>()
  useEffect(() => {
    if (file === null) {
      setPreviewUrl(undefined)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])
  return previewUrl
}

export function ImageThumbnailEditor({
  value,
  defaultValue = null,
  onValueChange,
  onReject,
  src,
  accept = DEFAULT_ACCEPT,
  maxSize = DEFAULT_MAX_SIZE,
  label = DEFAULT_LABEL,
  description = DEFAULT_DESCRIPTION,
  disabled,
  className,
  style,
  "aria-describedby": describedBy,
  ...inputProps
}: ImageThumbnailEditorProps) {
  const [uncontrolledFile, setUncontrolledFile] = useState(defaultValue)
  const isControlled = value !== undefined
  const file = isControlled ? value : uncontrolledFile
  const previewUrl = usePreviewUrl(file)
  const imageSrc = previewUrl ?? (src === "" ? undefined : src)
  const labelId = useId()
  const descriptionId = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0]
    event.target.value = ""
    if (picked === undefined) return
    const reason = rejectionReasonOf(picked, accept, maxSize)
    if (reason !== undefined) {
      onReject?.({ file: picked, reason })
      return
    }
    if (!isControlled) setUncontrolledFile(picked)
    onValueChange?.(picked)
  }

  return (
    <div
      className={cx("umc-image-thumbnail-editor", className)}
      style={style}
      data-filled={imageSrc === undefined ? undefined : ""}
      data-disabled={disabled ? "" : undefined}
    >
      {imageSrc !== undefined && (
        <img
          className="umc-image-thumbnail-editor__image"
          src={imageSrc}
          alt=""
        />
      )}
      <span className="umc-image-thumbnail-editor__guide" aria-hidden="true">
        <CloudUploadIcon
          weight="fill"
          className="umc-image-thumbnail-editor__icon"
        />
        <span className="umc-image-thumbnail-editor__text">
          <span id={labelId} className="umc-image-thumbnail-editor__label">
            {label}
          </span>
          <span
            id={descriptionId}
            className="umc-image-thumbnail-editor__description"
          >
            {description}
          </span>
        </span>
      </span>
      <input
        aria-labelledby={labelId}
        {...inputProps}
        aria-describedby={cx(descriptionId, describedBy)}
        type="file"
        accept={accept.join(",")}
        disabled={disabled}
        className="umc-image-thumbnail-editor__input"
        onChange={handleChange}
      />
    </div>
  )
}
