---
"@umc-product/react": minor
---

질문지 편집 화면의 `FormQuestionEditor`와 `FormEditableQuestion`을 더합니다. 피그마 `Form/Question Editor`를 옮긴 `FormQuestionEditor`는 질문을 감싸 Hover 강조선과 활성(`active`) 상태의 필수 항목, 삭제, 질문 사용 스위치, `toolbar`를 그립니다. 필수 항목 체크와 제목 뒤 `*`는 `required` 하나를 따르고, `disabled`를 주면 안쪽 제목·설명 칸과 보기 편집, 첨부 미리보기도 함께 막힙니다. 이동 손잡이는 `dragHandleProps`를 넘길 때만 그려서 끌어 옮기기 라이브러리와 연결합니다. `FormEditableQuestion`은 `Form/Question`의 편집 모드로, 제목과 설명이 입력 칸이고 답 칸 자리에 미리보기를 받습니다.
