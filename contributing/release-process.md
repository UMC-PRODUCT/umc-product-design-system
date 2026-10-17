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
- bump는 [버전 정책](https://umc-product.github.io/umc-product-design-system/releases/versioning/)을 따릅니다. 0.x에서는 깨지는 변경이 minor, 나머지가 patch입니다.
- 요약은 앱 개발자가 읽는 문장으로 씁니다. 무엇이 바뀌었고 앱이 무엇을 해야 하는지 적습니다.
- 깨지는 변경에는 옛 이름과 새 이름의 대응표를, 값만 바뀌는 변경에는 **화면 변화**와 전후 값을 적습니다.

명령이 `.changeset/` 아래에 파일을 만듭니다. 이 파일을 PR에 함께 커밋합니다. 값만 바뀌는 patch라면 예를 들어 이렇게 씁니다.

```md
---
"@umc-product/react": patch
---

**화면 변화** Checkbox 테두리 색을 피그마 값으로 맞췄습니다(`#c4c8c8` → `#b1b6b6`).
```

## 2. 버전 PR 병합하기

develop에 changeset이 쌓이면 Version 워크플로가 "chore: 패키지 버전 올리기" PR을 열고, 다음 push마다 갱신합니다. 이 PR은 changeset 파일을 지우고, 버전 번호를 올리고, `CHANGELOG.md`에 내용을 옮깁니다. 배포할 때가 되면 이 PR을 develop에 병합합니다.

- 이 PR은 GitHub Actions 토큰으로 만들어져 CI가 돌지 않습니다. 검사 결과가 필요하면 PR을 닫았다가 다시 열어 CI를 돌립니다.
- 저장소 설정에서 Actions의 PR 생성이 꺼져 있으면 Version 워크플로가 실패합니다. 그때는 로컬에서 같은 일을 하고 PR을 직접 엽니다.

```bash
git switch develop && git pull
git switch -c chore/version-packages
pnpm version-packages
git add .changeset packages
git commit -m "chore: 패키지 버전 올리기"
```

## 3. develop을 main에 병합하기

develop → main PR을 열고 병합합니다. 병합하면 GitHub Actions 워크플로 두 개와 Amplify 빌드가 돌아갑니다.

- **Release**: 패키지를 빌드하고 배포물을 검사한 뒤, 레지스트리에 없는 버전만 GitHub Packages에 올립니다. `@umc-product/react@0.1.1` 같은 git 태그를 만들어 push합니다.
- **Docs**: 문서를 빌드하고 링크를 검사한 뒤 GitHub Pages에 올립니다.
- **Amplify**: GitHub Actions와 따로 Amplify가 main push를 받아 문서와 Storybook을 빌드하고 배포합니다. 설정은 [AWS Amplify 배포](#aws-amplify-배포전환-중)에 있습니다.

문서는 main에 병합할 때마다 배포됩니다. 새 기능의 문서가 develop에 들어 있다면 버전 PR을 먼저 병합합니다. 그래야 문서와 배포된 패키지가 어긋나지 않습니다.

## 4. 배포 확인하기

- Actions 탭에서 Release와 Docs가 성공했는지 봅니다.
- Amplify 콘솔에서 main 빌드가 성공했는지 봅니다.
- 조직의 Packages 탭에서 세 패키지에 새 버전이 있는지 봅니다.
- 토큰을 설정한 컴퓨터에서 `pnpm view @umc-product/react version`으로 새 버전이 나오는지 확인합니다.

## 되돌리기

| 상황                         | 할 일                                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release가 실패했다           | 권한이나 저장소 설정 문제면 고친 뒤 Re-run합니다. 코드나 워크플로를 고쳐야 하면 고친 커밋을 main에 병합하거나 Actions 탭에서 Release를 수동 실행합니다. Re-run은 실패한 커밋의 워크플로를 그대로 다시 돌립니다 |
| 세 패키지 중 일부만 올라갔다 | 위와 같이 다시 실행합니다. 이미 올라간 버전은 건너뛰고 남은 패키지만 올라갑니다. 먼저 올라간 패키지의 태그는 실패한 실행에서도 push됩니다                                                                      |
| 잘못된 버전이 올라갔다       | 고친 내용을 다음 patch로 배포합니다. 앱이 이미 받았을 수 있으니 같은 번호를 다시 쓰지 않습니다                                                                                                                 |
| 잘못된 버전을 막아야 한다    | 고친 버전을 먼저 배포한 뒤, 패키지 페이지의 버전 목록에서 그 버전을 지웁니다. 지운 버전은 30일 안에 되살릴 수 있습니다                                                                                         |
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

Amplify 앱 하나가 문서와 Storybook을 함께 배포합니다.

| 사이트    | 주소                                                             |
| --------- | ---------------------------------------------------------------- |
| 문서      | `https://www.university.neordinary.com/design-system/`           |
| Storybook | `https://www.university.neordinary.com/design-system/storybook/` |

Amplify의 사용자 지정 도메인은 앱 하나에만 붙습니다. 앱 두 개를 한 도메인의 두 경로로 나누려면 앱 사이에 프록시가 필요한데, AWS re:Post에는 Amplify 앱 사이의 rewrite를 지원하지 않는다는 답변이 있습니다. 그래서 Storybook을 별도 앱으로 두지 않고 문서 앱이 함께 빌드합니다.

저장소 루트의 `amplify.yml`은 Node 22에 pnpm 10.28.0을 설치하고 `pnpm install --frozen-lockfile` 뒤 문서 앱의 `build:amplify`(`apps/docs/scripts/build-amplify.mjs`)를 돌립니다. 루트 `package.json`의 `packageManager`를 올리면 `amplify.yml`의 pnpm 버전도 같이 올립니다.

`build:amplify`는 아래 순서로 결과물을 만듭니다.

1. 문서를 빌드하고 내부 링크를 검사합니다. 깨진 링크가 있으면 여기서 멈춥니다.
2. Storybook을 빌드합니다. Storybook 빌드가 깨지면 문서도 배포하지 않습니다.
3. 문서 결과물은 `apps/docs/amplify-dist/<기준 경로>/`에, Storybook 결과물은 `apps/docs/amplify-dist/<기준 경로>/storybook/`에 모읍니다. Amplify는 `amplify-dist`를 그대로 올립니다.

두 사이트가 서로를 가리키는 주소(`PUBLIC_STORYBOOK_URL`, `STORYBOOK_DOCS_URL`)는 `build:amplify`가 `DOCS_SITE_URL`과 `DOCS_BASE_PATH`로 만듭니다. 로컬에서 같은 결과물을 만들려면 두 변수를 넣고 돌립니다.

```bash
DOCS_SITE_URL=https://www.university.neordinary.com DOCS_BASE_PATH=/design-system pnpm --filter @umc-product/docs build:amplify
```

### 콘솔 설정

1. Amplify 콘솔에서 새 앱을 만들고 GitHub의 `UMC-PRODUCT/umc-product-design-system` 저장소와 `main` 브랜치를 고릅니다. 처음 연결할 때 조직에 AWS Amplify GitHub 앱을 설치하고 이 저장소 접근을 허락해야 합니다.
2. "My app is a monorepo"를 켜고 앱 루트에 `apps/docs`를 적습니다. 콘솔이 `AMPLIFY_MONOREPO_APP_ROOT` 환경 변수를 같은 값으로 넣습니다. 이 값은 `amplify.yml`의 `appRoot`와 같아야 합니다.
3. 빌드 설정은 저장소의 `amplify.yml`을 그대로 씁니다. 저장소에 `amplify.yml`이 있으면 콘솔의 빌드 설정보다 우선합니다.
4. 환경 변수 두 개를 넣고 배포합니다. 하나라도 없으면 `build:amplify`가 처음에 멈춥니다.

   | 변수             | 값                                      |
   | ---------------- | --------------------------------------- |
   | `DOCS_BASE_PATH` | `/design-system`                        |
   | `DOCS_SITE_URL`  | `https://www.university.neordinary.com` |

5. Hosting → Custom domains에서 `www.university.neordinary.com`을 연결합니다.
6. Hosting → Rewrites and redirects → Manage redirects의 JSON 편집기를 아래 규칙으로 바꿉니다. 이 규칙은 `amplify.yml`로 정할 수 없습니다.

   ```json
   [
     {
       "source": "/",
       "status": "302",
       "target": "/design-system/",
       "condition": null
     },
     {
       "source": "/<*>",
       "status": "404",
       "target": "/design-system/404.html",
       "condition": null
     }
   ]
   ```

   - 첫 규칙은 도메인 루트를 문서로 보냅니다. 나중에 도메인 루트를 다른 서비스가 쓰면 브라우저에 남은 영구 이동(301)이 방해하므로 임시 이동(302)으로 둡니다.
   - 둘째 규칙은 없는 주소에 문서의 404 페이지를 404 상태로 보여 줍니다.

기준 경로를 바꿀 때는 `DOCS_BASE_PATH`와 위 JSON의 `/design-system`을 함께 고칩니다. 환경 변수 없이 빌드하는 `pnpm docs:build`와 `docs.yml`은 GitHub Pages 경로(`/umc-product-design-system`)를 그대로 씁니다.

도메인 루트를 다른 서비스가 쓰게 되면 앱 두 개가 한 도메인을 경로로 나눠 써야 합니다. 이 경우 앞단에 CloudFront를 두고 `/design-system/*`만 이 앱의 기본 주소(`https://main.<앱 ID>.amplifyapp.com`)로 보냅니다. 이 앱은 기본 주소에서도 `/design-system/` 아래로 서빙하므로 경로를 바꾸지 않고 넘깁니다.
