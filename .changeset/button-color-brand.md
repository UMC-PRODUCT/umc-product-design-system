---
"@umc-product/react": minor
---

**깨지는 변경** 피그마 `Button`의 `Color=Primary`가 `Color=Brand`가 되어 `Button`의 `color="primary"`를 `color="brand"`로 바꿉니다. 기본값도 `brand`입니다. 색 값은 그대로이고, 피그마가 바뀌지 않은 `IconButton`, `Toast`, `Dialog`의 `primary`는 그대로 둡니다.

| 전                          | 후                       |
| --------------------------- | ------------------------ |
| `<Button color="primary">`  | `<Button color="brand">` |
| `ButtonColor`의 `"primary"` | `"brand"`                |
| `[data-color="primary"]`    | `[data-color="brand"]`   |
