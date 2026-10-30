"use client"

import { Menu as BaseUIMenu } from "@base-ui/react"
import { type ReactNode, useId } from "react"

import { Divider } from "../../display/divider/Divider.tsx"
import { RoleTag, type RoleTagColor } from "../../display/role-tag/RoleTag.tsx"
import { cx } from "../../internal/cx.ts"
import { LegacyCheckGlyph } from "../../internal/glyphs.tsx"
import { HeaderProfile } from "./HeaderProfile.tsx"

export type HeaderProfileMenuRole = {
  label: ReactNode
  color: RoleTagColor
}

export type HeaderProfileMenuProfile = {
  nickname: ReactNode
  name: ReactNode
  school: ReactNode
  role?: HeaderProfileMenuRole
  imageSrc?: string
}

export type HeaderProfileMenuGeneration = {
  value: string
  label: ReactNode
  caption?: ReactNode
  disabled?: boolean
}

export type HeaderProfileMenuProps = {
  profile: HeaderProfileMenuProfile
  generations: HeaderProfileMenuGeneration[]
  generation?: string
  defaultGeneration?: string
  onGenerationChange?: (generation: string) => void
  generationLabel?: ReactNode
  onAccountSettings?: () => void
  onLogout?: () => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  triggerLabel?: string
  className?: string
}

const DEFAULT_GENERATION_LABEL = "기수 변경"
const DEFAULT_TRIGGER_LABEL = "프로필 메뉴"
const MENU_GAP_BELOW_AVATAR = 0
const MENU_OVERHANG_PAST_AVATAR_END = -4

export function HeaderProfileMenu({
  profile,
  generations,
  generation,
  defaultGeneration,
  onGenerationChange,
  generationLabel = DEFAULT_GENERATION_LABEL,
  onAccountSettings,
  onLogout,
  open,
  defaultOpen,
  onOpenChange,
  triggerLabel = DEFAULT_TRIGGER_LABEL,
  className,
}: HeaderProfileMenuProps) {
  const summaryId = useId()

  return (
    <BaseUIMenu.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <BaseUIMenu.Trigger
        className={cx("umc-header-profile-trigger", className)}
        aria-label={triggerLabel}
      >
        <HeaderProfile src={profile.imageSrc} />
      </BaseUIMenu.Trigger>
      <BaseUIMenu.Portal>
        <BaseUIMenu.Positioner
          className="umc-dropdown-list__positioner"
          side="bottom"
          align="end"
          sideOffset={MENU_GAP_BELOW_AVATAR}
          alignOffset={MENU_OVERHANG_PAST_AVATAR_END}
        >
          <BaseUIMenu.Popup
            className="umc-header-profile-menu"
            aria-describedby={summaryId}
          >
            <div className="umc-header-profile-menu__summary" id={summaryId}>
              <div className="umc-header-profile-menu__avatar">
                <HeaderProfile src={profile.imageSrc} />
              </div>
              <div className="umc-header-profile-menu__identity">
                <div className="umc-header-profile-menu__names">
                  <p className="umc-header-profile-menu__name-line">
                    <span>{profile.nickname}</span>
                    <span className="umc-header-profile-menu__name-divider">
                      /
                    </span>
                    <span>{profile.name}</span>
                  </p>
                  <p className="umc-header-profile-menu__school">
                    {profile.school}
                  </p>
                </div>
                {profile.role && (
                  <RoleTag color={profile.role.color} size="md">
                    {profile.role.label}
                  </RoleTag>
                )}
              </div>
            </div>
            <div className="umc-header-profile-menu__generations">
              <Divider />
              <BaseUIMenu.RadioGroup
                className="umc-header-profile-menu__generation-group"
                value={generation}
                defaultValue={defaultGeneration}
                onValueChange={(next: string) => onGenerationChange?.(next)}
              >
                <BaseUIMenu.GroupLabel className="umc-header-profile-menu__generation-label">
                  {generationLabel}
                </BaseUIMenu.GroupLabel>
                <div className="umc-header-profile-menu__generation-list">
                  {generations.map((item) => (
                    <BaseUIMenu.RadioItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                      closeOnClick
                      className="umc-dropdown-item"
                      data-size="xs"
                      data-layout="inline"
                    >
                      <span className="umc-dropdown-item__content">
                        <BaseUIMenu.RadioItemIndicator className="umc-dropdown-item__indicator">
                          <LegacyCheckGlyph />
                        </BaseUIMenu.RadioItemIndicator>
                        {item.label}
                      </span>
                      {item.caption && (
                        <span className="umc-dropdown-item__caption">
                          {item.caption}
                        </span>
                      )}
                    </BaseUIMenu.RadioItem>
                  ))}
                </div>
              </BaseUIMenu.RadioGroup>
            </div>
            <Divider />
            <div className="umc-header-profile-menu__actions">
              <BaseUIMenu.Item
                className="umc-header-profile-menu__action"
                onClick={onAccountSettings}
              >
                계정 설정
              </BaseUIMenu.Item>
              <BaseUIMenu.Item
                className="umc-header-profile-menu__action"
                data-tone="danger"
                onClick={onLogout}
              >
                로그아웃
              </BaseUIMenu.Item>
            </div>
          </BaseUIMenu.Popup>
        </BaseUIMenu.Positioner>
      </BaseUIMenu.Portal>
    </BaseUIMenu.Root>
  )
}
