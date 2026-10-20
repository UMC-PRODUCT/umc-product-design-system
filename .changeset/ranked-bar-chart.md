---
"@umc-product/react": minor
---

`RankedBarChart`를 더합니다. 피그마 `Web/Bar Chart/Ranked Bar`와 `Fixed Ranked Bar`를 옮긴 순위 막대 차트로, 항목을 값이 큰 순서로 늘어놓고 1~3위를 진한 청록에서 옅은 청록으로, 4위부터는 같은 색으로 칠합니다. 같은 값은 같은 순위입니다. `heightBy="value"`(기본)는 가장 큰 값을 200px로 두고 비례하며, `heightBy="rank"`는 순위마다 정해진 높이를 씁니다. 비교값(`reference`)을 넘기면 회색 비교 막대를 겹쳐 그리고, 막대에 마우스를 올리거나 키보드로 가거나 누르면 요약 툴팁이 뜹니다.
