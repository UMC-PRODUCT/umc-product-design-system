---
"@umc-product/react": minor
---

아코디언(Web/Accordion Item): 제목을 눌러 본문을 펼치고 접는 아코디언이 생깁니다 (없음 → `Accordion`, `AccordionItem`). 피그마 `Web/Accordion Item`을 옮긴 것으로 공홈 랜딩 FAQ의 로컬 컴포넌트를 공용으로 올렸습니다. `Accordion` 안에 `AccordionItem`을 16px 간격으로 쌓고, 항목은 접두(`prefix`, 기본 `Q`)와 22px 제목(`title`), 펼침 아이콘을 한 줄에 두고 펼치면 18px 본문(`body`)을 24px 아래에 보입니다. 기본값은 한 번에 하나만 펼치고 `multiple`을 주면 여럿을 함께 펼칩니다. `value`, `defaultValue`, `onValueChange`로 펼친 항목을 다룹니다. 제목이 두 줄이면 접두와 아이콘은 세로 가운데에 머뭅니다.
