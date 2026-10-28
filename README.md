# UMC 디자인 시스템

UMC PRODUCT Design Chapter의 디자인 토큰, 아이콘, React 컴포넌트입니다. 피그마 디자인 시스템을 코드로 옮겼고, 다른 저장소에서 패키지로 설치해 씁니다.

- 문서: https://design.university.neordinary.com/
- Storybook: https://design.university.neordinary.com/storybook/
- 변경 기록: 이 문서의 [릴리스](#릴리스), 문서 사이트의 [변경 기록](https://design.university.neordinary.com/releases/changelog/)

## 패키지

| 패키지                       | 내용                                                            |
| ---------------------------- | --------------------------------------------------------------- |
| `@umc-product/design-tokens` | 컬러, 텍스트 스타일, 그림자, 그리드 토큰. CSS 변수, Tailwind v4 |
| `@umc-product/icons`         | 아이콘 66종, 픽토그램 12종, UMC 로고 2종 React 컴포넌트         |
| `@umc-product/react`         | Base UI 기반 컴포넌트 84종과 미리 빌드한 CSS                    |

세 패키지는 항상 같은 버전으로 함께 배포합니다.

## 시작하기

패키지는 GitHub Packages에 비공개로 배포합니다. UMC-PRODUCT 조직 멤버라면 설치할 수 있지만, 공개 npm과 달리 GitHub 토큰이 필요합니다. 앱은 React 19를 써야 하고, 패키지는 ESM으로만 나갑니다.

### 1. GitHub 토큰 만들기

GitHub의 **Settings → Developer settings → Personal access tokens → Tokens (classic)** 에서 토큰을 만듭니다. 권한은 `read:packages` 하나면 됩니다. GitHub Packages의 npm 레지스트리는 classic 토큰만 받으니 fine-grained 토큰은 만들지 마세요.

### 2. `.npmrc` 두 곳에 적기

내 컴퓨터의 `~/.npmrc`(사용자 폴더)에 토큰을 적습니다. 이 파일은 저장소에 올리지 않습니다.

```ini
//npm.pkg.github.com/:_authToken=ghp_여기에_토큰
```

앱 저장소 루트의 `.npmrc`에는 레지스트리만 적고 커밋합니다.

```ini
@umc-product:registry=https://npm.pkg.github.com
```

앱 저장소의 `.npmrc`에는 토큰도, `${NODE_AUTH_TOKEN}` 같은 변수도 넣지 마세요. 변수가 비어 있으면 pnpm이 파일을 통째로 무시해 레지스트리 줄까지 사라집니다.

### 3. 설치하기

```bash
pnpm add @umc-product/react @umc-product/icons @umc-product/design-tokens
```

토큰만 쓰는 앱은 `@umc-product/design-tokens` 하나만 설치합니다.

### 4. CSS 불러오기

앱 전역 CSS 파일에 적습니다. Vite 앱이라면 `main.tsx`가 불러오는 `src/index.css`, Next.js App Router라면 `app/layout.tsx`가 불러오는 `app/globals.css`입니다.

```css
@import "tailwindcss";
@import "@umc-product/react/styles.css";
@import "@umc-product/design-tokens/tailwind.css";
```

`styles.css`가 글꼴과 토큰 CSS를 함께 불러옵니다. 토큰만 쓰는 앱의 불러오기 순서는 문서의 [CSS 불러오기](https://design.university.neordinary.com/getting-started/installation/#css-불러오기)를 따르세요.

### 5. 컴포넌트 쓰기

```tsx
import { SearchIcon } from "@umc-product/icons"
import { Button, TextFieldBox } from "@umc-product/react"

export function SearchForm() {
  return (
    <form>
      <TextFieldBox label="이름" placeholder="이름을 입력하세요" />
      <Button leadingIcon={<SearchIcon />}>검색</Button>
    </form>
  )
}
```

컴포넌트별 쓰임과 모든 변형은 [문서](https://design.university.neordinary.com/)에서 보고, props를 바꿔 보려면 [Storybook](https://design.university.neordinary.com/storybook/)을 엽니다.

### 6. 설치 확인하기

```bash
pnpm view @umc-product/react version
```

최신 버전 번호가 나오면 토큰과 레지스트리 설정이 맞습니다.

### CI와 배포 환경

CI와 배포 서버도 설치할 때 토큰이 필요합니다. 전체 설정은 문서의 [앱의 CI와 배포 환경](https://design.university.neordinary.com/getting-started/installation/#앱의-ci와-배포-환경)에 있습니다.

- **GitHub Actions**: 디자인 시스템 저장소 관리자에게 앱 저장소를 세 패키지의 **Manage Actions access**에 더해 달라고 요청하세요. 앱 워크플로에는 `packages: read` 권한을 주고, job의 `NODE_AUTH_TOKEN`에 `secrets.GITHUB_TOKEN`을 넣습니다.
- **AWS Amplify**: 조직 공용 계정에서 만든 `read:packages` classic 토큰을 환경 변수(예: `UMC_PACKAGES_TOKEN`)에 넣고, 설치 전에 `.npmrc`에 적습니다. 토큰 주인이 조직을 떠나거나 기수가 바뀌면 모든 빌드가 멈추므로 개인 토큰은 쓰지 않습니다.

```yaml
frontend:
  phases:
    preBuild:
      commands:
        - printf '\n//npm.pkg.github.com/:_authToken=%s\n' "$UMC_PACKAGES_TOKEN" >> .npmrc
        - pnpm install --frozen-lockfile
```

### 막히면

| 오류               | 흔한 원인                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `404 Not Found`    | 주소가 `registry.npmjs.org`라면 앱 `.npmrc`에 레지스트리 줄이 없거나, 같은 파일의 빈 변수 때문에 pnpm이 파일을 무시했습니다            |
| `401 Unauthorized` | `~/.npmrc`에 토큰이 없거나 만료됐습니다. CI라면 `NODE_AUTH_TOKEN`이 설치 단계까지 전달되지 않았습니다                                  |
| `403 Forbidden`    | 토큰에 `read:packages`가 없거나, fine-grained 토큰이거나, 토큰 주인이 조직 멤버가 아닙니다. Actions라면 Manage Actions access를 봅니다 |

그 밖의 문제는 문서의 [문제 해결](https://design.university.neordinary.com/getting-started/troubleshooting/)에 있습니다.

## 버전 올리기

0.x 동안에는 깨지는 변경과 추가(컴포넌트, prop, 토큰, 아이콘)를 minor로, 수정과 피그마 값 동기화를 patch로 올립니다. 앱의 `^0.5.0`은 0.5.x만 받고 0.6.0은 받지 않습니다.

```bash
pnpm up "@umc-product/*"
pnpm up "@umc-product/*" --latest
```

첫 줄은 범위 안의 최신 patch로 올립니다. 둘째 줄은 범위를 넘어 최신 minor까지 올리니, 먼저 [릴리스](#릴리스)에서 **깨지는 변경**과 **화면 변화**를 확인하세요. 새 컴포넌트가 필요할 때도 둘째 줄로 올립니다. 세 패키지는 같은 버전으로 맞춥니다. 자세한 기준은 문서의 [버전 정책](https://design.university.neordinary.com/releases/versioning/)에 있습니다.

## 릴리스

버전마다 어디가 어떻게 달라지는지 표로 모았습니다. 최신 버전만 펼쳐 두었고, 대응표와 전후 값 같은 전문은 각 패키지의 `CHANGELOG.md`와 [GitHub Releases](https://github.com/UMC-PRODUCT/umc-product-design-system/releases)에 있습니다.

<!-- releases:start -->

<details open>
<summary><b>0.10.0</b> · 2026-10-26 · 깨지는 변경 1 · 화면 변화 1</summary>

**깨지는 변경**

| 대상                                                          | 변경사항                                    | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------- | ------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 아이콘 버튼, 토스트, 대화상자(Icon Button, Toast, Web/Dialog) | 기본 색 이름이 Button과 같은 Brand가 됩니다 | `primary` → `brand`                   | [IconButton](https://design.university.neordinary.com/components/actions/icon-button/) · [Dialog](https://design.university.neordinary.com/components/overlay/dialog/) · [Toast](https://design.university.neordinary.com/components/overlay/toast/) |

**화면 변화**

| 대상                                         | 변경사항                                     | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                        |
| -------------------------------------------- | -------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- |
| 밑줄 입력의 레이블과 도움말(Text Field/Line) | 왼쪽 여백이 사라져 밑줄 왼쪽 끝에 맞춰집니다 | 4px → 0                               | [TextFieldLine](https://design.university.neordinary.com/components/forms/text-field-line/) |

전문과 대응표: [react](packages/react/CHANGELOG.md#0100-2026-10-26)

</details>

<details>
<summary><b>0.9.0</b> · 2026-10-25 · 새 기능 1 · 화면 변화 2</summary>

**새 기능**

| 대상                     | 변경사항             | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                               |
| ------------------------ | -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| 코드 입력 칸(Code Input) | 작은 크기가 생깁니다 | 52px 칸 한 가지 → 42px 칸 추가        | [CodeField](https://design.university.neordinary.com/components/forms/code-field/) |

**화면 변화**

| 대상                                      | 변경사항                                                       | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후           | 보기                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 바텀 시트와 패널의 버튼 영역(Button Area) | 버튼 위 여백이 줄고 패널에서는 버튼이 양옆으로 조금 넓어집니다 | 위 여백 32px → 16px, 패널 좌우 여백 20px → 16px | [BottomSheet](https://design.university.neordinary.com/components/overlay/bottom-sheet/) · [Panel](https://design.university.neordinary.com/components/overlay/panel/)                                                                                                                                                                                                                                              |
| 입력 상자의 오류 상태(Text Field/Box)     | 분홍 배경이 옅어집니다                                         | Red-50 → Red-50 30%                             | [TextFieldBoxField](https://design.university.neordinary.com/components/forms/text-field-box-field/) · [TextFieldBox](https://design.university.neordinary.com/components/forms/text-field-box/) · [TextFieldArea](https://design.university.neordinary.com/components/forms/text-field-area/) · [VerificationCodeField](https://design.university.neordinary.com/components/forms/verification-code-field/) · 외 1 |

전문과 대응표: [react](packages/react/CHANGELOG.md#090-2026-10-25)

</details>

<details>
<summary><b>0.8.0</b> · 2026-10-25 · 깨지는 변경 2 · 새 기능 2 · 화면 변화 2</summary>

**깨지는 변경**

| 대상 | 변경사항                                                                                                                 | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      | 피그마 `Button`의 `Color=Primary`가 `Color=Brand`가 되어 `Button`의 `color="primary"`를 `color="brand"`로 바꿉니다       |                                       | [Button](https://design.university.neordinary.com/components/actions/button/)                                                                                                                    |
|      | 피그마가 `Text Field/ Input Box`를 `Text Field/Box/Field`로, 완성형을 `Text Field/Box`로 바꾸면서 코드 이름도 따라갑니다 |                                       | [TextFieldBox](https://design.university.neordinary.com/components/forms/text-field-box/) · [TextFieldBoxField](https://design.university.neordinary.com/components/forms/text-field-box-field/) |

**새 기능**

| 대상 | 변경사항                                              | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                               |
| ---- | ----------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 질문지 그룹에 `FormSheet`와 `FormHeader`를 추가합니다 |                                       | [FormSheet](https://design.university.neordinary.com/components/questionnaire/form-sheet/) · [FormHeader](https://design.university.neordinary.com/components/questionnaire/form-sheet/)                                                                                           |
|      | `TextFieldLine`과 `TextFieldLineField`를 추가합니다   |                                       | [TextFieldLine](https://design.university.neordinary.com/components/forms/text-field-line/) · [TextFieldLineField](https://design.university.neordinary.com/components/forms/text-field-line-field/) · [Select](https://design.university.neordinary.com/components/forms/select/) |

**화면 변화**

| 대상 | 변경사항                                                                                                                                        | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 피그마 `Button`의 Fill 스타일 비활성 색이 바뀐 것에 맞춰 `variant="fill"`의 비활성 색이 바뀝니다                                                |                                       | [Button](https://design.university.neordinary.com/components/actions/button/)                                                                                                       |
|      | 피그마 `Form/Question`의 Read Only 모드에서 글자 수가 빠진 것에 맞춰 `TextArea`가 `readOnly`이면 `maxLength`가 있어도 글자 수를 그리지 않습니다 |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/) · [FormQuestion](https://design.university.neordinary.com/components/questionnaire/form-question/) |

전문과 대응표: [react](packages/react/CHANGELOG.md#080-2026-10-25)

</details>

<details>
<summary><b>0.7.0</b> · 2026-10-24 · 깨지는 변경 2 · 새 기능 11 · 화면 변화 6</summary>

**깨지는 변경**

| 대상 | 변경사항                                                                                                                             | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 피그마 `Help Text`의 `Type=Primary`가 `Type=Success`가 되어 `Field`의 `captionColor="primary"`도 `captionColor="success"`로 바꿉니다 |                                       | [Field](https://design.university.neordinary.com/components/forms/field/) · [TextFieldArea](https://design.university.neordinary.com/components/forms/text-field-area/) · [TextArea](https://design.university.neordinary.com/components/forms/text-area/) · [Select](https://design.university.neordinary.com/components/forms/select/) · 외 3 |
|      | 피그마에 14px 캡션 `Caption/1-Regular`가 생기면서 기존 캡션 스타일의 번호가 한 칸씩 밀렸고, 토큰 이름도 피그마 이름을 따릅니다       |                                       |                                                                                                                                                                                                                                                                                                                                                 |

**새 기능**

| 대상 | 변경사항                                                                 | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | `Calendar`와 `CalendarScheduleCard`를 추가합니다                         |                                       | [Calendar](https://design.university.neordinary.com/components/calendar/calendar/) · [CalendarScheduleCard](https://design.university.neordinary.com/components/calendar/calendar-schedule-card/)                                                                                                                                               |
|      | `Chip`에 `size="lg"`를 추가합니다                                        |                                       | [Chip](https://design.university.neordinary.com/components/selection/chip/)                                                                                                                                                                                                                                                                     |
|      | `Field`에 도움말 크기 `captionSize`(`"md"`, `"lg"`)를 더합니다           |                                       | [Field](https://design.university.neordinary.com/components/forms/field/) · [TextFieldArea](https://design.university.neordinary.com/components/forms/text-field-area/) · [TextArea](https://design.university.neordinary.com/components/forms/text-area/) · [Select](https://design.university.neordinary.com/components/forms/select/) · 외 3 |
|      | `FormAttachmentField`에 `invalid`와 `errorMessage`를 추가합니다          |                                       | [FormAttachmentField](https://design.university.neordinary.com/components/questionnaire/form-attachment-field/) · [TextArea](https://design.university.neordinary.com/components/forms/text-area/)                                                                                                                                              |
|      | `FormQuestionEditor`에 `dragPlaceholder`를 더합니다                      |                                       | [FormQuestionEditor](https://design.university.neordinary.com/components/questionnaire/form-question-editor/)                                                                                                                                                                                                                                   |
|      | `FormQuestionEditor`에 `dragging`을 더합니다                             |                                       | [FormQuestionEditor](https://design.university.neordinary.com/components/questionnaire/form-question-editor/)                                                                                                                                                                                                                                   |
|      | 질문지 그룹에 `FormSectionEmpty`를 더합니다                              |                                       |                                                                                                                                                                                                                                                                                                                                                 |
|      | `IconButton`에 `size="sm"`을 추가합니다                                  |                                       | [IconButton](https://design.university.neordinary.com/components/actions/icon-button/)                                                                                                                                                                                                                                                          |
|      | `Panel`에 머리 슬롯 `headSlot`과 닫기 버튼 `PanelCloseButton`을 더합니다 |                                       | [Panel](https://design.university.neordinary.com/components/overlay/panel/)                                                                                                                                                                                                                                                                     |
|      | `StatusTag`에 `color="success"`를 더합니다                               |                                       | [StatusTag](https://design.university.neordinary.com/components/display/tag/)                                                                                                                                                                                                                                                                   |
|      | `UmcSymbolLogo`를 추가합니다                                             |                                       |                                                                                                                                                                                                                                                                                                                                                 |

**화면 변화**

| 대상 | 변경사항                                                                                                                                                           | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 피그마 `Chart/Tooltip`이 3기 색과 글자 스타일로 바뀐 것에 맞춰 `ChartTooltip`이 바뀝니다                                                                           |                                       | [ChartTooltip](https://design.university.neordinary.com/components/chart/chart-tooltip/) · [CategoryGroupChart](https://design.university.neordinary.com/components/chart/category-group-chart/) · [RankedBarChart](https://design.university.neordinary.com/components/chart/ranked-bar-chart/)                                                |
|      | 피그마 `Check Box Option Item`의 편집 모드가 보기 글과 닫기 아이콘을 줄 양 끝으로 벌린 것에 맞춰 `FormChoiceListEditor`의 삭제 버튼이 줄 오른쪽 끝으로 옮겨 갑니다 |                                       | [FormChoiceListEditor](https://design.university.neordinary.com/components/questionnaire/form-choice-list-editor/)                                                                                                                                                                                                                              |
|      | 피그마 `Help Text`가 텍스트 스타일 `Caption/2-Regular`에 연결된 것에 맞춰 도움말과 오류 메시지의 행간이 바뀝니다                                                   |                                       | [Field](https://design.university.neordinary.com/components/forms/field/) · [TextFieldArea](https://design.university.neordinary.com/components/forms/text-field-area/) · [TextArea](https://design.university.neordinary.com/components/forms/text-area/) · [Select](https://design.university.neordinary.com/components/forms/select/) · 외 4 |
|      | 피그마 `Tag/Status`가 점과 간격을 줄인 것에 맞춰 `StatusTag`가 바뀝니다                                                                                            |                                       | [StatusTag](https://design.university.neordinary.com/components/display/tag/)                                                                                                                                                                                                                                                                   |
|      | 피그마 `Text Area`에 생긴 오류 변형(`Error=True`)에 맞춰 `TextArea`의 오류 모양이 바뀝니다                                                                         |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/)                                                                                                                                                                                                                                                                |
|      | 피그마 `Text Info Button`의 글자가 커지고 굵어진 것에 맞춰 `TextInfoButton`도 바뀝니다                                                                             |                                       | [TextInfoButton](https://design.university.neordinary.com/components/actions/text-info-button/)                                                                                                                                                                                                                                                 |

전문과 대응표: [react](packages/react/CHANGELOG.md#070-2026-10-24) · [icons](packages/icons/CHANGELOG.md#070-2026-10-24) · [design-tokens](packages/design-tokens/CHANGELOG.md#070-2026-10-24)

</details>

<details>
<summary><b>0.6.0</b> · 2026-10-20 · 깨지는 변경 1 · 새 기능 23 · 화면 변화 2 · 수정 1</summary>

**깨지는 변경**

| 대상 | 변경사항                                                 | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                         |
| ---- | -------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------- |
|      | `SideNavigation`이 216px 고정 폭 대신 부모 폭을 채웁니다 |                                       | [SideNavigation](https://design.university.neordinary.com/components/shell/side-navigation/) |

**새 기능**

| 대상 | 변경사항                                                                                     | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                             |
| ---- | -------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | `Button`에 아이콘만 있는 버튼을 더합니다                                                     |                                       | [Button](https://design.university.neordinary.com/components/actions/button/)                                                                                                                                                                                                    |
|      | `CategoryGroupChart`를 더합니다                                                              |                                       | [CategoryGroupChart](https://design.university.neordinary.com/components/chart/category-group-chart/) · [ChartTooltip](https://design.university.neordinary.com/components/chart/chart-tooltip/)                                                                                 |
|      | 새 문서 그룹 "차트"에 `ChartLegend`를 더합니다                                               |                                       | [ChartLegend](https://design.university.neordinary.com/components/chart/chart-legend/)                                                                                                                                                                                           |
|      | `ChartTooltip`을 더합니다                                                                    |                                       | [ChartTooltip](https://design.university.neordinary.com/components/chart/chart-tooltip/)                                                                                                                                                                                         |
|      | `Checkbox`에 `readOnly`를 더합니다                                                           |                                       | [Checkbox](https://design.university.neordinary.com/components/selection/checkbox/)                                                                                                                                                                                              |
|      | `ColumnChart`를 더합니다                                                                     |                                       | [ColumnChart](https://design.university.neordinary.com/components/chart/column-chart/)                                                                                                                                                                                           |
|      | `DateNavigator`를 더합니다                                                                   |                                       | [DateNavigator](https://design.university.neordinary.com/components/chart/date-navigator/)                                                                                                                                                                                       |
|      | 피그마 `Floating Action Button`을 옮긴 `FloatingActionButton`을 더합니다                     |                                       | [FloatingActionButton](https://design.university.neordinary.com/components/actions/floating-action-button/)                                                                                                                                                                      |
|      | 질문지에서 링크나 파일을 붙이는 `FormAttachmentField`를 더합니다                             |                                       | [FormAttachmentField](https://design.university.neordinary.com/components/questionnaire/form-attachment-field/)                                                                                                                                                                  |
|      | 선택 질문의 보기를 편집하는 `FormChoiceListEditor`를 더합니다                                |                                       | [FormChoiceListEditor](https://design.university.neordinary.com/components/questionnaire/form-choice-list-editor/)                                                                                                                                                               |
|      | 질문지에서 보기를 고르는 `FormChoiceList`를 더합니다                                         |                                       | [FormChoiceList](https://design.university.neordinary.com/components/questionnaire/form-choice-list/)                                                                                                                                                                            |
|      | 질문지 편집 화면의 `FormQuestionEditor`와 `FormEditableQuestion`을 더합니다                  |                                       | [FormQuestionEditor](https://design.university.neordinary.com/components/questionnaire/form-question-editor/)                                                                                                                                                                    |
|      | 질문지 편집 화면에서 질문을 더하는 `FormQuestionToolbar`와 `FormQuestionTypeList`를 더합니다 |                                       | [FormQuestionToolbar](https://design.university.neordinary.com/components/questionnaire/form-question-toolbar/)                                                                                                                                                                  |
|      | 새 문서 그룹 "질문지"에 `FormQuestion`과 `FormTextAnswer`를 더합니다                         |                                       | [FormQuestion](https://design.university.neordinary.com/components/questionnaire/form-question/) · [SectionHeader](https://design.university.neordinary.com/components/shell/section-header/) · [TextArea](https://design.university.neordinary.com/components/forms/text-area/) |
|      | 질문을 묶는 `FormSection`을 더합니다                                                         |                                       | [FormSection](https://design.university.neordinary.com/components/questionnaire/form-section/)                                                                                                                                                                                   |
|      | `IconButton`을 더합니다                                                                      |                                       | [IconButton](https://design.university.neordinary.com/components/actions/icon-button/)                                                                                                                                                                                           |
|      | `ImageThumbnailEditor`를 더합니다                                                            |                                       | [ImageThumbnailEditor](https://design.university.neordinary.com/components/forms/image-thumbnail-editor/)                                                                                                                                                                        |
|      | `ImageThumbnail`을 더합니다                                                                  |                                       | [ImageThumbnail](https://design.university.neordinary.com/components/display/image-thumbnail/)                                                                                                                                                                                   |
|      | `Pagination`을 더합니다                                                                      |                                       | [Pagination](https://design.university.neordinary.com/components/actions/pagination/)                                                                                                                                                                                            |
|      | `ProgressSummary`를 더합니다                                                                 |                                       | [ProgressSummary](https://design.university.neordinary.com/components/display/progress-summary/)                                                                                                                                                                                 |
|      | `RankedBarChart`를 더합니다                                                                  |                                       | [RankedBarChart](https://design.university.neordinary.com/components/chart/ranked-bar-chart/)                                                                                                                                                                                    |
|      | `SectionHeader`를 더합니다                                                                   |                                       | [SectionHeader](https://design.university.neordinary.com/components/shell/section-header/)                                                                                                                                                                                       |
|      | 아이콘 `TextLineIcon`을 더합니다                                                             |                                       |                                                                                                                                                                                                                                                                                  |

**화면 변화**

| 대상 | 변경사항                                                                                             | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
|      | `white` 버튼의 아이콘 색을 피그마에 맞춥니다                                                         |                                       |                                                                                  |
|      | 피그마 `Text Area`가 최소 높이를 빼고 Disabled 변형에 글자 수를 더한 것에 맞춰 `TextArea`가 바뀝니다 |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/) |

**수정**

| 대상 | 변경사항                                                                       | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기 |
| ---- | ------------------------------------------------------------------------------ | ------------------------------------- | ---- |
|      | 읽기 전용(`readOnly`) `TextArea`에 마우스를 올려도 테두리 색이 바뀌지 않습니다 |                                       |      |

전문과 대응표: [react](packages/react/CHANGELOG.md#060-2026-10-20) · [icons](packages/icons/CHANGELOG.md#060-2026-10-20)

</details>

<details>
<summary><b>0.5.0</b> · 2026-10-18 · 새 기능 3 · 화면 변화 1</summary>

**새 기능**

| 대상 | 변경사항                                     | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                             |
| ---- | -------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ |
|      | `Divider`를 더합니다                         |                                       | [Divider](https://design.university.neordinary.com/components/display/divider/)                  |
|      | `GuidanceMessage`를 더합니다                 |                                       | [GuidanceMessage](https://design.university.neordinary.com/components/display/guidance-message/) |
|      | 픽토그램 `BlankDocumentPictogram`을 더합니다 |                                       |                                                                                                  |

**화면 변화**

| 대상 | 변경사항                                                                                       | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                             |
| ---- | ---------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
|      | `TextArea`의 기본 최소 높이를 198px에서 120px로 줄이고, 오른쪽 여백을 12px에서 16px로 바꿉니다 |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/) |

전문과 대응표: [react](packages/react/CHANGELOG.md#050-2026-10-18) · [icons](packages/icons/CHANGELOG.md#050-2026-10-18)

</details>

<details>
<summary><b>0.4.0</b> · 2026-10-17 · 깨지는 변경 1 · 새 기능 1 · 화면 변화 2 · 수정 1</summary>

**깨지는 변경**

| 대상 | 변경사항                                                                                                       | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      | 피그마 `Text Field/ Input Box`의 `Type=Text Area`를 옮긴 단문형 `TextArea`의 이름을 `TextFieldArea`로 바꿉니다 |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/) · [TextFieldArea](https://design.university.neordinary.com/components/forms/text-field-area/) |

**새 기능**

| 대상 | 변경사항                     | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                             |
| ---- | ---------------------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
|      | 장문형 `TextArea`를 더합니다 |                                       | [TextArea](https://design.university.neordinary.com/components/forms/text-area/) |

**화면 변화**

| 대상 | 변경사항                                                                                                            | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
|      | `AppDialog` Confirm 타입(`cancelLabel` 없음)의 확인 텍스트 버튼에 좌우 8px, 상하 4px 여백을 더합니다                |                                       | [AppDialog](https://design.university.neordinary.com/components/overlay/app-dialog/) |
|      | `Toast` 본문 글자의 자간을 `-0.02em`(16px에서 -0.32px)에서 `Label/3-Medium` 토큰 값 `-0.03em`(-0.48px)으로 바꿉니다 |                                       | [Toast](https://design.university.neordinary.com/components/overlay/toast/)          |

**수정**

| 대상 | 변경사항                                                                                       | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기 |
| ---- | ---------------------------------------------------------------------------------------------- | ------------------------------------- | ---- |
|      | `@umc-product/icons` 패키지의 `LICENSE`에 Ionicons의 저작권 표시와 MIT License 고지를 더합니다 |                                       |      |

전문과 대응표: [react](packages/react/CHANGELOG.md#040-2026-10-17) · [icons](packages/icons/CHANGELOG.md#040-2026-10-17)

</details>

<details>
<summary><b>0.3.0</b> · 2026-10-15 · 깨지는 변경 1 · 새 기능 2 · 화면 변화 4</summary>

**깨지는 변경**

| 대상 | 변경사항                                      | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                 |
| ---- | --------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 앱용 `Dialog`의 이름을 `AppDialog`로 바꿉니다 |                                       | [Dialog](https://design.university.neordinary.com/components/overlay/dialog/) · [AppDialog](https://design.university.neordinary.com/components/overlay/app-dialog/) |

**새 기능**

| 대상 | 변경사항                      | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                   |
| ---- | ----------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | 웹 화면용 `Dialog`를 더합니다 |                                       | [Dialog](https://design.university.neordinary.com/components/overlay/dialog/) · [AppDialog](https://design.university.neordinary.com/components/overlay/app-dialog/)   |
|      | 웹 화면용 `Panel`을 더합니다  |                                       | [Panel](https://design.university.neordinary.com/components/overlay/panel/) · [BottomSheet](https://design.university.neordinary.com/components/overlay/bottom-sheet/) |

**화면 변화**

| 대상 | 변경사항                                                                                   | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      | `BottomSheetActions`를 피그마 Button Area 값에 맞춥니다                                    |                                       |                                                                                                                                                                                                                                                                                                                                                      |
|      | `Checkbox`가 라벨 높이를 따라 늘어나고 상자를 라벨의 세로 가운데에 맞춥니다                |                                       | [Checkbox](https://design.university.neordinary.com/components/selection/checkbox/)                                                                                                                                                                                                                                                                  |
|      | 모달 안에서 연 목록과 툴팁이 모달 뒤에 깔리던 문제를 고칩니다                              |                                       | [Panel](https://design.university.neordinary.com/components/overlay/panel/) · [Dialog](https://design.university.neordinary.com/components/overlay/dialog/) · [AppDialog](https://design.university.neordinary.com/components/overlay/app-dialog/) · [BottomSheet](https://design.university.neordinary.com/components/overlay/bottom-sheet/) · 외 4 |
|      | `ResetIcon`의 화살표가 시계 방향에서 시계 반대 방향으로 바뀝니다(Thin, Regular, Fill 모두) |                                       |                                                                                                                                                                                                                                                                                                                                                      |

전문과 대응표: [react](packages/react/CHANGELOG.md#030-2026-10-15) · [icons](packages/icons/CHANGELOG.md#030-2026-10-15)

</details>

<details>
<summary><b>0.2.0</b> · 2026-10-13 · 새 기능 1 · 화면 변화 2</summary>

**새 기능**

| 대상 | 변경사항              | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                              |
| ---- | --------------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
|      | `Skeleton`을 더합니다 |                                       | [Skeleton](https://design.university.neordinary.com/components/display/skeleton/) |

**화면 변화**

| 대상 | 변경사항                                                                                                                                                    | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                 |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
|      | `Menu` 목록이 피그마 완성형 `Meue List` 모양으로 바뀝니다                                                                                                   |                                       | [Menu](https://design.university.neordinary.com/components/forms/menu/)                              |
|      | `SegmentedControl`에서 선택하지 않은 항목의 글자색이 브랜드 청록(`text-brand-default-600`, `#02746c`)에서 `text-neutral-strong-800`(`#282a2a`)으로 바뀝니다 |                                       | [SegmentedControl](https://design.university.neordinary.com/components/selection/segmented-control/) |

전문과 대응표: [react](packages/react/CHANGELOG.md#020-2026-10-13)

</details>

<details>
<summary><b>0.1.1</b> · 2026-10-13 · 화면 변화 1 · 수정 3</summary>

**화면 변화**

| 대상 | 변경사항                                                 | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                        |
| ---- | -------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
|      | `BottomNavigationItem`이 하위 경로에서도 탭을 선택합니다 |                                       | [Header](https://design.university.neordinary.com/components/shell/header/) |

**수정**

| 대상 | 변경사항                                                                          | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기                                                                                                    |
| ---- | --------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
|      | `BottomSheet`가 Base UI `Drawer.Viewport` 안에 시트를 그립니다                    |                                       | [BottomSheet](https://design.university.neordinary.com/components/overlay/bottom-sheet/)                |
|      | 단일 선택 `OptionButtonGroup`이 `value={null}`을 "선택 없음" 제어 상태로 다룹니다 |                                       | [OptionButtonGroup](https://design.university.neordinary.com/components/selection/option-button-group/) |
|      | `useToast()`가 `ToastProvider`마다 고정된 객체를 돌려줍니다                       |                                       |                                                                                                         |

전문과 대응표: [react](packages/react/CHANGELOG.md#011-2026-10-13)

</details>

<details>
<summary><b>0.1.0</b> · 2026-10-12 · 새 기능 1</summary>

**새 기능**

| 대상 | 변경사항      | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기 |
| ---- | ------------- | ------------------------------------- | ---- |
|      | 첫 배포입니다 |                                       |      |

전문과 대응표: [react](packages/react/CHANGELOG.md#010-2026-10-12) · [icons](packages/icons/CHANGELOG.md#010-2026-10-12) · [design-tokens](packages/design-tokens/CHANGELOG.md#010-2026-10-12)

</details>

<!-- releases:end -->

## 개발

이 저장소를 고치려면 Node 22.12 이상과 pnpm 10(corepack)이 필요합니다.

```bash
corepack enable
pnpm install
pnpm build:packages
pnpm docs:dev
```

검사 명령, 컴포넌트 추가 규칙, 토큰 갱신, 배포 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)에 있습니다. PR은 develop으로 보내고, develop을 main에 병합하면 패키지와 문서가 배포됩니다.

## 라이선스

UMC PRODUCT Design Chapter가 소유하고 관리합니다. UMC-PRODUCT 조직이나 Design Chapter가 승인한 팀의 구성원이 UMC PRODUCT 프로젝트에서만 쓸 수 있습니다. 저장소를 공개한 것은 열람을 위해서이며 사용 허락이 아닙니다. 기여자는 자신의 기여물에 대한 권리를 그대로 가지며, 공개된 자기 기여를 포트폴리오에 쓸 수 있습니다. 자세한 조건은 [LICENSE](LICENSE)에 있습니다. 서체 Pretendard와 Orbitron은 SIL Open Font License 1.1을 따릅니다.
