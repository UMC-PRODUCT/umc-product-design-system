import { useDeferredValue, useMemo, useState } from "react"

import { ColorTokenTable } from "./ColorTokenTable.tsx"
import {
  countCodeSyntax,
  searchColorTokens,
  type ColorSearchResult,
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

function SearchNotice({ result }: { result: ColorSearchResult }) {
  if (result.sharedCodeSyntax !== null) {
    return (
      <p className="umc-color-notice">
        Dev Mode 이름 <code>{result.sharedCodeSyntax}</code>는 변수{" "}
        {result.rows.length}개가 함께 씁니다. 디자인에서 고른 레이어의 변수
        이름으로 다시 찾으세요.
      </p>
    )
  }
  if (result.sharedValue !== null) {
    return (
      <p className="umc-color-notice">
        값이 <code>{result.sharedValue}</code>인 토큰이 {result.rows.length}
        개입니다. 피그마 변수 이름으로 고르세요.
      </p>
    )
  }
  return null
}

export function ColorLookup({ rows }: { rows: readonly ColorTokenRow[] }) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const codeSyntaxCounts = useMemo(() => countCodeSyntax(rows), [rows])
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
        aria-label="피그마 변수 이름, Dev Mode 이름, 값, 클래스로 색 찾기"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className="umc-color-count" aria-live="polite">
        {statusOf(deferredQuery, result.rows.length)}
      </p>
      <SearchNotice result={result} />
      {result.rows.length > 0 ? (
        <ColorTokenTable
          rows={result.rows.slice(0, RESULT_LIMIT)}
          codeSyntaxCounts={codeSyntaxCounts}
        />
      ) : null}
    </div>
  )
}
