---
"@umc-product/react": patch
---

**화면 변화** `AppDialog` Confirm 타입(`cancelLabel` 없음)의 확인 텍스트 버튼에 좌우 8px, 상하 4px 여백을 더합니다. 피그마 `App/Dialog` Button Area의 Weak 타입이 확인 버튼을 터치 영역으로 감싼 것을 따릅니다. 확인 글자가 오른쪽 끝에서 8px 안쪽으로 들어오고, 버튼 영역 높이가 약 54px에서 62px로 늘어 피그마와 같아집니다. 여백까지 눌리는 영역이라 터치하기 쉬워집니다.
