"use client"

import { Button, ErrorPageContainer } from "@umc-product/react"
import type { ReactNode } from "react"

const noop = () => {}

function BackButton() {
  return (
    <Button size="lg" variant="weak" color="brand" onClick={noop}>
      이전으로 이동
    </Button>
  )
}

function HomeButton() {
  return (
    <Button size="lg" variant="fill" color="brand" onClick={noop}>
      홈으로 이동
    </Button>
  )
}

export function ErrorPageContainerPreview() {
  return (
    <div className="umc-example">
      <div
        className="docs-error-page-stage"
        data-spec-id="error-page-container error-page-container-illustration error-page-container-text error-page-container-title error-page-container-body error-page-container-actions"
      >
        <ErrorPageContainer
          title="타이틀"
          body="본문"
          actions={
            <>
              <BackButton />
              <HomeButton />
            </>
          }
        />
      </div>
    </div>
  )
}

export function ErrorPageContainerWithoutActions() {
  return (
    <div className="umc-example">
      <div className="docs-error-page-stage">
        <ErrorPageContainer
          title="서비스 준비 중이에요"
          body={
            <>
              더 나은 매칭 경험을 제공하기 위해 준비 중이에요
              <br />
              매칭 기간에 새로운 모습으로 찾아뵙겠습니다!
            </>
          }
        />
      </div>
    </div>
  )
}

type ErrorPageCase = {
  key: string
  title: string
  body: ReactNode
  actions: ReactNode
}

const ERROR_PAGE_CASES: readonly ErrorPageCase[] = [
  {
    key: "404",
    title: "페이지를 찾을 수 없어요",
    body: (
      <>
        입력한 주소가 잘못되었거나,
        <br />
        페이지가 이동 또는 삭제되었을 수 있어요
      </>
    ),
    actions: (
      <>
        <BackButton />
        <HomeButton />
      </>
    ),
  },
  {
    key: "500",
    title: "일시적인 오류가 발생했어요",
    body: (
      <>
        페이지를 불러오지 못했어요
        <br />
        잠시 후 다시 시도해 주세요
      </>
    ),
    actions: (
      <>
        <BackButton />
        <Button size="lg" variant="fill" color="brand" onClick={noop}>
          새로고침
        </Button>
      </>
    ),
  },
  {
    key: "준비 중",
    title: "서비스 준비 중이에요",
    body: (
      <>
        더 나은 000을 제공하기 위해 준비 중이에요
        <br />
        00기간에 새로운 모습으로 찾아뵙겠습니다!
      </>
    ),
    actions: (
      <>
        <BackButton />
        <HomeButton />
      </>
    ),
  },
]

export function ErrorPageContainerCases() {
  return (
    <div className="umc-example umc-example-stack umc-example-flush">
      {ERROR_PAGE_CASES.map((errorPage) => (
        <div key={errorPage.key} className="docs-error-page-frame">
          <ErrorPageContainer
            title={errorPage.title}
            body={errorPage.body}
            actions={errorPage.actions}
          />
        </div>
      ))}
    </div>
  )
}
