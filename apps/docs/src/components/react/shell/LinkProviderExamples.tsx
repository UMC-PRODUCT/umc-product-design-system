import {
  LinkProvider,
  type LinkComponentProps,
} from "@umc-product/react/shell"

function RouterLink({ href, children, ...rest }: LinkComponentProps) {
  return (
    <a href={href} data-router="true" {...rest}>
      {children}
    </a>
  )
}

function ConsumerLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <a href={href} className="umc-example-link">
      {label}
    </a>
  )
}

export function LinkProviderDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <p className="umc-example-label">LinkProvider 없음 (기본 &lt;a&gt;)</p>
      <ConsumerLink href="/about" label="소개" />
      <p className="umc-example-label">RouterLink 등록</p>
      <LinkProvider component={RouterLink}>
        <ConsumerLink href="/about" label="소개" />
      </LinkProvider>
    </div>
  )
}
