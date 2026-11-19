---
"@umc-product/react": patch
---

**화면 변화** 회색 토스트 배경(Toast Neutral, Warning, Service Notice Neutral): 반투명 진회색이 불투명한 회색이 됩니다 (`rgba(63, 65, 65, 0.8)` → `#606262`). 피그마가 세 타입의 배경을 `Fill/Neutral-Inverse/Strong-600`에 연결해 코드도 `--umc-color-fill-neutral-inverse-strong-600`을 씁니다. Error 토스트 배경은 `#fed7d7` 그대로이며, 값을 직접 적던 자리에 `--umc-color-fill-error-medium-100`을 씁니다.
