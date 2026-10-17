---
"@umc-product/react": minor
---

**깨지는 변경** 피그마 `Text Field/ Input Box`의 `Type=Text Area`를 옮긴 단문형 `TextArea`의 이름을 `TextFieldArea`로 바꿉니다. `TextArea`라는 이름은 이번 배포에서 피그마 `Text Area`를 옮긴 장문형 컴포넌트가 씁니다. 단문형의 동작과 모양은 그대로입니다.

| 이전                                        | 이후                                                  |
| ------------------------------------------- | ----------------------------------------------------- |
| `TextArea`                                  | `TextFieldArea`                                       |
| `TextAreaProps`                             | `TextFieldAreaProps`                                  |
| `.umc-text-area`, `.umc-text-area__input`   | `.umc-text-field-area`, `.umc-text-field-area__input` |
| 문서 `/components/forms/text-area/`(단문형) | `/components/forms/text-field-area/`                  |

`TextArea` 이름은 새 장문형으로 그대로 컴파일되므로 타입 오류 없이 모양이 바뀔 수 있습니다. 장문형이 새로 받는 props는 없고 `size`만 사라지므로, `size`를 넘긴 곳은 타입 오류로 드러납니다. 주소처럼 짧은 글을 받던 곳을 아래 명령으로 찾아 `TextFieldArea`로 바꾸세요.

```bash
rg -n "\bTextArea(Props)?\b" -g "*.{ts,tsx}"
rg -n "umc-text-area"
```
