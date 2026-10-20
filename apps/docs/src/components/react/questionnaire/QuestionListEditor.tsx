"use client"

import {
  FormAttachmentField,
  FormChoiceListEditor,
  FormEditableQuestion,
  FormQuestionEditor,
  FormQuestionToolbar,
  FormQuestionTypeList,
  TextArea,
  type FormChoiceDraftOption,
} from "@umc-product/react"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import {
  QUESTION_TYPES,
  isQuestionType,
  type QuestionType,
} from "./question-types.tsx"

export type DraftQuestion = {
  id: string
  type: QuestionType
  title: string
  description: string
  required: boolean
  options: readonly FormChoiceDraftOption[]
}

type ChoiceType = "single" | "multiple"

const TEXT_LIMITS: Readonly<Record<"short" | "long", number>> = {
  short: 500,
  long: 1000,
}

const isChoiceType = (type: QuestionType): type is ChoiceType =>
  type === "single" || type === "multiple"

const ARROW_OFFSETS: Readonly<Record<string, number>> = {
  ArrowUp: -1,
  ArrowDown: 1,
}

const numberOf = (index: number) => String(index + 1).padStart(2, "0")

type AnswerPreviewProps = {
  question: DraftQuestion
  number: string
  createId: () => string
  onOptionsChange: (options: readonly FormChoiceDraftOption[]) => void
}

function AnswerPreview({
  question,
  number,
  createId,
  onOptionsChange,
}: AnswerPreviewProps): ReactNode {
  const { type, options } = question
  if (isChoiceType(type)) {
    return (
      <FormChoiceListEditor
        type={type}
        options={options}
        optionLabel={`${number}번 질문 보기`}
        onOptionChange={(id, label) =>
          onOptionsChange(
            options.map((option) =>
              option.id === id ? { ...option, label } : option,
            ),
          )
        }
        onOptionAdd={() =>
          onOptionsChange([...options, { id: createId(), label: "" }])
        }
        onOptionRemove={(id) =>
          onOptionsChange(options.filter((option) => option.id !== id))
        }
      />
    )
  }
  if (type === "file" || type === "portfolio") {
    return <FormAttachmentField preview aria-label={`${number}번 첨부 칸`} />
  }
  return (
    <TextArea
      placeholder="작성하세요"
      maxLength={TEXT_LIMITS[type]}
      readOnly
      aria-label={`${number}번 답 칸`}
    />
  )
}

type QuestionListEditorProps = {
  initialQuestions: readonly DraftQuestion[]
}

