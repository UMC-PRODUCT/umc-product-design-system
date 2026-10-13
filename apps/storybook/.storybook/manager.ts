import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "UMC Design System",
    brandUrl: "https://umc-product.github.io/umc-product-design-system/",
    brandTarget: "_self",
    colorPrimary: "#008a80",
    colorSecondary: "#008a80",
  }),
})
