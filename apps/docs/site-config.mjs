const PAGES_SITE_URL = "https://umc-product.github.io"
const PAGES_BASE_PATH = "/umc-product-design-system"

const withoutTrailingSlash = (path) => path.replace(/\/+$/, "")

export const SITE_URL = withoutTrailingSlash(
  process.env.DOCS_SITE_URL || PAGES_SITE_URL,
)

export const BASE_PATH = withoutTrailingSlash(
  process.env.DOCS_BASE_PATH ?? PAGES_BASE_PATH,
)

export const STORYBOOK_URL = process.env.PUBLIC_STORYBOOK_URL || undefined
