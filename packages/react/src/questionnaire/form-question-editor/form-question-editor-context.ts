"use client"

import { createContext, useContext } from "react"

export type FormQuestionEditorContextValue = {
  required: boolean
  disabled: boolean
}

export const FormQuestionEditorContext =
  createContext<FormQuestionEditorContextValue | null>(null)

export const useFormQuestionEditor =
  (): FormQuestionEditorContextValue | null =>
    useContext(FormQuestionEditorContext)
