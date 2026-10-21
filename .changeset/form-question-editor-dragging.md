---
"@umc-product/react": minor
---

`FormQuestionEditor`에 `dragging`을 더합니다. 손잡이를 잡고 순서를 옮기는 동안 켜면 회색 강조선과 떠 있는 그림자가 생기고 활성 질문이어도 필수 항목, 삭제, 툴바가 숨겨집니다. 끌어서 옮기는 기능은 앱이 붙이며 @dnd-kit을 쓴다면 `useSortable`의 `isDragging`을 그대로 넘기면 됩니다.
