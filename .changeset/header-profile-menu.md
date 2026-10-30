---
"@umc-product/react": minor
---

웹 헤더의 프로필(Web/Header/Profile Menu): 로그인한 사용자의 아바타와 프로필 메뉴가 생깁니다 (없음 → `HeaderProfileMenu`). 피그마 `.primitive/Web/Header/Profile`과 `Web/Header/Profile Menu`를 옮겼습니다. 40px 원형 아바타(사진이 없으면 기본 사람 그림)를 누르면 닉네임, 이름, 학교, 역할 태그, 기수 목록, 계정 설정, 로그아웃을 담은 메뉴가 열립니다. 메뉴는 피그마 예시 화면대로 아바타 바로 아래에 붙고 오른쪽 끝이 아바타보다 4px 바깥에 놓입니다. 기수는 `generations`, `generation`, `onGenerationChange`로 하나를 고르고, 고르는 즉시 메뉴가 닫힙니다. `HeaderDesktop`의 `actions` 맨 끝에 둡니다.
