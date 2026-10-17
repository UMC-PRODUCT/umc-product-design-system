# UMC 디자인 시스템

UMC PRODUCT Design Chapter의 디자인 토큰, 아이콘, React 컴포넌트입니다. 피그마 디자인 시스템을 코드로 옮겼고, 다른 저장소에서 패키지로 설치해 씁니다.

- 문서: https://umc-product.github.io/umc-product-design-system/
- 변경 기록과 버전 정책: 문서의 "릴리스" 메뉴

## 패키지

| 패키지                       | 내용                                                            |
| ---------------------------- | --------------------------------------------------------------- |
| `@umc-product/design-tokens` | 컬러, 텍스트 스타일, 그림자, 그리드 토큰. CSS 변수, Tailwind v4 |
| `@umc-product/icons`         | 아이콘 65종, 픽토그램 11종, UMC 로고 React 컴포넌트             |
| `@umc-product/react`         | Base UI 기반 컴포넌트 52종과 미리 빌드한 CSS                    |

세 패키지는 항상 같은 버전으로 함께 배포합니다.

## 설치

GitHub Packages에 비공개로 배포합니다. 설치하려면 `read:packages` 권한이 있는 GitHub 토큰이 필요합니다. 로컬, GitHub Actions, AWS Amplify에서 토큰을 설정하는 방법은 문서의 [설치와 불러오기](https://umc-product.github.io/umc-product-design-system/getting-started/installation/)에 있습니다.

```ini
# 앱 저장소의 .npmrc
@umc-product:registry=https://npm.pkg.github.com
```

```bash
pnpm add @umc-product/react @umc-product/icons @umc-product/design-tokens
```

```css
@import "tailwindcss";
@import "@umc-product/react/styles.css";
@import "@umc-product/design-tokens/tailwind.css";
```

React 19가 필요하고 ESM으로만 배포합니다.

## 개발

Node 22.12 이상과 pnpm 10(corepack)을 씁니다.

```bash
corepack enable
pnpm install
pnpm build:packages
pnpm docs:dev
```

문서 개발 서버는 http://localhost:5174/umc-product-design-system/ 에 뜹니다. 패키지 코드를 고치면 `pnpm build:packages`를 다시 돌려야 문서에 반영됩니다.

| 명령                              | 하는 일                                         |
| --------------------------------- | ----------------------------------------------- |
| `pnpm test`                       | 세 패키지 테스트                                |
| `pnpm typecheck`                  | 패키지와 문서 타입 검사                         |
| `pnpm tokens:check`               | 피그마 원문과 토큰 생성물이 같은지 확인         |
| `pnpm icons:check`                | 아이콘 원문과 생성물이 같은지 확인              |
| `pnpm lint:package`               | 배포할 tarball 검사(publint, attw)              |
| `node scripts/smoke-consumer.mjs` | 새 Vite 앱에 설치해 타입 검사와 빌드            |
| `pnpm docs:build`                 | 문서 빌드(`docs:variants`, `docs:links`로 검사) |
| `pnpm changeset`                  | 배포할 변경 기록 작성                           |

로컬 개발, 컴포넌트 추가 규칙, 토큰 갱신, 배포 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)에 있습니다. PR은 develop으로 보내고, develop을 main에 병합하면 패키지와 문서가 자동으로 배포됩니다.

## 라이선스

UMC PRODUCT Design Chapter가 소유하고 관리합니다. UMC-PRODUCT 조직이나 Design Chapter가 승인한 팀의 구성원이 UMC PRODUCT 프로젝트에서만 쓸 수 있습니다. 저장소를 공개한 것은 열람을 위해서이며 사용 허락이 아닙니다. 기여자는 자신의 기여물에 대한 권리를 그대로 가지며, 공개된 자기 기여를 포트폴리오에 쓸 수 있습니다. 자세한 조건은 [LICENSE](LICENSE)에 있습니다. 서체 Pretendard와 Orbitron은 SIL Open Font License 1.1을 따릅니다.
