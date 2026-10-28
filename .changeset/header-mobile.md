---
"@umc-product/react": minor
---

모바일 웹 헤더 `HeaderMobile`을 추가합니다. 피그마 `Web/Header/Mobile`과 primitive `Actions-Mobile`, `Menu Container`, `Menu Item`을 옮긴 것으로, 80px 줄에 홈 링크와 메뉴 버튼을 두고 버튼을 누르면 헤더 아래에 메뉴를 겹쳐 펼칩니다. 메뉴에는 데스크톱 헤더와 같은 `navItems`(20px 항목)와 `actions`(CTA 버튼 자리)가 들어가고, 항목을 누르거나 `Esc`, 바깥을 누르면 닫힙니다. 열림 상태는 `open`, `defaultOpen`, `onOpenChange`로 다루고, 다크 모드는 피그마대로 투명한 줄과 `#0d1a19` 메뉴 배경을 씁니다.
