import { createPictogram } from "../../create-pictogram.tsx"

export const GoalPictogram = createPictogram({
  name: "GoalPictogram",
  defaultMode: "light",
  modes: {
    light: {
      viewBox: "0 0 30 30",
      color: "var(--umc-color-icon-brand-strong-600)",
      content: <path d="M19.8212 10.1786V6.5625L23.4373 2.94643L24.6427 5.35714L27.0534 6.5625L23.4373 10.1786H19.8212ZM19.8212 10.1786L14.9998 14.9999M27.0534 15C27.0534 21.657 21.6569 27.0536 14.9999 27.0536C8.34286 27.0536 2.94629 21.657 2.94629 15C2.94629 8.343 8.34286 2.94643 14.9999 2.94643M21.0266 15C21.0266 18.3285 18.3284 21.0268 14.9999 21.0268C11.6714 21.0268 8.97308 18.3285 8.97308 15C8.97308 11.6715 11.6714 8.97321 14.9999 8.97321" stroke="currentColor" strokeWidth="2.67857" strokeLinecap="round" strokeLinejoin="round" />,
    },
  },
})
