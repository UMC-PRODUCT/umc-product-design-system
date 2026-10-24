"use client"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useDndContext,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type Over,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  hasSortableData,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  FormEditableQuestion,
  FormQuestionEditor,
  FormSection,
  FormSectionEmpty,
  TextArea,
  type FormSectionVariant,
} from "@umc-product/react"
import { useCallback, useEffect, useId, useRef, useState } from "react"

type SortableQuestion = {
  id: string
  title: string
}

type QuestionSection = {
  id: string
  title: string
  variant: FormSectionVariant
  optionalLabel?: string
}

type SectionQuestions = Readonly<Record<string, readonly SortableQuestion[]>>

const SECTIONS: readonly QuestionSection[] = [
  { id: "common", title: "공통 문항", variant: "static" },
  { id: "pm", title: "PM", variant: "toggle", optionalLabel: "(선택 사항)" },
  {
    id: "design",
    title: "Design",
    variant: "toggle",
    optionalLabel: "(선택 사항)",
  },
  { id: "web", title: "Web", variant: "toggle", optionalLabel: "(선택 사항)" },
]

const INITIAL_QUESTIONS: SectionQuestions = {
  common: [
    { id: "introduction", title: "자기소개를 적어 주세요" },
    { id: "motivation", title: "지원 동기를 적어 주세요" },
    { id: "schedule", title: "활동할 수 있는 시간을 적어 주세요" },
  ],
  pm: [{ id: "pm-experience", title: "기획해 본 서비스를 소개해 주세요" }],
  design: [],
  web: [{ id: "web-stack", title: "써 본 프레임워크를 적어 주세요" }],
}

const INITIAL_ENABLED: Readonly<Record<string, boolean>> = {
  common: true,
  pm: true,
  design: true,
  web: false,
}

const ROLE_DESCRIPTION = "순서 바꾸기 손잡이"

const SCREEN_READER_INSTRUCTIONS = {
  draggable:
    "질문을 들려면 스페이스바나 엔터 키를 누릅니다. 든 동안 위아래 화살표 키로 옮기고, 스페이스바나 엔터 키로 놓습니다. Esc 키를 누르면 취소합니다.",
}

const MEASURING = {
  droppable: { strategy: MeasuringStrategy.Always },
}

const detectCollision: CollisionDetection = (args) => {
  const underPointer = pointerWithin(args)
  return underPointer.length > 0 ? underPointer : closestCorners(args)
}

const numberOf = (index: number) => String(index + 1).padStart(2, "0")

const sectionTitleOf = (sectionId: string) =>
  SECTIONS.find((section) => section.id === sectionId)?.title ?? sectionId

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])
  return reduced
}

type QuestionCardProps = {
  question: SortableQuestion
  sectionTitle: string
  disabled: boolean
  reducedMotion: boolean
  onTitleChange: (title: string) => void
}

function SortableQuestionCard({
  question,
  sectionTitle,
  disabled,
  reducedMotion,
  onTitleChange,
}: QuestionCardProps) {
  const sortable = useSortable({
    id: question.id,
    disabled,
    attributes: { roleDescription: ROLE_DESCRIPTION },
    transition: reducedMotion ? null : undefined,
  })
  const { setActivatorNodeRef } = sortable
  const handleRef = useRef<HTMLButtonElement | null>(null)
  const movedInWhileDragging = useRef(sortable.isDragging)
  const setHandleRef = useCallback(
    (node: HTMLButtonElement | null) => {
      setActivatorNodeRef(node)
      handleRef.current = node
    },
    [setActivatorNodeRef],
  )

  useEffect(() => {
    if (movedInWhileDragging.current) {
      handleRef.current?.focus({ preventScroll: true })
    }
  }, [])

  const number = numberOf(sortable.newIndex)
  return (
    <FormQuestionEditor
      ref={sortable.setNodeRef}
      dragPlaceholder={sortable.isDragging}
      style={{
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
      }}
      dragHandleProps={{
        ref: setHandleRef,
        ...sortable.attributes,
        ...sortable.listeners,
        "aria-label": `${sectionTitle} ${number}번 질문 순서 바꾸기`,
      }}
    >
      <FormEditableQuestion
        number={number}
        titleProps={{
          "aria-label": `${sectionTitle} ${number}번 질문 제목`,
          value: question.title,
          onChange: (event) => onTitleChange(event.target.value),
        }}
      >
        <TextArea
          placeholder="작성하세요"
          maxLength={500}
          readOnly
          aria-label={`${sectionTitle} ${number}번 답 칸`}
        />
      </FormEditableQuestion>
    </FormQuestionEditor>
  )
}

