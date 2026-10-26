# 배포 절차

changeset 작성부터 GitHub Packages, GitHub Pages, AWS Amplify 배포, 문제가 생겼을 때 되돌리는 방법까지의 순서입니다.

- 독자: 디자인 시스템을 배포하는 담당자
- 소유자: UMC PRODUCT Design Chapter
- 기준일: 2026-10-18

## 흐름

```
기능 PR (changeset 포함) ──▶ develop
                               │ Version 워크플로가 버전 PR을 열고 갱신한다
버전 PR 병합 ──────────────▶ develop
                               │
develop → main PR 병합 ─────▶ main
                               ├ Release: 레지스트리에 없는 버전을 GitHub Packages에 배포
                               ├ Docs: 문서를 GitHub Pages에 배포
                               └ Amplify: 문서와 Storybook을 사용자 지정 도메인에 배포(전환 중)
```

버전을 올리는 일과 배포하는 일을 나눴습니다. 버전 PR을 병합하지 않고 develop을 main에 보내면 문서만 배포되고 패키지는 그대로입니다.

## 1. 변경마다 changeset 쓰기

앱이 받는 패키지가 바뀌는 PR에는 changeset을 넣습니다.

```bash
pnpm changeset
```

- 실제로 바뀐 패키지를 고릅니다. 세 패키지는 어차피 같은 버전으로 함께 올라갑니다.
- bump는 [버전 정책](https://umc-product.github.io/umc-product-design-system/releases/versioning/)을 따릅니다. 0.x에서는 깨지는 변경과 추가(컴포넌트, prop, 토큰, 아이콘)가 minor, 수정과 피그마 값 동기화가 patch입니다.
- 요약의 첫 문장은 `대상: 변경사항 (변경 전 → 변경 후).` 꼴로, 화면을 쓰는 사람(디자이너, 운영진)이 읽을 말로 씁니다. '대상'은 화면에서 부르는 이름 뒤에 피그마 이름을 괄호로 붙이고(`입력 상자의 오류 상태(Text Field/Box)`), '변경사항'은 눈에 보이는 변화만 적고, 괄호 안 '변경 전 → 변경 후'는 값이 바뀔 때만 적습니다. prop·토큰·클래스 이름은 둘째 문장부터 씁니다. README의 릴리스 절과 GitHub Release는 이 첫 문장을 표(대상, 변경사항, 변경 전 → 변경 후, 보기)로 그리고, 전문에 백틱으로 적은 컴포넌트 이름(`CodeField` 등)은 '보기' 칸의 문서 링크가 됩니다. `CHANGELOG.md`와 문서의 변경 기록에는 전문이 실립니다.
- 둘째 문장부터는 앱 개발자가 할 일을 적습니다. 바뀐 이름, 전후 값, 올릴 때 고칠 코드입니다.
- 깨지는 변경은 요약을 **깨지는 변경**으로 시작하고 옛 이름과 새 이름의 대응표를 넣습니다. 값만 바뀌는 변경은 **화면 변화**로 시작하고 전후 값을 적습니다. README의 릴리스 절이 이 표시로 항목을 나누고, 표시가 없으면 minor는 새 기능, patch는 수정으로 묶습니다.

명령이 `.changeset/` 아래에 파일을 만듭니다. 이 파일을 PR에 함께 커밋합니다. 값만 바뀌는 patch라면 예를 들어 이렇게 씁니다.

```md
---
"@umc-product/react": patch
---

**화면 변화** 체크박스(Checkbox): 테두리가 조금 더 진한 회색이 됩니다 (`#c4c8c8` → `#b1b6b6`). 피그마 값에 맞춰 `Checkbox`의 테두리 색을 바꿨습니다.
```

## 2. 버전 PR 병합하기

develop에 changeset이 쌓이면 Version 워크플로가 "chore: 패키지 버전 올리기" PR을 열고, 다음 push마다 갱신합니다. 이 PR은 changeset 파일을 지우고, 버전 번호를 올리고, `CHANGELOG.md`에 내용을 옮깁니다. 배포할 때가 되면 이 PR을 develop에 병합합니다.

`pnpm version-packages`는 새 버전 제목에 그날 날짜(한국 시간)를 붙입니다(`## 0.6.0 (2026-10-20)`). PR이 다음 push로 갱신되면 날짜도 그날로 바뀝니다. 같은 명령이 README의 릴리스 절도 CHANGELOG에서 다시 만듭니다(`pnpm readme:build`, 항목마다 첫 문장만). README의 릴리스 절은 직접 고치지 않습니다. CHANGELOG와 다르면 CI의 `pnpm readme:check`가 실패합니다.

- 이 PR은 GitHub Actions 토큰으로 만들어져 CI가 돌지 않습니다. 검사 결과가 필요하면 PR을 닫았다가 다시 열어 CI를 돌립니다.
- 저장소 설정에서 Actions의 PR 생성이 꺼져 있으면 Version 워크플로가 실패합니다. 그때는 로컬에서 같은 일을 하고 PR을 직접 엽니다.

```bash
git switch develop && git pull
git switch -c chore/version-packages
pnpm version-packages
git add .changeset packages README.md
git commit -m "chore: 패키지 버전 올리기"
```

## 3. develop을 main에 병합하기

develop → main PR을 열고 병합합니다. 병합하면 GitHub Actions 워크플로 두 개와 Amplify 빌드가 돌아갑니다.

- **Release**: 패키지를 빌드하고 배포물을 검사한 뒤, 레지스트리에 없는 버전만 GitHub Packages에 올립니다. `@umc-product/react@0.1.1` 같은 git 태그를 만들어 push하고, react 태그에 GitHub Release를 만듭니다. Release 본문은 `scripts/release-notes.mjs`가 CHANGELOG에서 만듭니다. 위에는 종류별 표(대상, 변경사항, 변경 전 → 변경 후, 보기)를 담은 "이번 배포에서 달라지는 것", 깨지는 변경이 있으면 대응표 전문을 담은 "올릴 때 반드시 확인", 아래에는 올리는 명령을 담은 "개발자"가 있습니다. 비개발자에게 배포 내용을 알릴 때 이 Release 링크를 씁니다.
- **Docs**: 문서를 빌드하고 링크를 검사한 뒤 GitHub Pages에 올립니다.
- **Amplify**: GitHub Actions와 따로 Amplify가 main push를 받아 문서와 Storybook을 빌드하고 배포합니다. 설정은 [AWS Amplify 배포](#aws-amplify-배포전환-중)에 있습니다.

문서는 main에 병합할 때마다 배포됩니다. 새 기능의 문서가 develop에 들어 있다면 버전 PR을 먼저 병합합니다. 그래야 문서와 배포된 패키지가 어긋나지 않습니다.

## 4. 배포 확인하기

- Actions 탭에서 Release와 Docs가 성공했는지 봅니다.
- Amplify 콘솔에서 main 빌드가 성공했는지 봅니다.
- 조직의 Packages 탭에서 세 패키지에 새 버전이 있는지 봅니다.
- 토큰을 설정한 컴퓨터에서 `pnpm view @umc-product/react version`으로 새 버전이 나오는지 확인합니다.
- Releases 탭에 새 버전의 Release가 생겼는지 봅니다. 본문을 미리 보려면 `pnpm release:notes 0.8.0`처럼 버전을 넘겨 돌립니다.
- 화면 변화가 있으면 전후 캡처를 Release에 붙입니다. 문서 사이트나 로컬 프리뷰에서 바뀐 컴포넌트를 전과 후로 찍어 `gh release upload @umc-product/react@0.9.0 before.png after.png`로 올리고, `gh release view @umc-product/react@0.9.0 --json assets`가 알려 주는 주소로 캡처를 넣은 마크다운 파일을 만든 뒤 `pnpm release:notes 0.9.0 screens.md | gh release edit @umc-product/react@0.9.0 --notes-file -`로 본문을 다시 씁니다. 캡처는 "전후 화면" 절로 표와 개발자 절 사이에 들어갑니다.

## 되돌리기

| 상황                         | 할 일                                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release가 실패했다           | 권한이나 저장소 설정 문제면 고친 뒤 Re-run합니다. 코드나 워크플로를 고쳐야 하면 고친 커밋을 main에 병합하거나 Actions 탭에서 Release를 수동 실행합니다. Re-run은 실패한 커밋의 워크플로를 그대로 다시 돌립니다 |
| 세 패키지 중 일부만 올라갔다 | 위와 같이 다시 실행합니다. 이미 올라간 버전은 건너뛰고 남은 패키지만 올라갑니다. 먼저 올라간 패키지의 태그는 실패한 실행에서도 push됩니다                                                                      |
| 잘못된 버전이 올라갔다       | 고친 내용을 다음 patch로 배포합니다. 앱이 이미 받았을 수 있으니 같은 번호를 다시 쓰지 않습니다                                                                                                                 |
| 잘못된 버전을 막아야 한다    | 고친 버전을 먼저 배포한 뒤, 패키지 페이지의 버전 목록에서 그 버전을 지웁니다. 지운 버전은 30일 안에 되살릴 수 있습니다                                                                                         |
| Release가 만들어지지 않았다  | Actions 탭에서 Release 워크플로를 수동 실행합니다. 이미 올라간 패키지는 건너뛰고 Release만 만듭니다                                                                                                            |
| Docs가 실패했다              | Re-run하거나 Actions 탭에서 Docs 워크플로를 수동으로 실행합니다. 패키지 배포와는 상관없습니다                                                                                                                  |
| Amplify 빌드가 실패했다      | 콘솔에서 실패한 단계의 로그를 봅니다. 환경 변수가 빠졌다면 넣은 뒤 Redeploy this version을 누릅니다. 빌드가 실패해도 사이트는 이전 배포를 그대로 보여 줍니다                                                   |

## 권한과 설정

> [!CAUTION]
> **패키지 공개 범위를 바꾸지 마세요**
>
> GitHub Packages는 공개로 바꾼 패키지를 다시 비공개로 돌릴 수 없습니다. 패키지
> 설정의 Change visibility는 누르지 않습니다.

- **새 앱이 패키지를 설치할 때**: 세 패키지마다 Package settings → Manage Actions access에 앱 저장소를 Read 권한으로 더합니다. 앱의 GitHub Actions가 `GITHUB_TOKEN`으로 설치할 수 있게 됩니다.
- **Amplify용 공용 토큰**: 조직 공용 계정에서 `read:packages` classic 토큰을 만들고 만료일과 갱신 담당자를 정합니다.
- **npm 스코프 선점**: 앱의 `.npmrc`가 무시되면 pnpm은 `@umc-product` 패키지를 공개 npm에서 찾습니다. npm에 `umc-product` 조직을 만들어 두면 같은 이름의 다른 패키지가 설치되는 사고를 막을 수 있습니다.
- **저장소 설정**(처음 한 번)
  - Settings → General → Default branch: develop
  - Settings → Pages → Source: GitHub Actions
  - Settings → Actions → General → Workflow permissions: "Allow GitHub Actions to create and approve pull requests"를 켭니다. Version 워크플로가 버전 PR을 열 때 필요합니다.
  - Settings → Environments → github-pages → Deployment branches: main이 들어 있어야 합니다. 기본 브랜치를 develop으로 바꾸면 main 배포가 막힐 수 있습니다.

## AWS Amplify 배포(전환 중)

문서 사이트와 Storybook을 AWS Amplify로 옮기는 중입니다. Amplify 빌드가 안정적으로 도는 것을 확인할 때까지 GitHub Pages 배포는 그대로 둡니다.

폴리레포로 나뉜 웹 저장소마다 Amplify 앱을 하나씩 두고 공용 도메인 `university.neordinary.com` 아래 자기 서브도메인을 씁니다. 앱 사이에 리버스 프록시는 두지 않습니다([결정 11](./decisions.md#11-웹-앱마다-amplify-앱과-서브도메인을-따로-둔다)). 이 저장소의 앱은 문서와 Storybook을 함께 배포하고 주소는 브랜치마다 다릅니다.

| 브랜치    | 문서                                            | Storybook                                                 | 접근     |
| --------- | ----------------------------------------------- | --------------------------------------------------------- | -------- |
| `main`    | `https://design.university.neordinary.com/`     | `https://design.university.neordinary.com/storybook/`     | 공개     |
| `develop` | `https://dev.design.university.neordinary.com/` | `https://dev.design.university.neordinary.com/storybook/` | 비밀번호 |

Storybook은 별도 앱으로 두지 않고 문서 앱이 함께 빌드합니다. 그래야 두 사이트가 서로를 가리키는 주소를 한 빌드에서 정하고 Storybook 빌드가 깨졌을 때 문서 배포도 멈출 수 있습니다.

저장소 루트의 `amplify.yml`은 Node 22에 pnpm 10.28.0을 설치하고 `pnpm install --frozen-lockfile` 뒤 문서 앱의 `build:amplify`(`apps/docs/scripts/build-amplify.mjs`)를 돌립니다. 두 브랜치 모두 같은 `amplify.yml`로 빌드합니다. 루트 `package.json`의 `packageManager`를 올리면 `amplify.yml`의 pnpm 버전도 같이 올립니다.

`build:amplify`는 아래 순서로 결과물을 만듭니다.

1. 문서를 빌드하고 내부 링크를 검사합니다. 깨진 링크가 있으면 여기서 멈춥니다.
2. Storybook을 빌드합니다. Storybook 빌드가 깨지면 문서도 배포하지 않습니다.
3. 문서 결과물은 `apps/docs/amplify-dist/<기준 경로>/`에, Storybook 결과물은 그 아래 `storybook/`에 모읍니다. 기준 경로가 `/`이면 `amplify-dist/` 바로 아래입니다. Amplify는 `amplify-dist`를 그대로 올립니다.

두 사이트가 서로를 가리키는 주소(`PUBLIC_STORYBOOK_URL`, `STORYBOOK_DOCS_URL`)는 `build:amplify`가 `DOCS_SITE_URL`과 `DOCS_BASE_PATH`로 만듭니다. canonical과 사이트맵 주소도 같은 두 변수에서 나옵니다. 로컬에서 같은 결과물을 만들려면 두 변수를 넣고 돌립니다.

```bash
DOCS_SITE_URL=https://design.university.neordinary.com DOCS_BASE_PATH=/ pnpm --filter @umc-product/docs build:amplify
```

### 콘솔 설정

1. Amplify 콘솔에서 새 앱을 만들고 GitHub의 `UMC-PRODUCT/umc-product-design-system` 저장소와 `main` 브랜치를 고릅니다. 처음 연결할 때 조직에 AWS Amplify GitHub 앱을 설치하고 이 저장소 접근을 허락해야 합니다.
2. "My app is a monorepo"를 켜고 앱 루트에 `apps/docs`를 적습니다. 콘솔이 `AMPLIFY_MONOREPO_APP_ROOT` 환경 변수를 같은 값으로 넣습니다. 이 값은 `amplify.yml`의 `appRoot`와 같아야 합니다.
3. 빌드 설정은 저장소의 `amplify.yml`을 그대로 씁니다. 저장소에 `amplify.yml`이 있으면 콘솔의 빌드 설정보다 우선합니다.
4. Hosting → Environment variables에 변수 두 개를 넣습니다. 하나라도 없으면 `build:amplify`가 처음에 멈춥니다. `develop`은 `DOCS_SITE_URL`만 다르니 그 변수의 Actions → Add variable override에서 `develop` 값을 따로 정합니다.

   | 변수             | 모든 브랜치                                | `develop` 재정의                               |
   | ---------------- | ------------------------------------------ | ---------------------------------------------- |
   | `DOCS_BASE_PATH` | `/`                                        | 없음                                           |
   | `DOCS_SITE_URL`  | `https://design.university.neordinary.com` | `https://dev.design.university.neordinary.com` |

5. `main`에 이어 `develop` 브랜치도 연결합니다. 앱 루트는 `apps/docs` 그대로이며 push할 때마다 자동으로 빌드합니다.
6. Hosting → Custom domains → Add domain에 `design.university.neordinary.com`을 적고 서브도메인은 아래 둘만 남깁니다. 콘솔이 기본으로 넣는 `www`는 지웁니다.

   | 주소                                   | 브랜치    |
   | -------------------------------------- | --------- |
   | `design.university.neordinary.com`     | `main`    |
   | `dev.design.university.neordinary.com` | `develop` |

   `university.neordinary.com`은 Route 53 호스팅 영역입니다(2026-10-24 확인). 영역이 같은 AWS 계정에 있으면 Amplify가 인증서 검증 레코드와 서브도메인 레코드를 알아서 만듭니다. 콘솔이 영역을 찾지 못하면 화면에 나온 레코드(검증용 CNAME 하나, 서브도메인 CNAME 둘)를 그 영역에 손으로 넣습니다. 인증서 상태가 Available이 되면 연결이 끝납니다.

7. Hosting → Access control → Manage access에서 "Manage access for all branches"를 끄고 `develop`만 Restricted로 바꿔 사용자 이름과 비밀번호를 정합니다. `main`은 공개로 둡니다. 비밀번호는 develop의 문서와 Storybook에 함께 걸립니다.
8. Hosting → Rewrites and redirects → Manage redirects의 JSON 편집기를 아래 규칙으로 바꿉니다. 이 규칙은 `amplify.yml`로 정할 수 없고 모든 브랜치에 똑같이 적용됩니다.

   ```json
   [
     {
       "source": "/design-system/<*>",
       "status": "301",
       "target": "https://design.university.neordinary.com/<*>",
       "condition": null
     },
     {
       "source": "/<*>",
       "status": "404-200",
       "target": "/404.html",
       "condition": null
     }
   ]
   ```

   - 첫 규칙은 예전 주소(`/design-system/…`)를 새 도메인의 같은 페이지로 영구 이동시킵니다. 도메인으로 시작하는 출발지(`https://www…`)에는 경로를 붙일 수 없어서 출발지를 경로만으로 적습니다. 도메인 뒤에 경로를 붙이면 Amplify가 오류 없이 그 규칙을 무시합니다.
   - 둘째 규칙은 없는 주소에서 주소를 바꾸지 않고 문서의 404 페이지를 404 상태로 보여 줍니다. `"404-200"`은 Amplify API의 404 rewrite이고, 이름과 달리 응답 상태는 404입니다(2026-10-18 확인). AWS 가이드 예시의 `"404"`는 404 redirect라서 없는 주소를 `/404.html`로 302 이동시킵니다.

기준 경로를 바꿀 때는 `DOCS_BASE_PATH`와 위 JSON의 404 대상을 함께 고칩니다. 환경 변수 없이 빌드하는 `pnpm docs:build`와 `docs.yml`은 GitHub Pages 경로(`/umc-product-design-system`)를 그대로 씁니다.

### www에서 옮기기

이 앱은 지금까지 문서와 Storybook을 `www.university.neordinary.com`의 `/design-system/` 아래에 올렸습니다. 서비스 앱이 도메인 루트와 www를 넘겨받기 전에 아래 순서로 옮깁니다.

1. 콘솔 설정 6번대로 새 도메인을 더합니다. www 연결은 아직 남겨 둡니다.
2. 4번 환경 변수와 8번 리디렉션을 함께 바꾸고 `main`을 다시 배포합니다. 변수만 바꾸고 예전 규칙(`/` → `/design-system/`)을 남기면 루트로 들어온 요청이 이제 없는 경로로 이동해 404가 납니다. 이 기간에는 www를 새 도메인으로 보내는 임시 규칙을 8번의 첫 규칙 바로 뒤에 둡니다. 서비스 앱이 www를 넘겨받은 뒤에도 브라우저에 영구 이동이 남지 않도록 상태는 302로 합니다.

   ```json
   {
     "source": "https://www.university.neordinary.com",
     "status": "302",
     "target": "https://design.university.neordinary.com",
     "condition": null
   }
   ```

3. 5번과 7번대로 `develop`을 연결해 배포한 뒤 비밀번호 창이 뜨는지 봅니다.
4. 아래 명령으로 확인합니다. 차례로 200, 200, `https://design.university.neordinary.com/getting-started/installation/`, 401이 나와야 합니다.

   ```bash
   curl -sI https://design.university.neordinary.com/ | head -1
   curl -sI https://design.university.neordinary.com/storybook/ | head -1
   curl -sI https://www.university.neordinary.com/design-system/getting-started/installation/ | grep -i location
   curl -sI https://dev.design.university.neordinary.com/ | head -1
   ```

5. 서비스 앱이 도메인 루트와 www를 쓸 준비가 되면 이 앱의 Custom domains에서 `university.neordinary.com` 연결을 지우고 2번의 임시 규칙을 뺍니다. 그다음 서비스 앱이 `university.neordinary.com`을 연결합니다. 예전 `/design-system/` 링크를 살리려면 서비스 앱에도 8번의 첫 규칙과 같은 `/design-system/<*>` 301 규칙을 둡니다.

re:Post에는 두 앱이 루트 도메인 하나를 같은 이름의 도메인 연결로 나눠 가지려 하자 콘솔이 도메인 전체를 한 앱에 묶으려 해서 AWS CLI로만 나눌 수 있었던 사례가 있습니다. 그래서 루트 도메인은 서비스 앱만 연결합니다. 다른 앱은 이 앱처럼 자기 서브도메인만 Add domain으로 따로 연결합니다.
