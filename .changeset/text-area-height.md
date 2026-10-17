---
"@umc-product/react": patch
---

**화면 변화** `TextArea`의 기본 최소 높이를 198px에서 120px로 줄이고, 오른쪽 여백을 12px에서 16px로 바꿉니다. 피그마 `Text Area`가 바뀐 것을 따릅니다. 피그마 설명대로 최소·최대 높이는 페이지마다 달라질 수 있어서, `className`으로 `--umc-text-area-min-height`와 `--umc-text-area-max-height` 변수를 넘겨 바꿀 수 있게 했습니다. 최대 높이를 넘는 내용은 상자 안에서 스크롤됩니다.
