# @umc-product/design-tokens

## 0.10.0 (2026-10-26)

No changes in this release.

## 0.9.0 (2026-10-25)

No changes in this release.

## 0.8.0 (2026-10-25)

No changes in this release.

## 0.7.0 (2026-10-24)

### Minor Changes

- c5001c6: **깨지는 변경** 피그마에 14px 캡션 `Caption/1-Regular`가 생기면서 기존 캡션 스타일의 번호가 한 칸씩 밀렸고, 토큰 이름도 피그마 이름을 따릅니다. 같은 이름이 다른 크기를 가리키게 되어 빌드 오류 없이 글자 크기만 달라지니, 올리기 전에 앱에서 `caption-` 이름을 찾아 바꿔 주세요. 3→4, 2→3, 1→2 순서로 바꿔야 한 이름을 두 번 고치지 않습니다.

  | 스타일                                        | 전                                                        | 후                                                        |
  | --------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
  | 14px Regular, 행간 145%                       | 없음                                                      | `caption-1-regular`                                       |
  | 13px Medium·Regular, 행간 145%                | `caption-1-medium`, `caption-1-regular`                   | `caption-2-medium`, `caption-2-regular`                   |
  | 12px Bold·Medium·Regular, 행간 150%, 자간 -2% | `caption-2-bold`, `caption-2-medium`, `caption-2-regular` | `caption-3-bold`, `caption-3-medium`, `caption-3-regular` |
  | 11px Medium·Regular, 행간 150%                | `caption-3-medium`, `caption-3-regular`                   | `caption-4-medium`, `caption-4-regular`                   |

  CSS 변수(`--umc-typography-caption-…`), Tailwind 유틸리티(`text-caption-…`), vanilla-extract 키가 모두 같은 규칙으로 바뀝니다. 텍스트 스타일은 48개에서 49개가 됩니다. `@umc-product/react` 컴포넌트는 새 이름을 쓰도록 고쳐서 글자 모양이 그대로입니다.

## 0.6.0 (2026-10-20)

No changes in this release.

## 0.5.0 (2026-10-18)

No changes in this release.

## 0.4.0 (2026-10-17)

No changes in this release.

## 0.3.0 (2026-10-15)

No changes in this release.

## 0.2.0 (2026-10-13)

No changes in this release.

## 0.1.1 (2026-10-13)

No changes in this release.

## 0.1.0 (2026-10-12)

### Minor Changes

- fa621e0: 첫 배포입니다.

  - `@umc-product/design-tokens`: 피그마 3기 변수를 옮긴 토큰입니다. 컬러(semantic 152, primitive 78), 텍스트 스타일 48, 그림자 5, spacing 44, radius 17, 그리드와 레이아웃을 CSS 변수, Tailwind v4 유틸리티, vanilla-extract 객체로 냅니다. `tailwind.css`는 Tailwind 기본 팔레트를 지웁니다.
  - `@umc-product/icons`: 아이콘 65종(thin, regular, fill), 픽토그램 11종, UMC 로고입니다.
  - `@umc-product/react`: Base UI 기반 컴포넌트 47종입니다(버튼 2, 폼 입력 11, 선택 10, 표시 9, 오버레이와 피드백 6, 앱 셸 9).
