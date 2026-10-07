import { createIcon } from "../../create-icon.tsx"

export const ChevronRightIcon = createIcon({
  name: "ChevronRightIcon",
  defaultWeight: "regular",
  weights: {
    thin: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M3.89844 3.5L11.9984 12L3.89844 20.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
    regular: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M3.89844 3.5L11.9984 12L3.89844 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
    fill: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M3.89844 3.5L11.9984 12L3.89844 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
  },
})
