---
"@umc-product/react": minor
---

`Calendar`와 `CalendarScheduleCard`를 추가합니다. 피그마 `Calendar`와 `Calendar/Schedule Card`를 옮겼고, 두 컴포넌트는 서로 이어지지 않아 앱이 함께 놓고 연결합니다.

- `Calendar`: 월요일에 시작하는 한 달 격자와 이전·다음 달 버튼을 그립니다. 날짜 하나를 고르고(`value`, `onValueChange`), 기간을 띠로(`ranges`), 일정이 있는 날을 점으로(`markedDates`) 보여 줍니다. 앞뒤 달 날짜는 흐리게 채우고, 누르면 그 달로 옮깁니다. 화살표, Home, End, PageUp, PageDown으로 날짜를 옮길 수 있습니다.
- `CalendarScheduleCard`: 회차, 일정 이름, 기간을 한 장에 담는 카드입니다. `status`로 예정, 진행 중, 지난 일정을 나눕니다.
