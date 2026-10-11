import { dirname, relative } from "node:path"
import { fileURLToPath } from "node:url"

const SOURCE_DIR = fileURLToPath(new URL("../", import.meta.url))
const DOCS_CHROME_DIR = fileURLToPath(
  new URL("../components/react/frame/", import.meta.url),
)
const REGISTRY_FILE = fileURLToPath(
  new URL("./component-code.ts", import.meta.url),
)
const JSX_RUNTIMES = new Map([
  [
    "react/jsx-runtime",
    fileURLToPath(new URL("../jsx/jsx-runtime.ts", import.meta.url)),
  ],
  [
    "react/jsx-dev-runtime",
    fileURLToPath(new URL("../jsx/jsx-dev-runtime.ts", import.meta.url)),
  ],
])
const DOCUMENTED_PACKAGES = new Set([
  "@umc-product/react",
  "@umc-product/icons",
])
const JSX_MODULE = /\.[jt]sx$/

const pathOf = (id) => id.split("?")[0]

const isExampleModule = (id) => {
  const path = pathOf(id)
  return (
    JSX_MODULE.test(path) &&
    path.startsWith(SOURCE_DIR) &&
    !path.startsWith(DOCS_CHROME_DIR)
  )
}

const importedComponentsOf = (program) =>
  program.body
    .filter(
      (node) =>
        node.type === "ImportDeclaration" &&
        DOCUMENTED_PACKAGES.has(node.source.value),
    )
    .flatMap((node) => node.specifiers)
    .flatMap((specifier) => {
      if (specifier.type === "ImportNamespaceSpecifier") {
        return [`...${specifier.local.name}`]
      }
      if (specifier.type !== "ImportSpecifier") return []
      const importedName = specifier.imported.name ?? specifier.imported.value
      return [`${JSON.stringify(importedName)}: ${specifier.local.name}`]
    })

const registryImportOf = (id) => {
  const path = relative(dirname(pathOf(id)), REGISTRY_FILE)
  return path.startsWith(".") ? path : `./${path}`
}

export const componentCodePlugins = () => [
  {
    name: "docs-component-code:jsx-runtime",
    enforce: "pre",
    resolveId(source, importer) {
      const runtime = JSX_RUNTIMES.get(source)
      if (!runtime || !importer || !isExampleModule(importer)) return null
      return runtime
    },
  },
  {
    name: "docs-component-code:registry",
    enforce: "post",
    transform(code, id) {
      if (!isExampleModule(id)) return null
      const components = importedComponentsOf(this.parse(code))
      if (components.length === 0) return null
      const registry = JSON.stringify(registryImportOf(id))
      return {
        code: `import { registerComponents as __registerDocsComponents } from ${registry};__registerDocsComponents({ ${components.join(", ")} });${code}`,
        map: null,
      }
    },
  },
]
