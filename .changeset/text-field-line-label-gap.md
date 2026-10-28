---
"@umc-product/react": patch
---

**화면 변화** 밑줄 입력의 레이블과 입력 칸(Text Field/Line): 둘 사이 간격이 사라져 레이블이 입력 칸에 바로 붙습니다 (6px → 0). 피그마 `Text Field/Line`이 레이블과 입력 칸을 `Label+Text Field` 묶음으로 바꾸고 묶음 안 간격을 0으로 둔 것을 따라 `TextFieldLine`의 루트 간격을 0으로 두고 도움말과 오류 문구 위에만 6px을 줍니다. 입력 칸과 도움말 사이 6px은 그대로입니다.
