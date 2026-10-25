---
"@umc-product/react": patch
---

**화면 변화** 입력 상자의 오류 배경이 더 옅은 분홍이 됩니다. 피그마 `Text Field/Box/Field`의 오류 배경이 Red-50 100%에서 Red-50 30%(`rgba(254, 242, 241, 0.3)`)로 바뀐 것을 따라 `TextFieldBoxField`, `TextFieldBox`, `TextFieldArea`, `VerificationCodeField`, `Select`의 `invalid` 배경을 `#fef2f1`에서 `#fef2f14d`로 바꿉니다. 투명도 토큰이 아직 없어 값은 컴포넌트 변수 `--umc-text-field-box-field-error-bg`, `--umc-select-error-bg`에 두었습니다. `CodeField` 칸과 `IconButton`의 오류 배경은 그대로입니다.
