import { useDeferredValue, useMemo, useState } from "react"

import { ColorTokenTable } from "./ColorTokenTable.tsx"
import {
  searchColorTokens,
  type ColorSearchNotice,
  type ColorTokenRow,
} from "./color-tokens.ts"

const RESULT_LIMIT = 20

const statusOf = (query: string, total: number): string => {
  if (query.trim() === "") {
    return ""
  }
  if (total === 0) {
    return "찾는 색이 없습니다. 피그마 변수 이름으로 다시 찾아 보세요."
  }
  return total > RESULT_LIMIT
    ? `${total}개 중 ${RESULT_LIMIT}개를 보여 줍니다.`
    : `${total}개`
}

function SearchNotice({ notice }: { notice: ColorSearchNotice }) {
  switch (notice.kind) {
    case "shared-code-syntax":
      return (
        <p className="umc-color-notice">
          변수 {notice.count}개가 같은 Dev Mode 이름(
          <code>{notice.codeSyntax}</code>)을 씁니다. 디자인에서 고른 레이어의
          변수 이름으로 다시 찾으세요.
        </p>
      )
    case "narrowed-by-value":
      return (
        <p className="umc-color-notice">
          변수 {notice.count}개가 같은 Dev Mode 이름(
          <code>{notice.codeSyntax}</code>)을 씁니다. 함께 붙여 넣은 값으로
          좁혀, 값이 <code>{notice.value}</code>인 토큰만 보여 줍니다.
        </p>
      )
    case "shared-value":
      return (
        <p className="umc-color-notice">
          값이 <code>{notice.value}</code>인 토큰이 {notice.count}개입니다.
          피그마 변수 이름으로 고르세요.
        </p>
      )
    case "opacity-unsupported":
      return (
        <p className="umc-color-notice">
          Text와 Border 색 클래스에는 불투명도(<code>/50</code>)를 붙일 수
          없습니다. <code>{`${notice.prefix}-(${notice.cssVariable})/50`}</code>
          처럼 CSS 변수로 쓰세요.
        </p>
      )
  }
}

export function ColorLookup({ rows }: { rows: readonly ColorTokenRow[] }) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const result = useMemo(
    () => searchColorTokens(rows, deferredQuery),
    [rows, deferredQuery],
  )

  return (
    <div className="umc-color-lookup not-content">
      <input
        type="search"
        className="umc-color-search"
        placeholder="Fill/Neutral/Weak-75, var(--color-text-subtle), #F7F8F8, bg-surface-default"
        aria-label="피그마 변수 이름, Dev Mode 이름, 색 값, 클래스로 색 찾기"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className="umc-color-count" aria-live="polite">
        {statusOf(deferredQuery, result.rows.length)}
      </p>
      {result.notice === null ? null : <SearchNotice notice={result.notice} />}
      {result.rows.length > 0 ? (
        <ColorTokenTable rows={result.rows.slice(0, RESULT_LIMIT)} />
      ) : null}
    </div>
  )
}
