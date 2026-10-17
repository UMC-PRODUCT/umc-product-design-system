import { Divider, TextButton } from "@umc-product/react"
import { Fragment } from "react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const NOTICES = [
  "11기 OT 일정을 안내드려요",
  "지원서 제출 마감이 다가와요",
  "면접 장소가 바뀌었어요",
]

const SCHOOLS = ["가람대학교", "나래대학교", "다온대학교"]

export function DividerLine() {
  return (
    <div className="umc-example">
      <ul className="m-0 flex w-full max-w-[374px] list-none flex-col p-0">
        {NOTICES.map((notice, index) => (
          <Fragment key={notice}>
            {index > 0 && (
              <li aria-hidden="true">
                <Divider data-spec-id="divider-line" />
              </li>
            )}
            <li className="py-3 text-body-1-medium text-neutral-default-900">
              {notice}
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export function DividerSolid() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[390px] flex-col gap-4">
        <section className="flex flex-col gap-1 px-4">
          <p className="m-0 text-label-1-semibold text-neutral-default-900">
            내 지원 현황
          </p>
          <p className="m-0 text-body-2-regular text-neutral-medium-600">
            제출한 지원서 2개
          </p>
        </section>
        <Divider variant="solid" data-spec-id="divider-solid" />
        <section className="flex flex-col gap-1 px-4">
          <p className="m-0 text-label-1-semibold text-neutral-default-900">
            모집 중인 프로젝트
          </p>
          <p className="m-0 text-body-2-regular text-neutral-medium-600">
            지금 지원할 수 있는 프로젝트 5개
          </p>
        </section>
      </div>
    </div>
  )
}

export function DividerVertical() {
  return (
    <div className="umc-example">
      <div className="flex items-center gap-4">
        <span className="text-label-3-medium text-brand-default-600">
          선택 3
        </span>
        <Divider orientation="vertical" data-spec-id="divider-vertical" />
        <div className="flex flex-wrap gap-4">
          {SCHOOLS.map((school) => (
            <TextButton key={school} color="neutral">
              {school}
            </TextButton>
          ))}
        </div>
      </div>
    </div>
  )
}

const DIVIDER_VARIANTS = { Line: "line", Solid: "solid" } as const

export function DividerAllVariants() {
  return (
    <VariantGrid
      set="divider"
      rows={["Type"]}
      columns={[]}
      order={{ Type: ["Line", "Solid"] }}
      render={(variant: FigmaVariant) => (
        <div className="w-[374px]">
          <Divider variant={lookup(DIVIDER_VARIANTS, variant, "Type")} />
        </div>
      )}
    />
  )
}
