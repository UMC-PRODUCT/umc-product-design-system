---
"@umc-product/react": minor
---

페이지네이션 바(페이지네이션 바): 슬라이드 위치를 점으로 보여 주는 막대가 생깁니다 (없음 → `PaginationBar`). UMC Learning 피그마 `페이지네이션 바`를 옮긴 것으로, 소개 랜딩의 사용 설명서 슬라이드 아래에서 쓰던 로컬 컴포넌트를 공용으로 올렸습니다. 어두운 배경 위의 유리 느낌 막대(모서리 12px, 뒤 21px 흐림) 안에 30px 이전·다음 화살표와 8px 점을 6px 간격으로 놓고, 현재 점은 18px 알약으로 늘립니다. 넘어갈 슬라이드가 없는 쪽 화살표는 비활성으로 어두워집니다. `totalPages`, `page`/`defaultPage`, `onPageChange`로 `Pagination`과 같은 1부터 세는 번호를 다루고, `highlightNext`를 주면 다음 화살표 뒤에서 70px 청록 링이 1.65초마다 커지며 사라지기를 반복합니다(움직임 줄이기 설정에서는 멈춘 링). `controls`로 넘긴 슬라이드 영역 `id`를 화살표와 점의 `aria-controls`에 답니다.
