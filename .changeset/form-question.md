---
"@umc-product/react": minor
---

새 문서 그룹 "질문지"에 `FormQuestion`과 `FormTextAnswer`를 더합니다. 피그마 `Form/Question`의 응답과 읽기 전용 모드를 옮긴 것으로, `FormQuestion`은 번호, 제목, 필수 별표, 설명(`SectionHeader` md)과 20px 들여 쓴 답 칸을 그립니다. 질문 제목과 설명이 안쪽 답 칸의 이름과 설명이 되고, `required`, `readOnly`, `disabled`가 답 칸에 전해집니다. `FormTextAnswer`는 `TextArea`에 이 연결만 더한 글 답 칸입니다.
