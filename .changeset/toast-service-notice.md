---
"@umc-product/react": minor
---

토스트(Toast): 서비스 공지 토스트가 생깁니다 (Service Notice 미지원 → `toast.showServiceNotice`). 피그마 `Toast`의 `Type=Service Notice`와 `Type=Service Notice · Neutral`을 옮긴 것으로, 메시지 양옆에 24px `UnderConstructionPictogram`을 그리고 아이콘, 동작 버튼, 닫기 버튼 없이 내용 폭으로 그립니다. `useToast()`가 돌려주는 객체에 `showServiceNotice({ message, color, duration })`가 더해지고, `color`는 `"brand"`(기본, 픽토그램 light 모드)와 `"neutral"`(dark 모드)입니다. 3초 뒤에 저절로 닫히며 기존 `toast.show()`는 그대로입니다.
