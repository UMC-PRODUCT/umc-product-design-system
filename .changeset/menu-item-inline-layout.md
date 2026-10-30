---
"@umc-product/react": minor
---

메뉴와 선택 목록의 Xs 항목(Meue Item): 캡션을 레이블과 같은 줄 오른쪽 끝에 두는 배치가 생깁니다 (캡션은 레이블 아래 → Inline 배치 추가). 피그마 `.primitve/Meue Item/Text Only`에 더해진 `Layout=Inline`을 옮겼습니다. `Select`에 `itemSize="xs"`와 `itemLayout="inline"`을, `Menu`에 `size="xs"`와 `layout="inline"`을 넘기면 캡션이 10px 회색 글씨로 같은 줄 끝에 붙습니다. 고른 항목은 체크가 레이블 앞으로 오고 좌우 여백이 8px, 캡션이 teal-500이 됩니다. 피그마처럼 Xs 크기에서만 타입이 Inline을 받습니다. `Menu` 항목(`MenuItemDef`)에도 `caption`이 생겨 기본 배치에서는 레이블 아래에 그립니다.
