import { UmcLogoLockup } from "@umc-product/react"

const LOCKUP_COLOR = { color: "var(--umc-color-icon-neutral-stronger-700)" }

export function UmcLogoLockupPreview() {
  return (
    <div
      className="umc-example umc-example-row"
      style={{ ...LOCKUP_COLOR, flexWrap: "wrap", gap: "32px" }}
    >
      <span data-spec-id="lockup-main-logo">
        <UmcLogoLockup />
      </span>
      <span data-spec-id="lockup-operation lockup-operation-logo lockup-operation-title lockup-operation-subtitle">
        <UmcLogoLockup context="operation" generation={11} />
      </span>
      <UmcLogoLockup context="study" generation={11} />
      <UmcLogoLockup context="product-tech" />
    </div>
  )
}

export function UmcLogoLockupColors() {
  return (
    <div
      className="umc-example umc-example-row"
      style={{ flexWrap: "wrap", gap: "32px" }}
    >
      <span style={LOCKUP_COLOR}>
        <UmcLogoLockup context="product-tech" />
      </span>
      <span style={{ color: "var(--umc-color-icon-brand-strong-600)" }}>
        <UmcLogoLockup context="product-tech" />
      </span>
      <span
        style={{
          color: "var(--umc-color-teal-50)",
          background: "var(--umc-color-teal-grey-900)",
          padding: "12px 16px",
          borderRadius: "8px",
        }}
      >
        <UmcLogoLockup context="product-tech" />
      </span>
    </div>
  )
}
