import { dirname, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

const toPosixPath = (path) => path.split(sep).join("/")

const pathOfUrl = (url) =>
  toPosixPath(fileURLToPath(new URL(url, import.meta.url)))

const SOURCE_DIR = pathOfUrl("../")
const DOCS_CHROME_DIR = pathOfUrl("../components/react/frame/")
const REGISTRY_FILE = pathOfUrl("./component-code.ts")
const JSX_RUNTIMES = new Map([
  ["react/jsx-runtime", pathOfUrl("../jsx/jsx-runtime.ts")],
  ["react/jsx-dev-runtime", pathOfUrl("../jsx/jsx-dev-runtime.ts")],
])
const DOCUMENTED_PACKAGES = new Set([
  "@umc-product/react",
  "@umc-product/icons",
])
const JSX_MODULE = /\.[jt]sx$/
const JSX_MODULE_ID = /\.[jt]sx(?:\?|$)/

const pathOf = (id) => id.split("?")[0]

const isExampleModule = (id) => {
  const path = pathOf(id)
  return (
    JSX_MODULE.test(path) &&
    path.startsWith(SOURCE_DIR) &&
    !path.startsWith(DOCS_CHROME_DIR)
  )
}

const importDeclarationsOf = (program) =>
  program.body.filter((node) => node.type === "ImportDeclaration")

const importedComponentsOf = (imports) =>
  imports
    .filter((node) => DOCUMENTED_PACKAGES.has(node.source.value))
    .flatMap((node) => node.specifiers)
    .flatMap((specifier) => {
      if (specifier.type === "ImportNamespaceSpecifier") {
        return [`...${specifier.local.name}`]
      }
      if (specifier.type !== "ImportSpecifier") return []
      const importedName = specifier.imported.name ?? specifier.imported.value
      return [`${JSON.stringify(importedName)}: ${specifier.local.name}`]
    })

const relativeImportOf = (id, file) => {
  const path = toPosixPath(relative(dirname(pathOf(id)), file))
  return JSON.stringify(path.startsWith(".") ? path : `./${path}`)
}

const withDocsJsxRuntime = (code, id, imports) =>
  imports
    .filter((node) => JSX_RUNTIMES.has(node.source.value))
    .reduceRight(
      (result, node) =>
        `${result.slice(0, node.source.start)}${relativeImportOf(id, JSX_RUNTIMES.get(node.source.value))}${result.slice(node.source.end)}`,
      code,
    )

const registrationOf = (id, components) =>
  components.length === 0
    ? ""
    : `import { registerComponents as __registerDocsComponents } from ${relativeImportOf(id, REGISTRY_FILE)};__registerDocsComponents({ ${components.join(", ")} });`

export const componentCodePlugin = () => ({
  name: "docs-component-code",
  enforce: "post",
  transform: {
    filter: { id: JSX_MODULE_ID },
    handler(code, id) {
      if (!isExampleModule(id)) return null
      const imports = importDeclarationsOf(this.parse(code))
      const rewritten = withDocsJsxRuntime(code, id, imports)
      const registration = registrationOf(id, importedComponentsOf(imports))
      if (rewritten === code && registration === "") return null
      return { code: `${registration}${rewritten}`, map: null }
    },
  },
})
