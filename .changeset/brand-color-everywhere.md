---
"@umc-product/react": minor
---

**깨지는 변경** 아이콘 버튼, 토스트, 대화상자(Icon Button, Toast, Web/Dialog): 기본 색 이름이 Button과 같은 Brand가 됩니다 (`primary` → `brand`). 디자인 팀이 Button에 이어 세 컴포넌트의 Primary도 Brand로 부르기로 해, `IconButton`과 `Dialog`의 `color="primary"`, `Toast`의 `color: "primary"`를 `brand`로 바꿉니다. 기본값도 `brand`이고 색 값은 그대로입니다. `Radio`와 `TopNavigationButton`의 `color="primary"`는 그대로입니다.

| 전                                                                                                                       | 후                               |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `<IconButton color="primary">`                                                                                           | `<IconButton color="brand">`     |
| `<Dialog color="primary">`                                                                                               | `<Dialog color="brand">`         |
| `toast.show({ color: "primary" })`                                                                                       | `toast.show({ color: "brand" })` |
| `IconButtonColor`, `DialogColor`, `ToastOptions["color"]`의 `"primary"`                                                  | `"brand"`                        |
| `.umc-icon-button[data-color="primary"]`, `.umc-toast[data-color="primary"]`, `.umc-dialog__popup[data-color="primary"]` | `[data-color="brand"]`           |
