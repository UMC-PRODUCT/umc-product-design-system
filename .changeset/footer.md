---
"@umc-product/react": minor
---

푸터(Footer): 서비스 맨 아래에 놓는 UMC 소개, 링크 열, 저작권 문구, 소셜 링크 묶음이 생깁니다 (없음 → `Footer`). 피그마 `Footer`를 옮긴 것으로, `variant`는 랜딩 페이지용 `hero`와 일반 서비스용 `default`(기본) 중에서, `mode`는 `light`(기본), `gray`, `dark` 배경 중에서 고릅니다. `dark`는 진한 청록 배경 위에 청록 빛 번짐을 깝니다. 링크 열은 `columns`로 넘기며, 항목에 `href`가 있으면 밑줄 링크, 없으면 밑줄 없는 글자가 되고 링크는 `LinkProvider`에 등록한 링크 컴포넌트로 그립니다. `socialLinks`는 Facebook, Instagram, YouTube를 36px 원 아이콘으로 그리고 화면 낭독기에 플랫폼 이름을 읽어 줍니다.
