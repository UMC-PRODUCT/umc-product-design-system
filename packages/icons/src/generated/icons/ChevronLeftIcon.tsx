import { createIcon } from "../../create-icon.tsx"

export const ChevronLeftIcon = createIcon({
  name: "ChevronLeftIcon",
  defaultWeight: "regular",
  weights: {
    thin: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M12.1016 3.5L4.00156 12L12.1016 20.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
    regular: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M12.1016 3.5L4.00156 12L12.1016 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
    fill: {
      viewBox: "0 0 24 24",
      content: <g transform="translate(4 0)"><path d="M12.1016 3.5L4.00156 12L12.1016 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>,
    },
  },
})
