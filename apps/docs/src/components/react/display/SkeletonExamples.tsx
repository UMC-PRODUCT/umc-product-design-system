import { Skeleton } from "@umc-product/react"

const NOTICE_BLOCKS = ["first", "second", "third"]
const NOTICE_LINES = ["line-1", "line-2", "line-3", "line-4"]

export function SkeletonDefault() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[400px]" data-spec-id="skeleton-line">
        <Skeleton />
      </div>
    </div>
  )
}

export function SkeletonSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <Skeleton width={200} height={18} />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  )
}

export function SkeletonLoadingList() {
  return (
    <div className="umc-example umc-example-stack">
      <section
        aria-busy="true"
        aria-label="공지 목록"
        className="flex w-full max-w-[600px] flex-col gap-8"
      >
        <span className="sr-only">공지를 불러오는 중입니다</span>
        {NOTICE_BLOCKS.map((block) => (
          <div key={block} className="flex flex-col gap-3">
            <Skeleton width={200} />
            {NOTICE_LINES.map((line) => (
              <Skeleton key={line} />
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}
