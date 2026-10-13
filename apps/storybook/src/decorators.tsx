import type { Decorator } from "@storybook/react-vite"

export const withWidth =
  (width: number): Decorator =>
  (Story) => (
    <div style={{ width }}>
      <Story />
    </div>
  )
