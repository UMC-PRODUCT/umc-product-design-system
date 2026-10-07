"use client"

import { Menu } from "@umc-product/react"

const defaultItems = [
  { label: "수정", onClick: () => {} },
  { label: "복사", onClick: () => {} },
  { label: "삭제", tone: "danger" as const, onClick: () => {} },
]

export function MenuDefault() {
  return (
    <Menu
      trigger={<button className="umc-menu__trigger">메뉴 열기</button>}
      items={defaultItems}
    />
  )
}

export function MenuWithDisabled() {
  return (
    <Menu
      trigger={<button>옵션</button>}
      items={[
        { label: "프로필 보기" },
        { label: "설정" },
        { label: "비활성 항목", disabled: true },
        { label: "로그아웃", tone: "danger" as const },
      ]}
    />
  )
}

export function MenuDangerItem() {
  return (
    <div>
      <span
        className="umc-menu__item"
        data-tone="danger"
        data-spec-id="menu-item-danger"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0 16px",
          height: "44px",
        }}
      >
        <span className="umc-menu__item-label">삭제하기</span>
      </span>
    </div>
  )
}

export function MenuPopupExample() {
  return (
    <div
      className="umc-menu__popup"
      data-spec-id="menu-popup-default"
      style={{ position: "relative", display: "inline-block" }}
    >
      <div className="umc-menu__item">수정</div>
      <div className="umc-menu__item">복사</div>
      <div className="umc-menu__item" data-tone="danger">
        삭제
      </div>
    </div>
  )
}
