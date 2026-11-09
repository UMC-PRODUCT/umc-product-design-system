---
"@umc-product/react": patch
---

**화면 변화** 다크 헤더의 버튼(HeaderDesktop): 액션 영역의 버튼이 피그마 다크 헤더와 같은 모양이 됩니다 (라이트 버튼 색 그대로 → 반투명 흰 배경의 CTA 버튼과 링만 남은 로그인 버튼). `mode="dark"`인 `HeaderDesktop`의 `actions` 안에 둔 `Button`은 `fill`이면 `#fbfcfc` 30% 배경에 내비게이션 알약과 같은 1px 하이라이트 링, `weak`이면 투명 배경에 0.5px 하이라이트 링을 그리고 글자는 흰색입니다. `color`와 상관없이 같고, 마우스를 올리거나 누르면 배경이 각각 40%, 20%로 짙어집니다. 비활성 버튼은 배경을 두고 글자만 `#adadad`로 흐려집니다. 라이트 모드와 `HeaderMobile`, 헤더 밖의 `Button`은 그대로입니다.
