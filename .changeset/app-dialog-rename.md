---
"@umc-product/react": minor
---

**깨지는 변경** 앱용 `Dialog`의 이름을 `AppDialog`로 바꿉니다. 피그마 `App/Dialog`를 옮긴 컴포넌트이고, `Dialog`라는 이름은 이번 배포에서 피그마 `Web/Dialog`를 옮긴 웹 다이얼로그가 씁니다. 동작과 모양은 그대로입니다.

| 이전                                                                                      | 이후                                  |
| ----------------------------------------------------------------------------------------- | ------------------------------------- |
| `Dialog`                                                                                  | `AppDialog`                           |
| `DialogProps`                                                                             | `AppDialogProps`                      |
| `.umc-dialog__backdrop`, `__popup`, `__text`, `__title`, `__description`, `__button-area` | `.umc-app-dialog__…` (같은 부품 이름) |
| `--umc-dialog-*` 변수                                                                     | `--umc-app-dialog-*`                  |
| 문서 `/components/overlay/dialog/`                                                        | `/components/overlay/app-dialog/`     |

`Dialog` 이름은 새 웹 다이얼로그로 그대로 컴파일되므로 타입 오류 없이 모양이 바뀔 수 있습니다. 앱 화면에서 쓰던 곳을 아래 명령으로 찾아 `AppDialog`로 바꾸세요.

```bash
rg -n "\bDialog(Props)?\b" -g "*.{ts,tsx}"
rg -n "umc-dialog|--umc-dialog-"
```
