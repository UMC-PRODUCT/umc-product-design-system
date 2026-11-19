---
"@umc-product/design-tokens": minor
"@umc-product/react": patch
---

**화면 변화** 빨강 100 단계(Red-100)를 쓰는 연한 빨강 면: 한 단계 진한 분홍이 됩니다 (`#ffe7e5` → `#fed7d7`). 피그마가 Toast Error에만 따로 쓰던 색을 Red-100으로 시스템화하고, 기존 Red-100 값은 새 `--umc-color-red-75`(`#ffe7e5`)로 옮겼습니다. `--umc-color-red-100`이 바뀌면서 `--umc-color-fill-error-medium-100`, `--umc-color-border-error-weaker-100`도 같은 값이 됩니다. 화면에서는 Button의 Red Fill 비활성 글자와 Red Weak 배경, IconButton의 Error Weak 누름 배경, Tag와 NumberBadge의 Error Weak 배경, Dialog의 Error 확인 버튼 배경이 진해집니다. 이전 색을 그대로 쓰려면 `--umc-color-red-75`로 바꿉니다.