export function QuestionListEditor({
  initialQuestions,
}: QuestionListEditorProps) {
  const idPrefix = useId()
  const reorderHelpId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const pointerPressed = useRef(false)
  const focusAddButton = useRef(false)
  const nextId = useRef(0)
  const [questions, setQuestions] = useState(initialQuestions)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const hasActiveQuestion = questions.some(
    (question) => question.id === activeId,
  )

  const createId = () => {
    nextId.current += 1
    return `${idPrefix}-${nextId.current}`
  }

  useEffect(() => {
    const press = () => {
      pointerPressed.current = true
    }
    const release = () => {
      pointerPressed.current = false
    }
    const deactivateOutside = (event: MouseEvent) => {
      const root = rootRef.current
      if (root !== null && !event.composedPath().includes(root)) {
        setActiveId(null)
      }
    }
    document.addEventListener("pointerdown", press, true)
    document.addEventListener("pointerup", release, true)
    document.addEventListener("pointercancel", release, true)
    document.addEventListener("click", deactivateOutside)
    return () => {
      document.removeEventListener("pointerdown", press, true)
      document.removeEventListener("pointerup", release, true)
      document.removeEventListener("pointercancel", release, true)
      document.removeEventListener("click", deactivateOutside)
    }
  }, [])

  useEffect(() => {
    if (!focusAddButton.current) return
    focusAddButton.current = false
    rootRef.current
      ?.querySelector<HTMLButtonElement>(".umc-floating-action-button")
      ?.focus()
  })

  const update = (id: string, patch: Partial<DraftQuestion>) =>
    setQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, ...patch } : question,
      ),
    )

  const changeType = (question: DraftQuestion, type: QuestionType) =>
    update(question.id, {
      type,
      options:
        isChoiceType(type) && question.options.length === 0
          ? [{ id: createId(), label: "" }]
          : question.options,
    })

  const addQuestion = (type: QuestionType) => {
    const id = createId()
    setQuestions((current) => [
      ...current,
      {
        id,
        type,
        title: "",
        description: "",
        required: false,
        options: isChoiceType(type) ? [{ id: createId(), label: "" }] : [],
      },
    ])
    setActiveId(id)
    setAddedId(id)
  }

  const removeQuestion = (id: string) => {
    setQuestions((current) => current.filter((question) => question.id !== id))
    setActiveId(null)
    focusAddButton.current = true
  }

  const moveQuestion = (index: number, offset: number) => {
    const target = index + offset
    if (target < 0 || target >= questions.length) return
    setQuestions((current) => {
      const next = [...current]
      const [moved] = next.splice(index, 1)
      if (moved !== undefined) next.splice(target, 0, moved)
      return next
    })
    setAnnouncement(
      `${numberOf(index)}번 질문을 ${numberOf(target)}번으로 옮겼습니다`,
    )
  }

  const reorderWithArrowKeys =
    (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
      const offset = ARROW_OFFSETS[event.key]
      if (offset === undefined) return
      event.preventDefault()
      moveQuestion(index, offset)
    }

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col"
      onBlur={(event) => {
        const next = event.relatedTarget
        if (
          !pointerPressed.current &&
          next !== null &&
          !event.currentTarget.contains(next)
        ) {
          setActiveId(null)
        }
      }}
    >
      <p id={reorderHelpId} hidden>
        위아래 화살표 키로 질문 순서를 바꿉니다
      </p>
      <p role="status" className="sr-only">
        {announcement}
      </p>
      {questions.map((question, index) => {
        const number = numberOf(index)
        return (
          <FormQuestionEditor
            key={question.id}
            active={question.id === activeId}
            required={question.required}
            onRequiredChange={(required) => update(question.id, { required })}
            onDelete={() => removeQuestion(question.id)}
            onClick={() => setActiveId(question.id)}
            onFocus={() => {
              if (!pointerPressed.current) setActiveId(question.id)
            }}
            dragHandleProps={{
              "aria-label": `${number}번 질문 순서 바꾸기`,
              "aria-describedby": reorderHelpId,
              onKeyDown: reorderWithArrowKeys(index),
            }}
            toolbar={
              <FormQuestionTypeList
                items={QUESTION_TYPES}
                value={question.type}
                onValueChange={(value) => {
                  if (isQuestionType(value)) changeType(question, value)
                }}
              />
            }
          >
            <FormEditableQuestion
              number={number}
              titleProps={{
                "aria-label": `${number}번 질문 제목`,
                value: question.title,
                autoFocus: question.id === addedId,
                onChange: (event) =>
                  update(question.id, { title: event.target.value }),
              }}
              descriptionProps={{
                "aria-label": `${number}번 질문 설명`,
                value: question.description,
                onChange: (event) =>
                  update(question.id, { description: event.target.value }),
              }}
            >
              <AnswerPreview
                question={question}
                number={number}
                createId={createId}
                onOptionsChange={(options) => update(question.id, { options })}
              />
            </FormEditableQuestion>
          </FormQuestionEditor>
        )
      })}
      {!hasActiveQuestion && (
        <FormQuestionToolbar
          items={QUESTION_TYPES}
          onTypeSelect={(value) => {
            if (isQuestionType(value)) addQuestion(value)
          }}
        />
      )}
    </div>
  )
}
