import { createPictogram } from "../../create-pictogram.tsx"

export const UnderConstructionPictogram = createPictogram({
  name: "UnderConstructionPictogram",
  defaultMode: "light",
  modes: {
    light: {
      viewBox: "0 0 30 30",
      color: "var(--umc-color-icon-brand-strong)",
      content: <g transform="translate(0.6006 0.8994)"><path d="M13.4437 2.06889L3.99414 24.1621H24.6631L15.2135 2.06889C14.8805 1.29028 13.7768 1.29028 13.4437 2.06889Z" style={{ fill: "var(--umc-color-teal-100)" }} /><rect y="24.1406" width="28.8" height="2.85939" rx="1.42969" fill="currentColor" /><path d="M24.6631 24.1636H3.99414L5.35254 20.9868H23.3047L24.6631 24.1636ZM21.3604 16.4409H7.29688L9.4541 11.397H19.2031L21.3604 16.4409ZM13.4434 2.0708C13.7764 1.29219 14.8808 1.29219 15.2139 2.0708L17.2588 6.85107H11.3984L13.4434 2.0708Z" fill="currentColor" /></g>,
    },
    dark: {
      viewBox: "0 0 30 30",
      color: "var(--umc-color-icon-brand-medium)",
      content: <g transform="translate(0.6006 0.8994)"><path d="M13.4437 2.06889L3.99414 24.1621H24.6631L15.2135 2.06889C14.8805 1.29028 13.7768 1.29028 13.4437 2.06889Z" fill="#b3e6e1" /><rect y="24.1406" width="28.8" height="2.85939" rx="1.42969" fill="currentColor" /><path d="M24.6631 24.1636H3.99414L5.35254 20.9868H23.3047L24.6631 24.1636ZM21.3604 16.4409H7.29688L9.4541 11.397H19.2031L21.3604 16.4409ZM13.4434 2.0708C13.7764 1.29219 14.8808 1.29219 15.2139 2.0708L17.2588 6.85107H11.3984L13.4434 2.0708Z" fill="currentColor" /></g>,
    },
  },
})
