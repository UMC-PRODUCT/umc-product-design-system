---
"@umc-product/design-tokens": minor
---

**깨지는 변경** 피그마에 14px 캡션 `Caption/1-Regular`가 생기면서 기존 캡션 스타일의 번호가 한 칸씩 밀렸고, 토큰 이름도 피그마 이름을 따릅니다. 같은 이름이 다른 크기를 가리키게 되어 빌드 오류 없이 글자 크기만 달라지니, 올리기 전에 앱에서 `caption-` 이름을 찾아 바꿔 주세요. 3→4, 2→3, 1→2 순서로 바꿔야 한 이름을 두 번 고치지 않습니다.

| 스타일                                        | 전                                                        | 후                                                        |
| --------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| 14px Regular, 행간 145%                       | 없음                                                      | `caption-1-regular`                                       |
| 13px Medium·Regular, 행간 145%                | `caption-1-medium`, `caption-1-regular`                   | `caption-2-medium`, `caption-2-regular`                   |
| 12px Bold·Medium·Regular, 행간 150%, 자간 -2% | `caption-2-bold`, `caption-2-medium`, `caption-2-regular` | `caption-3-bold`, `caption-3-medium`, `caption-3-regular` |
| 11px Medium·Regular, 행간 150%                | `caption-3-medium`, `caption-3-regular`                   | `caption-4-medium`, `caption-4-regular`                   |

CSS 변수(`--umc-typography-caption-…`), Tailwind 유틸리티(`text-caption-…`), vanilla-extract 키가 모두 같은 규칙으로 바뀝니다. 텍스트 스타일은 48개에서 49개가 됩니다. `@umc-product/react` 컴포넌트는 새 이름을 쓰도록 고쳐서 글자 모양이 그대로입니다.
