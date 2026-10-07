import { readFileSync } from "node:fs"

import { z } from "zod"

import { paths } from "./paths.ts"

const manifestSchema = z.object({
  fileKey: z.string(),
  sources: z.array(
    z.object({
      file: z.string(),
      tool: z.string(),
      nodeId: z.string().optional(),
      nodeName: z.string().optional(),
      originalName: z.string().optional(),
      fetchedAt: z.string(),
      sha256: z.string().regex(/^[0-9a-f]{64}$/),
    }),
  ),
})

export type Manifest = z.infer<typeof manifestSchema>

export type ManifestSource = Manifest["sources"][number]

export const readManifest = (): Manifest =>
  manifestSchema.parse(JSON.parse(readFileSync(paths.figmaManifest, "utf8")))
