import type { ColorTokenRow } from "./color-tokens.ts"

type ColorTokenTableProps = {
  rows: readonly ColorTokenRow[]
}

function TailwindName({ row }: { row: ColorTokenRow }) {
  if (row.utility !== null) {
    return (
      <div className="umc-token-class">
        <span className="umc-sub">Tailwind</span> <code>{row.utility}</code>
      </div>
    )
  }
  return (
    <div className="umc-token-class">
      <span className="umc-sub">Tailwind</span> <code>{row.tailwindName}</code>{" "}
      <span className="umc-sub">앞에 bg-, text-, border-</span>
    </div>
  )
}

export function ColorTokenTable({ rows }: ColorTokenTableProps) {
  return (
    <div className="not-content umc-scroll">
      <table className="umc-table">
        <thead>
          <tr>
            <th>색</th>
            <th>피그마 변수와 코드 이름</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.cssVariable}>
              <td>
                <span
                  className="umc-swatch"
                  style={{ background: `var(${row.cssVariable})` }}
                />
              </td>
              <td>
                <code>{row.figmaName}</code>
                <TailwindName row={row} />
                <div className="umc-sub">
                  CSS <code>{row.cssVariable}</code>
                </div>
                {row.codeSyntax === null ? null : (
                  <div className="umc-sub">
                    Dev Mode <code>{row.codeSyntax}</code>
                  </div>
                )}
              </td>
              <td>
                <code>{row.value}</code>
                {row.reference === null ? null : (
                  <div className="umc-sub">
                    참조 <code>{row.reference}</code>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
