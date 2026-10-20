import {
  CheckboxIcon,
  CloudUploadIcon,
  FileUploadIcon,
  RadioIcon,
  TextLineIcon,
} from "@umc-product/icons"
import type { FormQuestionTypeOption } from "@umc-product/react"

export type QuestionType =
  "short" | "long" | "single" | "multiple" | "file" | "portfolio"

type QuestionTypeOption = FormQuestionTypeOption & {
  value: QuestionType
  label: string
}

export const QUESTION_TYPES: readonly QuestionTypeOption[] = [
  { value: "short", label: "주관식", icon: <TextLineIcon weight="fill" /> },
  { value: "long", label: "장문형", icon: <TextLineIcon weight="fill" /> },
  { value: "single", label: "단일 선택", icon: <RadioIcon /> },
  { value: "multiple", label: "복수 선택", icon: <CheckboxIcon /> },
  { value: "file", label: "파일 업로드", icon: <CloudUploadIcon /> },
  { value: "portfolio", label: "포트폴리오", icon: <FileUploadIcon /> },
]

export const isQuestionType = (value: string): value is QuestionType =>
  QUESTION_TYPES.some((type) => type.value === value)

export const labelOfQuestionType = (value: QuestionType) =>
  QUESTION_TYPES.find((type) => type.value === value)?.label ?? value
