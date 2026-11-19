import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  LinkProvider,
  type LinkComponentProps,
} from "../link-provider/LinkProvider.tsx"
import { Footer, type FooterColumn } from "./Footer.tsx"

const columns: FooterColumn[] = [
  {
    title: "About",
    items: [{ label: "UMC PRODUCT", href: "/product" }],
  },
  {
    title: "Product",
    items: [
      { label: "UMC 공식 홈페이지", href: "https://umc.example" },
      { label: "리크루팅 서비스" },
    ],
  },
]

function RouterLink({ href, className, children }: LinkComponentProps) {
  return (
    <a href={href} className={className} data-router-link="">
      {children}
    </a>
  )
}

describe("Footer", () => {
  it("href가 있는 항목은 링크로, 없는 항목은 일반 글자로 그린다", () => {
    render(<Footer columns={columns} />)

    expect(screen.getByRole("link", { name: "UMC PRODUCT" })).toHaveAttribute(
      "href",
      "/product",
    )
    expect(
      screen.queryByRole("link", { name: "리크루팅 서비스" }),
    ).not.toBeInTheDocument()
    expect(screen.getByText("리크루팅 서비스")).toBeInTheDocument()
  })

  it("열 제목으로 항목 목록의 이름을 붙인다", () => {
    render(<Footer columns={columns} />)

    const productList = screen.getByRole("list", { name: "Product" })
    expect(within(productList).getAllByRole("listitem")).toHaveLength(2)
  })

  it("열을 푸터 메뉴 내비게이션으로 묶는다", () => {
    render(<Footer columns={columns} />)

    expect(
      screen.getByRole("navigation", { name: "푸터 메뉴" }),
    ).toBeInTheDocument()
  })

  it("열이 없으면 내비게이션을 그리지 않는다", () => {
    render(<Footer />)

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("소셜 링크에 플랫폼 이름을 접근 가능한 이름으로 붙인다", () => {
    render(
      <Footer
        socialLinks={[
          { platform: "facebook", href: "https://facebook.example" },
          { platform: "youtube", href: "https://youtube.example" },
        ]}
      />,
    )

    const social = screen.getByRole("list", { name: "소셜 미디어" })
    expect(
      within(social).getByRole("link", { name: "Facebook" }),
    ).toHaveAttribute("href", "https://facebook.example")
    expect(
      within(social).getByRole("link", { name: "YouTube" }),
    ).toBeInTheDocument()
  })

  it("소셜 링크의 label로 접근 가능한 이름을 바꾼다", () => {
    render(
      <Footer
        socialLinks={[
          {
            platform: "instagram",
            href: "https://instagram.example",
            label: "UMC 인스타그램",
          },
        ]}
      />,
    )

    expect(
      screen.getByRole("link", { name: "UMC 인스타그램" }),
    ).toBeInTheDocument()
  })

  it("소셜 링크가 없으면 목록을 그리지 않는다", () => {
    render(<Footer />)

    expect(
      screen.queryByRole("list", { name: "소셜 미디어" }),
    ).not.toBeInTheDocument()
  })

  it("LinkProvider의 링크 컴포넌트로 링크를 그린다", () => {
    render(
      <LinkProvider component={RouterLink}>
        <Footer
          columns={columns}
          socialLinks={[
            { platform: "youtube", href: "https://youtube.example" },
          ]}
        />
      </LinkProvider>,
    )

    expect(screen.getByRole("link", { name: "UMC PRODUCT" })).toHaveAttribute(
      "data-router-link",
    )
    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute(
      "data-router-link",
    )
  })

  it("기본 제목과 올해 연도가 들어간 저작권 문구를 그린다", () => {
    render(<Footer />)

    expect(screen.getByText("University MakeUs Challenge")).toBeInTheDocument()
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} UMC Product All rights reserved.`,
      ),
    ).toBeInTheDocument()
  })

  it("title과 copyright를 바꿔 그린다", () => {
    render(<Footer title="UMC" copyright="© UMC" />)

    expect(screen.getByText("UMC")).toBeInTheDocument()
    expect(screen.getByText("© UMC")).toBeInTheDocument()
  })

  it("기본 variant는 default, mode는 light다", () => {
    render(<Footer />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toHaveAttribute("data-variant", "default")
    expect(footer).toHaveAttribute("data-mode", "light")
  })

  it("dark 모드에서만 배경 장식을 그린다", () => {
    const { container, rerender } = render(<Footer mode="dark" />)
    expect(container.querySelector(".umc-footer__glow")).toBeInTheDocument()

    rerender(<Footer mode="gray" />)
    expect(container.querySelector(".umc-footer__glow")).not.toBeInTheDocument()
  })

  it("hero는 열을 먼저, default는 브랜드를 먼저 읽는다", () => {
    const { rerender } = render(<Footer variant="hero" columns={columns} />)
    const heroFooter = screen.getByRole("contentinfo")
    expect(
      heroFooter.querySelector(".umc-footer__content > :first-child"),
    ).toHaveClass("umc-footer__columns")

    rerender(<Footer variant="default" columns={columns} />)
    expect(
      screen
        .getByRole("contentinfo")
        .querySelector(".umc-footer__content > :first-child"),
    ).toHaveClass("umc-footer__default-top")
  })

  it("나머지 footer 속성을 루트 요소에 넘긴다", () => {
    render(<Footer className="app-footer" id="site-footer" />)

    const footer = screen.getByRole("contentinfo")
    expect(footer).toHaveClass("umc-footer", "app-footer")
    expect(footer).toHaveAttribute("id", "site-footer")
  })
})
