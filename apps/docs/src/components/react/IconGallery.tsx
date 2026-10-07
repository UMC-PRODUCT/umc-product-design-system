import {
  iconCatalog,
  pictogramCatalog,
  type IconProps,
  type IconWeight,
  type PictogramMode,
  type PictogramProps,
} from "@umc-product/icons"
import { useDeferredValue, useState, type ReactElement } from "react"

type IconEntry = (typeof iconCatalog)[number]
type PictogramEntry = (typeof pictogramCatalog)[number]
type WeightFilter = "all" | IconWeight

const WEIGHT_FILTERS: readonly { value: WeightFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "thin", label: "thin" },
  { value: "regular", label: "regular" },
  { value: "fill", label: "fill" },
]

const weightsOf = (entry: IconEntry): readonly IconWeight[] => entry.weights

const modesOf = (entry: PictogramEntry): readonly PictogramMode[] => entry.modes

const iconComponentOf = (entry: IconEntry) =>
  entry.component as (props: IconProps) => ReactElement

const pictogramComponentOf = (entry: PictogramEntry) =>
  entry.component as (props: PictogramProps<PictogramMode>) => ReactElement

const matchesQuery = (
  entry: { name: string; figmaName: string },
  query: string,
): boolean => {
  const normalized = query.trim().toLowerCase()
  return (
    normalized === "" ||
    entry.name.toLowerCase().includes(normalized) ||
    entry.figmaName.toLowerCase().includes(normalized)
  )
}

const previewWeights = (
  entry: IconEntry,
  filter: WeightFilter,
): readonly IconWeight[] => (filter === "all" ? weightsOf(entry) : [filter])

function IconUsage({
  entry,
  filter,
}: {
  entry: IconEntry
  filter: WeightFilter
}) {
  const weight =
    filter !== "all" && weightsOf(entry).includes(filter)
      ? filter
      : entry.defaultWeight
  const weightProp = weight === entry.defaultWeight ? "" : ` weight="${weight}"`
  return (
    <div className="umc-icon-usage">
      <p>
        <code>{entry.figmaName}</code> · 굵기 {weightsOf(entry).join(", ")} ·
        기본 {entry.defaultWeight}
      </p>
      <pre>
        <code>
          {`import { ${entry.name} } from "@umc-product/icons"\n\n<${entry.name}${weightProp} />`}
        </code>
      </pre>
    </div>
  )
}

export function IconGallery() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<WeightFilter>("all")
  const [selectedName, setSelectedName] = useState<string>()
  const deferredQuery = useDeferredValue(query)

  const visible = iconCatalog.filter(
    (entry) =>
      matchesQuery(entry, deferredQuery) &&
      (filter === "all" || weightsOf(entry).includes(filter)),
  )
  const selected = iconCatalog.find((entry) => entry.name === selectedName)

  return (
    <div className="umc-icon-gallery not-content">
      <div className="umc-icon-toolbar">
        <input
          type="search"
          className="umc-icon-search"
          placeholder="이름으로 찾기 (예: chevron, Icon/Add)"
          aria-label="아이콘 이름으로 찾기"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <fieldset className="umc-icon-weights">
          <legend className="umc-visually-hidden">굵기</legend>
          {WEIGHT_FILTERS.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="umc-icon-weight"
                value={option.value}
                checked={filter === option.value}
                onChange={() => setFilter(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
        <p className="umc-icon-count" aria-live="polite">
          {iconCatalog.length}개 중 {visible.length}개
        </p>
      </div>
      {selected ? <IconUsage entry={selected} filter={filter} /> : null}
      <ul className="umc-icon-grid">
        {visible.map((entry) => {
          const Icon = iconComponentOf(entry)
          return (
            <li key={entry.name}>
              <button
                type="button"
                className="umc-icon-card"
                aria-pressed={entry.name === selectedName}
                onClick={() =>
                  setSelectedName((current) =>
                    current === entry.name ? undefined : entry.name,
                  )
                }
              >
                <span className="umc-icon-previews">
                  {previewWeights(entry, filter).map((weight) => (
                    <Icon key={weight} weight={weight} />
                  ))}
                </span>
                <span className="umc-icon-name">{entry.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
      {visible.length === 0 ? (
        <p className="umc-icon-empty">찾는 이름의 아이콘이 없습니다.</p>
      ) : null}
    </div>
  )
}

export function PictogramGallery() {
  return (
    <ul className="umc-icon-grid umc-pictogram-grid not-content">
      {pictogramCatalog.map((entry) => {
        const Pictogram = pictogramComponentOf(entry)
        const modes = modesOf(entry)
        const hasModeChoice = modes.length > 1
        return (
          <li key={entry.name} className="umc-icon-card umc-pictogram-card">
            <span className="umc-icon-previews">
              {modes.map((mode) => (
                <span key={mode} className="umc-pictogram-mode">
                  <Pictogram mode={mode} />
                  {hasModeChoice ? <span>{mode}</span> : null}
                </span>
              ))}
            </span>
            <span className="umc-icon-name">{entry.name}</span>
          </li>
        )
      })}
    </ul>
  )
}
