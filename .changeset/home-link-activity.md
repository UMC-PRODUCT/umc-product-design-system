---
"@umc-product/react": minor
---

**깨지는 변경** 웹 헤더 홈 링크의 맥락(Web/Header/Home Link): Study가 Activity로 바뀝니다 (`context="study"` → `context="activity"`). 피그마 `Web/Header/Home Link`의 `Context=Study`가 `Context=Activity`로 바뀐 것을 따라 `HeaderHomeLink`와 `UmcLogoLockup`의 맥락 이름을 바꿉니다. 로고 옆 글자가 STUDY에서 ACTIVITY가 되고, 화면 낭독기는 "UMC Activity 11th"로 읽습니다. `generation`을 꼭 넘기는 규칙과 기수 서수 표기는 그대로입니다.

| 전                                                   | 후                                                      |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `<HeaderHomeLink context="study" generation={11} />` | `<HeaderHomeLink context="activity" generation={11} />` |
| `<UmcLogoLockup context="study" generation={11} />`  | `<UmcLogoLockup context="activity" generation={11} />`  |
