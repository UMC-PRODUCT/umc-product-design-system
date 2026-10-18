---
"@umc-product/react": minor
---

**깨지는 변경** `SideNavigation`이 216px 고정 폭 대신 부모 폭을 채웁니다. 피그마 `Web/Side Navigation`의 너비가 Fill이라, 사이드바 칸의 폭은 레이아웃이 정합니다.

| 이전                                                                   | 이후                                 |
| ---------------------------------------------------------------------- | ------------------------------------ |
| `width: var(--umc-layout-sidebar-width)`(216px), 넓은 부모에서도 216px | `width: 100%`, 부모 폭을 그대로 채움 |

본문과 같은 flex 행에 바로 놓았다면 내비게이션이 행 전체로 늘어나 본문이 밀려납니다. 사이드바 칸 폭을 정하고 줄어들지 않게 합니다.

```tsx
<SideNavigation
  className="w-(--umc-layout-sidebar-width) shrink-0"
  items={items}
  currentPath={pathname}
/>
```

Tailwind를 쓰지 않는 앱은 감싸는 요소에 `width: var(--umc-layout-sidebar-width)`와 `flex-shrink: 0`을 줍니다. 쓰는 곳은 아래 명령으로 찾습니다.

```bash
rg -n "<SideNavigation" -g "*.{ts,tsx}"
```
