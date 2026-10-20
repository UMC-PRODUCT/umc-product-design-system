import { DateNavigator } from "@umc-product/react"
import { useState } from "react"

import { dateLabelOf, dayAt } from "./chart-sample-data.ts"

export function DateNavigatorDefault() {
  const [offset, setOffset] = useState(0)

  return (
    <div className="umc-example">
      <DateNavigator
        aria-label="날짜"
        onPrevious={() => setOffset((current) => current - 1)}
        onNext={
          offset < 0 ? () => setOffset((current) => current + 1) : undefined
        }
        data-spec-id="date-navigator"
      >
        {dateLabelOf(dayAt(offset))}
      </DateNavigator>
    </div>
  )
}

const FIRST_WEEK = 1
const LAST_WEEK = 5

export function DateNavigatorWeek() {
  const [week, setWeek] = useState(3)

  return (
    <div className="umc-example">
      <DateNavigator
        aria-label="주"
        previousLabel="이전 주"
        nextLabel="다음 주"
        onPrevious={
          week > FIRST_WEEK
            ? () => setWeek((current) => current - 1)
            : undefined
        }
        onNext={
          week < LAST_WEEK ? () => setWeek((current) => current + 1) : undefined
        }
      >
        {`10월 ${week}주`}
      </DateNavigator>
    </div>
  )
}
