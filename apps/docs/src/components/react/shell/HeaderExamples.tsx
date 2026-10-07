import { Header } from "@umc-product/react/shell"

const navItems = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

export function HeaderLight() {
  return (
    <div className="umc-example umc-example-block">
      <Header
        logo={<span style={{ fontWeight: 700, color: "#02746c" }}>UMC</span>}
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
  )
}

export function HeaderDark() {
  return (
    <div className="umc-example umc-example-block" style={{ background: "#1a1a1a" }}>
      <Header
        logo={<span style={{ fontWeight: 700, color: "#5ce0d8" }}>UMC</span>}
        navItems={navItems}
        currentPath="/about"
        mode="dark"
      />
    </div>
  )
}
