---
"@umc-product/react": patch
---

**화면 변화** `BottomNavigationItem`이 하위 경로에서도 탭을 선택합니다. 지금까지는 `currentPath`와 `href`가 정확히 같을 때만 선택되어 `/projects/12`에서 `/projects` 탭이 선택되지 않았고, 반대로 `/settings`에서 `/settings/profile` 탭이 선택되었습니다. 이제 `Header`와 같은 규칙(같거나 하위 경로)을 따릅니다.
