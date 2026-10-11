import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LinkProvider, useLinkComponent } from "./LinkProvider.tsx"

function TestLink({
  href,
  children,
  ...rest
}: {
  href: string
  children?: React.ReactNode
  "aria-current"?: "page" | "step"
}) {
  return (
    <a href={href} data-testid="custom-link" {...rest}>
      {children}
    </a>
  )
}

function ConsumerComponent({ href, label }: { href: string; label: string }) {
  const Link = useLinkComponent()
  return <Link href={href}>{label}</Link>
}

describe("LinkProvider", () => {
  it("등록한 컴포넌트로 링크를 렌더하고 href를 전달한다", () => {
    render(
      <LinkProvider component={TestLink}>
        <ConsumerComponent href="/about" label="소개" />
      </LinkProvider>,
    )
    const link = screen.getByTestId("custom-link")
    expect(link).toHaveAttribute("href", "/about")
    expect(link).toHaveTextContent("소개")
  })

  it("LinkProvider가 없으면 기본 <a> 태그로 렌더한다", () => {
    render(<ConsumerComponent href="/about" label="소개" />)
    const link = screen.getByRole("link", { name: "소개" })
    expect(link.tagName).toBe("A")
    expect(link).toHaveAttribute("href", "/about")
  })

  it("aria-current를 링크 컴포넌트에 전달한다", () => {
    function AriaCurrent({ href }: { href: string }) {
      const Link = useLinkComponent()
      return (
        <Link href={href} aria-current="page">
          현재 페이지
        </Link>
      )
    }
    render(
      <LinkProvider component={TestLink}>
        <AriaCurrent href="/current" />
      </LinkProvider>,
    )
    expect(screen.getByTestId("custom-link")).toHaveAttribute(
      "aria-current",
      "page",
    )
  })
})
