"use client"

import { Button, Menu, Select, type SelectProps } from "@umc-product/react"
import { useState } from "react"

import { LegacyCheckGlyph } from "../../../../../../packages/react/src/internal/glyphs.tsx"
import {
  CODE_PLACEHOLDER,
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function MenuDefault() {
  const [lastAction, setLastAction] = useState("없음")
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="menu-list menu-item">
        <Menu
          trigger={
            <Button variant="weak" color="neutral" size="sm">
              관리
            </Button>
          }
          items={[
            { label: "수정", onClick: () => setLastAction("수정") },
            { label: "복제", onClick: () => setLastAction("복제") },
            { label: "삭제", onClick: () => setLastAction("삭제") },
            { label: "보관(준비 중)", disabled: true },
          ]}
        />
      </div>
      <p className="m-0 text-sm">마지막으로 고른 항목: {lastAction}</p>
    </div>
  )
}

export function MenuWithTitle() {
  return (
    <div className="umc-example" data-spec-id="menu-title">
      <Menu
        title="정렬 기준"
        trigger={
          <Button variant="weak" color="neutral" size="sm">
            정렬
          </Button>
        }
        items={[
          { label: "최신 순" },
          { label: "등록 순" },
          { label: "정렬 순" },
        ]}
      />
    </div>
  )
}

export function MenuSizes() {
  return (
    <div className="umc-example">
      {(["xs", "sm", "md"] as const).map((size) => (
        <Menu
          key={size}
          size={size}
          trigger={
            <Button variant="weak" color="neutral" size="sm">
              {size}
            </Button>
          }
          items={[
            { label: "최신 순" },
            { label: "등록 순" },
            { label: "정렬 순" },
          ]}
        />
      ))}
    </div>
  )
}

export function MenuInline() {
  return (
    <div
      className="umc-example"
      data-spec-id="menu-item-inline menu-item-inline-caption"
    >
      <Menu
        size="xs"
        layout="inline"
        trigger={
          <Button variant="weak" color="neutral" size="sm">
            내보내기
          </Button>
        }
        items={[
          { label: "CSV", caption: ".csv" },
          { label: "엑셀", caption: ".xlsx" },
          { label: "PDF(준비 중)", caption: ".pdf", disabled: true },
        ]}
      />
    </div>
  )
}

const ITEM_SIZES = { Xs: "xs", Sm: "sm", Md: "md" } as const
const ITEM_LAYOUTS = { Default: "default", Inline: "inline" } as const
const LIST_SIZES = { Sm: "sm", Md: "md" } as const

type ItemSize = (typeof ITEM_SIZES)[keyof typeof ITEM_SIZES]

const ITEM_LABEL = "항목"
const ITEM_CAPTION = "캡션"
const ITEM_VALUE = "item"
const LIST_TITLE = "타이틀"
const LIST_ITEMS = [{ label: "메뉴" }, { label: "메뉴" }, { label: "메뉴" }]

const presence = (condition: boolean) => (condition ? "" : undefined)

function MenuListPreview({ variant }: { variant: FigmaVariant }) {
  const size = lookup(LIST_SIZES, variant, "Size")
  const code = componentCodeOf(Menu, {
    size,
    title: LIST_TITLE,
    trigger: CODE_PLACEHOLDER,
    items: LIST_ITEMS,
  })
  return (
    <div
      className="umc-dropdown-list umc-menu"
      data-size={size}
      {...codeAttributeOf(code)}
    >
      <div className="umc-menu__title">{LIST_TITLE}</div>
      {LIST_ITEMS.map((item, index) => (
        <div key={index} className="umc-dropdown-item" data-size={size}>
          {item.label}
        </div>
      ))}
    </div>
  )
}

export function MenuListAllVariants() {
  return (
    <VariantGrid
      set="meue-list"
      rows={[]}
      columns={["Size"]}
      order={{ Size: ["Sm", "Md"] }}
      render={(variant) => <MenuListPreview variant={variant} />}
    />
  )
}

