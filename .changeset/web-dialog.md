---
"@umc-product/react": minor
---

웹 화면용 `Dialog`를 더합니다. 피그마 `Web/Dialog`를 옮긴 컴포넌트이고, 앱 화면용은 `AppDialog`입니다. `cancelLabel`을 넘기면 취소와 확인 버튼 두 개(Fill)를, 생략하면 확인 텍스트 버튼 하나(Weak)를 그립니다. `color`(`primary`, `neutral`, `error`)로 확인 버튼과 제목 색을 고르고, `icon`은 제목 앞에, `children`은 설명과 버튼 사이에 놓입니다. 폭은 430px(최소 420px)이며 좁은 화면에서는 화면 폭에 맞춥니다. Esc로 닫히고, 바깥을 눌러도 닫히지 않습니다.
