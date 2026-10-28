---
"@umc-product/react": minor
---

**깨지는 변경** 웹 헤더(Web/Header/Desktop): 이름이 피그마를 따라 `HeaderDesktop`이 됩니다 (`Header` → `HeaderDesktop`). 피그마가 `Web/Header`를 `Web/Header/Desktop`과 `Web/Header/Mobile`로 나눠, 데스크톱 헤더의 컴포넌트, 타입, 클래스, 컴포넌트 변수 이름을 함께 바꿉니다. 모양과 props는 같고, 메뉴 항목 타입 `NavItem`은 이름을 유지해 모바일 헤더와 함께 씁니다.

| 전                                          | 후                                                          |
| ------------------------------------------- | ----------------------------------------------------------- |
| `<Header>`                                  | `<HeaderDesktop>`                                           |
| `HeaderProps`                               | `HeaderDesktopProps`                                        |
| `.umc-header`, `.umc-header__logo` 등       | `.umc-header-desktop`, `.umc-header-desktop__logo` 등       |
| `--umc-header-bg`, `--umc-header-nav-bg` 등 | `--umc-header-desktop-bg`, `--umc-header-desktop-nav-bg` 등 |
