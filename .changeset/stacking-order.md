---
"@umc-product/react": patch
---

**화면 변화** 모달 안에서 연 목록과 툴팁이 모달 뒤에 깔리던 문제를 고칩니다. 쌓임 순서를 아래부터 딤(`--umc-z-dimmed` 1000), 다이얼로그(`--umc-z-dialog` 1100), 시트(`--umc-z-sheet` 1200), 목록(`--umc-z-dropdown` 1300), 툴팁(`--umc-z-tooltip` 1400), 토스트(`--umc-z-toast` 1500)로 바꿉니다. 이제 `Panel`, `Dialog`, `AppDialog`, `BottomSheet` 안의 `Select`, `Menu`, `ContextSwitcher` 목록과 `Tooltip`이 모달 위에 뜨고, 모달이 열려 있어도 토스트가 딤 위에 보입니다. 앱에서 이 변수 값을 직접 비교하거나 덮어썼다면 새 순서를 확인하세요.