type DraggingQuestionPreviewProps = {
  question: SortableQuestion
  startIndex: number
}

function DraggingQuestionPreview({
  question,
  startIndex,
}: DraggingQuestionPreviewProps) {
  const { over } = useDndContext()
  const landingIndexOf = () => {
    if (over === null) return startIndex
    if (hasSortableData(over)) return over.data.current.sortable.index
    return 0
  }
  return (
    <div inert>
      <FormQuestionEditor dragging dragHandleProps={{}}>
        <FormEditableQuestion
          number={numberOf(landingIndexOf())}
          titleProps={{ value: question.title, readOnly: true }}
        >
          <TextArea placeholder="작성하세요" maxLength={500} readOnly />
        </FormEditableQuestion>
      </FormQuestionEditor>
    </div>
  )
}

type EmptyDropZoneProps = {
  sectionId: string
  enabled: boolean
  dragging: boolean
}

function EmptyDropZone({ sectionId, enabled, dragging }: EmptyDropZoneProps) {
  const droppable = useDroppable({ id: sectionId, disabled: !enabled })
  return (
    <FormSectionEmpty
      ref={droppable.setNodeRef}
      dropTarget={dragging && enabled}
    />
  )
}

export function SortableQuestionSections() {
  const dndId = useId()
  const reducedMotion = usePrefersReducedMotion()
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS)
  const [enabled, setEnabled] = useState(INITIAL_ENABLED)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const snapshot = useRef<SectionQuestions | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const sectionOf = (id: UniqueIdentifier) => {
    if (typeof id === "string" && Object.hasOwn(questions, id)) return id
    return Object.keys(questions).find((sectionId) =>
      questions[sectionId]?.some((question) => question.id === id),
    )
  }

  const questionOf = (id: UniqueIdentifier) => {
    const sectionId = sectionOf(id)
    if (sectionId === undefined) return undefined
    const list = questions[sectionId] ?? []
    const index = list.findIndex((question) => question.id === id)
    const question = list[index]
    if (question === undefined) return undefined
    return { question, sectionId, index }
  }

  const labelOf = (id: UniqueIdentifier) => {
    const title = questionOf(id)?.question.title
    return title ? `"${title}" 질문` : "제목 없는 질문"
  }

  const placeOf = (over: Over) => {
    if (hasSortableData(over)) {
      const { containerId, index } = over.data.current.sortable
      return `${sectionTitleOf(String(containerId))} ${index + 1}번째 자리`
    }
    return `${sectionTitleOf(String(over.id))} 첫 자리`
  }

  const destinationOf = (activeId: UniqueIdentifier, over: Over) => {
    const crossesSection =
      hasSortableData(over) &&
      String(over.data.current.sortable.containerId) !== sectionOf(activeId)
    if (crossesSection) {
      return `${sectionTitleOf(String(over.data.current.sortable.containerId))} 섹션으로`
    }
    return `${placeOf(over)}로`
  }

  const announcements: Announcements = {
    onDragStart: ({ active }) => `${labelOf(active.id)}을 들었습니다.`,
    onDragOver: ({ active, over }) =>
      over === null
        ? "놓을 수 있는 자리가 아닙니다."
        : `${labelOf(active.id)}을 ${destinationOf(active.id, over)} 옮기는 중입니다.`,
    onDragEnd: ({ active, over }) =>
      over === null
        ? `${labelOf(active.id)}을 놓을 자리가 없어 그대로 두었습니다.`
        : `${labelOf(active.id)}을 ${placeOf(over)}에 놓았습니다.`,
    onDragCancel: ({ active }) =>
      `옮기기를 취소했습니다. ${labelOf(active.id)}은 원래 자리에 있습니다.`,
  }

  const changeTitle = (sectionId: string, id: string, title: string) =>
    setQuestions((current) => ({
      ...current,
      [sectionId]: (current[sectionId] ?? []).map((question) =>
        question.id === id ? { ...question, title } : question,
      ),
    }))

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    snapshot.current = questions
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (over === null) return
    const from = sectionOf(active.id)
    const to = sectionOf(over.id)
    if (from === undefined || to === undefined || from === to) return
    setQuestions((current) => {
      const moving = current[from]?.find(
        (question) => question.id === active.id,
      )
      if (moving === undefined) return current
      const target = current[to] ?? []
      const overIndex = target.findIndex((question) => question.id === over.id)
      const translated = active.rect.current.translated
      const isBelowOver =
        translated !== null &&
        translated.top > over.rect.top + over.rect.height / 2
      const index =
        overIndex < 0 ? target.length : overIndex + (isBelowOver ? 1 : 0)
      return {
        ...current,
        [from]: (current[from] ?? []).filter(
          (question) => question.id !== active.id,
        ),
        [to]: [...target.slice(0, index), moving, ...target.slice(index)],
      }
    })
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    snapshot.current = null
    if (over === null) return
    const sectionId = sectionOf(active.id)
    if (sectionId === undefined || sectionId !== sectionOf(over.id)) return
    setQuestions((current) => {
      const list = current[sectionId] ?? []
      const from = list.findIndex((question) => question.id === active.id)
      const to = list.findIndex((question) => question.id === over.id)
      if (from < 0 || to < 0 || from === to) return current
      return { ...current, [sectionId]: arrayMove([...list], from, to) }
    })
  }

  const handleDragCancel = () => {
    const saved = snapshot.current
    if (saved !== null) setQuestions(saved)
    setActiveId(null)
    snapshot.current = null
  }

  const activeQuestion = activeId === null ? undefined : questionOf(activeId)
  const dragging = activeId !== null

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={detectCollision}
      measuring={MEASURING}
      accessibility={{
        announcements,
        screenReaderInstructions: SCREEN_READER_INSTRUCTIONS,
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex w-full flex-col gap-10">
        {SECTIONS.map((section) => {
          const list = questions[section.id] ?? []
          const sectionEnabled = enabled[section.id] ?? true
          return (
            <FormSection
              key={section.id}
              variant={section.variant}
              title={section.title}
              optionalLabel={section.optionalLabel}
              enabled={sectionEnabled}
              onEnabledChange={(next) =>
                setEnabled((current) => ({ ...current, [section.id]: next }))
              }
            >
              <SortableContext
                id={section.id}
                items={list.map((question) => question.id)}
                strategy={verticalListSortingStrategy}
              >
                {list.length === 0 ? (
                  <EmptyDropZone
                    sectionId={section.id}
                    enabled={sectionEnabled}
                    dragging={dragging}
                  />
                ) : (
                  list.map((question) => (
                    <SortableQuestionCard
                      key={question.id}
                      question={question}
                      sectionTitle={section.title}
                      disabled={!sectionEnabled}
                      reducedMotion={reducedMotion}
                      onTitleChange={(title) =>
                        changeTitle(section.id, question.id, title)
                      }
                    />
                  ))
                )}
              </SortableContext>
            </FormSection>
          )
        })}
      </div>
      <DragOverlay
        className="cursor-grabbing"
        dropAnimation={reducedMotion ? null : undefined}
      >
        {activeQuestion === undefined ? null : (
          <DraggingQuestionPreview
            question={activeQuestion.question}
            startIndex={activeQuestion.index}
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