const disabledFlag = (disabled: boolean) => (disabled ? true : undefined)

const menuItemCodeOf = (size: ItemSize, disabled: boolean) =>
  componentCodeOf(Menu, {
    size,
    trigger: CODE_PLACEHOLDER,
    items: [{ label: ITEM_LABEL, disabled: disabledFlag(disabled) }],
  })

const selectedItemCodeOf = (size: ItemSize) =>
  componentCodeOf(Select, {
    itemSize: size,
    options: [{ value: ITEM_VALUE, label: ITEM_LABEL }],
    value: ITEM_VALUE,
  })

const inlineMenuItemCodeOf = (disabled: boolean) =>
  componentCodeOf(Menu, {
    size: "xs",
    layout: "inline",
    trigger: CODE_PLACEHOLDER,
    items: [
      {
        label: ITEM_LABEL,
        caption: ITEM_CAPTION,
        disabled: disabledFlag(disabled),
      },
    ],
  })

const inlineSelectedItemCodeOf = () =>
  componentCodeOf<SelectProps>(Select, {
    itemSize: "xs",
    itemLayout: "inline",
    options: [{ value: ITEM_VALUE, label: ITEM_LABEL, caption: ITEM_CAPTION }],
    value: ITEM_VALUE,
  })

type ItemPreviewProps = {
  size: ItemSize
  state: string | undefined
}

const itemStateAttributes = (state: string | undefined) => ({
  "data-highlighted": presence(state === "Hover"),
  "data-selected": presence(state === "Selected"),
  "data-disabled": presence(state === "Disabled"),
})

function DefaultDropdownItemPreview({ size, state }: ItemPreviewProps) {
  const code =
    state === "Selected"
      ? selectedItemCodeOf(size)
      : menuItemCodeOf(size, state === "Disabled")
  return (
    <div className="umc-dropdown-list w-[160px]" {...codeAttributeOf(code)}>
      <div
        className="umc-dropdown-item"
        data-size={size}
        data-layout="default"
        {...itemStateAttributes(state)}
      >
        <span className="umc-dropdown-item__content">{ITEM_LABEL}</span>
        {state === "Selected" && (
          <span className="umc-dropdown-item__indicator">
            <LegacyCheckGlyph />
          </span>
        )}
      </div>
    </div>
  )
}

function InlineDropdownItemPreview({ size, state }: ItemPreviewProps) {
  const code =
    state === "Selected"
      ? inlineSelectedItemCodeOf()
      : inlineMenuItemCodeOf(state === "Disabled")
  return (
    <div className="umc-dropdown-list w-[160px]" {...codeAttributeOf(code)}>
      <div
        className="umc-dropdown-item"
        data-size={size}
        data-layout="inline"
        {...itemStateAttributes(state)}
      >
        <span className="umc-dropdown-item__content">
          {state === "Selected" && (
            <span className="umc-dropdown-item__indicator">
              <LegacyCheckGlyph />
            </span>
          )}
          {ITEM_LABEL}
        </span>
        <span className="umc-dropdown-item__caption">{ITEM_CAPTION}</span>
      </div>
    </div>
  )
}

function DropdownItemPreview({ variant }: { variant: FigmaVariant }) {
  const props: ItemPreviewProps = {
    size: lookup(ITEM_SIZES, variant, "Size"),
    state: variant.props["State"],
  }
  return lookup(ITEM_LAYOUTS, variant, "Layout") === "inline" ? (
    <InlineDropdownItemPreview {...props} />
  ) : (
    <DefaultDropdownItemPreview {...props} />
  )
}

export function DropdownItemAllVariants() {
  return (
    <VariantGrid
      set="dropdown-item"
      sections={["Layout"]}
      rows={["State"]}
      columns={["Size"]}
      order={{
        Layout: ["Default", "Inline"],
        State: ["Default", "Hover", "Selected", "Disabled"],
        Size: ["Xs", "Sm", "Md"],
      }}
      render={(variant) => <DropdownItemPreview variant={variant} />}
    />
  )
}
