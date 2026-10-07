import { join } from "node:path"

import type { Outputs } from "../shared/files.ts"
import { paths } from "../shared/paths.ts"
import type { ModelEntry } from "./model.ts"
import { renderBaseCss } from "./render-base-css.ts"
import { renderIndex } from "./render-index.ts"
import { renderManifest } from "./render-manifest.ts"
import { renderTailwindCss } from "./render-tailwind-css.ts"
import { renderVanillaExtract } from "./render-vanilla-extract.ts"

const FONTS_CSS =
  '@import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";\n'

export const renderAll = (entries: readonly ModelEntry[]): Outputs =>
  new Map([
    [join(paths.generatedDir, "base.css"), renderBaseCss(entries)],
    [join(paths.generatedDir, "tailwind.css"), renderTailwindCss(entries)],
    [
      join(paths.generatedDir, "vanilla-extract.ts"),
      renderVanillaExtract(entries),
    ],
    [join(paths.generatedDir, "index.ts"), renderIndex(entries)],
    [join(paths.generatedDir, "manifest.ts"), renderManifest(entries)],
    [join(paths.generatedDir, "fonts.css"), FONTS_CSS],
  ])
