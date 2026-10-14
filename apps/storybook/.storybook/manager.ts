import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "UMC Design System",
    colorPrimary: "#008a80",
    colorSecondary: "#008a80",
  }),
})
