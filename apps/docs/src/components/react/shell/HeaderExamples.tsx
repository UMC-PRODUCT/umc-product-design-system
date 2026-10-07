import { Header } from "@umc-product/react"

const navItems = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

const probeStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: 0,
}

export function HeaderLight() {
  return (
    <>
      <div className="umc-example umc-example-block">
        <div data-spec-id="header-light-default">
          <Header
            logo={
              <span style={{ fontWeight: 700, color: "#02746c" }}>UMC</span>
            }
            navItems={navItems}
            currentPath="/matching"
            actions={
              <button
                style={{
                  padding: "8px 16px",
                  background: "#02746c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                로그인
              </button>
            }
          />
        </div>
      </div>
      <div data-spec-id="header-nav-item-default" style={probeStyle}>
        <Header
          logo={<span>UMC</span>}
          navItems={navItems}
          currentPath="/other"
        />
      </div>
      <div data-spec-id="header-nav-item-selected" style={probeStyle}>
        <Header
          logo={<span>UMC</span>}
          navItems={navItems}
          currentPath="/about"
        />
      </div>
      <div data-spec-id="header-nav-pill-container" style={probeStyle}>
        <Header
          logo={<span>UMC</span>}
          navItems={navItems}
          currentPath="/about"
        />
      </div>
    </>
  )
}

export function HeaderDark() {
  return (
    <div
      className="umc-example umc-example-block"
      style={{ background: "#1a1a1a" }}
    >
      <div data-spec-id="header-dark-default">
        <Header
          logo={<span style={{ fontWeight: 700, color: "#5ce0d8" }}>UMC</span>}
          navItems={navItems}
          currentPath="/about"
          mode="dark"
        />
      </div>
    </div>
  )
}
