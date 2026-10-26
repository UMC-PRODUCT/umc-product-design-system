# Changesets

패키지에 영향을 주는 변경은 PR마다 changeset 파일 하나를 함께 올립니다. `pnpm changeset`을 실행하면 바뀐 패키지와 버전 단계(patch, minor)를 묻고 이 폴더에 파일을 만듭니다.

세 패키지(`@umc-product/design-tokens`, `@umc-product/icons`, `@umc-product/react`)는 항상 같은 버전으로 함께 올라갑니다. 어떤 변경이 minor이고 어떤 변경이 patch인지는 문서 사이트의 "버전 정책"을 따릅니다.

요약의 첫 문장은 `대상: 변경사항 (변경 전 → 변경 후).` 꼴로 화면을 쓰는 사람이 읽을 말로 씁니다(예: `입력 상자의 오류 상태(Text Field/Box): 분홍 배경이 옅어집니다 (Red-50 → Red-50 30%).`). README의 릴리스 절과 GitHub Release는 이 첫 문장을 표로 그립니다. 바뀐 이름, 전후 값의 코드, 대응표는 둘째 문장부터 씁니다.

배포 순서는 문서 사이트의 "배포 절차"에 있습니다.
