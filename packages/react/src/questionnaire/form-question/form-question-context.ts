"use client"

import { createContext, useContext } from "react"

export type FormQuestionContextValue = {
  titleId: string
  descriptionId: string | undefined
  required: boolean
  readOnly: boolean
  disabled: boolean
}

export const FormQuestionContext =
  createContext<FormQuestionContextValue | null>(null)

export const useFormQuestion = (): FormQuestionContextValue | null =>
  useContext(FormQuestionContext)
