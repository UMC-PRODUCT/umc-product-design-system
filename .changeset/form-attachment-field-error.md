---
"@umc-product/react": minor
---

`FormAttachmentField`에 `invalid`와 `errorMessage`를 추가합니다. 피그마 `Form/Question`에 생긴 Help Text에 맞춰, 오류이면 칸 테두리를 Red-300으로 바꾸고 칸 아래에 빨간 도움말을 보여 줍니다. 도움말은 링크 입력의 설명으로 이어집니다. 글 답변(`FormTextAnswer`)은 전처럼 `TextArea`의 `invalid`와 `errorMessage`를 씁니다.

칸과 버튼은 루트 안의 새 요소(`.umc-form-attachment-field__row`)로 묶였습니다. 루트에 `className`으로 칸과 버튼 사이 간격을 주던 앱은 확인해 주세요.
