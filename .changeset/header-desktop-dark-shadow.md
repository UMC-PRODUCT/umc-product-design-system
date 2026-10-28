---
"@umc-product/react": patch
---

**화면 변화** 웹 헤더 다크 모드의 그림자(Web/Header/Desktop): 색이 짙어집니다 (`#eff0f0` 30% → `#414645` 30%). 피그마 다크 모드 헤더의 그림자가 바뀐 것을 따라 `HeaderDesktop`의 `mode="dark"` 그림자를 `0 4px 16px 0 #4146454d`로 바꿉니다. 맞는 토큰이 없어 컴포넌트 변수로 둡니다.
