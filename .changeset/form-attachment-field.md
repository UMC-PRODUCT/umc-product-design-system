---
"@umc-product/react": minor
---

질문지에서 링크나 파일을 붙이는 `FormAttachmentField`를 더합니다. 피그마 `Form/Attachment Field`의 응답 모드로, 비어 있으면 링크 입력과 "파일 업로드" 버튼을, 첨부(`attachment`)가 있으면 클립 아이콘과 링크, "삭제" 버튼을 보여 줍니다. 파일은 기본으로 200MB 이하 PDF만 받아 `onFileSelect`로 넘기고, 맞지 않으면 `onReject`로 이유를 넘깁니다. 업로드와 링크를 첨부로 확정하는 일은 앱이 맡습니다. 질문지 편집 화면에서는 `preview`를 주면 입력 칸과 버튼을 누를 수 없는 미리보기로 그립니다.
