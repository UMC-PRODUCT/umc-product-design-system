"use client"

import { Tooltip } from "@base-ui/react"
import {
  Fragment,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react"

import {
  ChartTooltipArrowGlyph,
  ChartTooltipBody,
  type ChartTooltipBodyProps,
  type ChartTooltipContent,
} from "./ChartTooltip.tsx"

export type ChartTooltipHandle = Tooltip.Handle<string>

const SIDE_OFFSET = 8
const OPEN_DELAY = 0

export function useChartTooltipHandle(): ChartTooltipHandle {
  const [handle] = useState(() => Tooltip.createHandle<string>())
  return handle
}

type ChartTooltipLayerProps = {
  handle: ChartTooltipHandle
  contentOf: (key: string) => ChartTooltipBodyProps | undefined
}

export function ChartTooltipLayer({
  handle,
  contentOf,
}: ChartTooltipLayerProps) {
  return (
    <Tooltip.Root handle={handle} disableHoverablePopup>
      {({ payload }) => {
        const content = payload === undefined ? undefined : contentOf(payload)
        if (content === undefined) return null
        return (
          <Tooltip.Portal>
            <Tooltip.Positioner
              side="bottom"
              sideOffset={SIDE_OFFSET}
              className="umc-chart-tooltip__positioner"
            >
              <Tooltip.Popup
                className="umc-chart-tooltip__popup"
                aria-hidden="true"
              >
                <Tooltip.Arrow className="umc-chart-tooltip__arrow">
                  <ChartTooltipArrowGlyph />
                </Tooltip.Arrow>
                <ChartTooltipBody {...content} />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        )
      }}
    </Tooltip.Root>
  )
}

type ChartTooltipTriggerProps = Omit<
  ComponentPropsWithRef<"button">,
  "type" | "id"
> & {
  handle: ChartTooltipHandle
  payload: string
  id: string
}

const POPUP_OPEN_ATTRIBUTE = "data-popup-open"

export function ChartTooltipTrigger({
  handle,
  payload,
  id,
  onPointerDown,
  onClick,
  ...props
}: ChartTooltipTriggerProps) {
  const pointerTypeRef = useRef("")

  return (
    <Tooltip.Trigger
      {...props}
      handle={handle}
      payload={payload}
      id={id}
      delay={OPEN_DELAY}
      closeOnClick={false}
      onPointerDown={(event) => {
        pointerTypeRef.current = event.pointerType
        onPointerDown?.(event)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (pointerTypeRef.current !== "touch") return
        const openedHere =
          event.currentTarget.hasAttribute(POPUP_OPEN_ATTRIBUTE)
        if (openedHere) {
          handle.close()
        } else {
          handle.open(id)
        }
      }}
    />
  )
}

const partsOf = ({
  summary,
  referenceSummary,
  items = [],
  caption,
}: ChartTooltipContent): { key: string; node: ReactNode }[] => [
  ...(summary === undefined && referenceSummary === undefined
    ? []
    : [
        {
          key: "summary",
          node: (
            <>
              {summary}
              {referenceSummary !== undefined && <> / {referenceSummary}</>}
            </>
          ),
        },
      ]),
  ...items.map((item) => ({
    key: `item-${item.key}`,
    node: (
      <>
        {item.label}: {item.value}
        {item.reference !== undefined && <> / {item.reference}</>}
      </>
    ),
  })),
  ...(caption === undefined ? [] : [{ key: "caption", node: caption }]),
]

type ChartTooltipDescriptionProps = {
  id: string
  content: ChartTooltipContent
  leading?: readonly ReactNode[]
}

export function ChartTooltipDescription({
  id,
  content,
  leading = [],
}: ChartTooltipDescriptionProps) {
  const parts = [
    ...leading.map((node, index) => ({ key: `leading-${index}`, node })),
    ...partsOf(content),
  ]
  return (
    <span id={id} className="umc-visually-hidden">
      {parts.map(({ key, node }, index) => (
        <Fragment key={key}>
          {index > 0 && ", "}
          {node}
        </Fragment>
      ))}
    </span>
  )
}
