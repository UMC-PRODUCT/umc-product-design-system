import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Footer,
  type FooterColumn,
  type FooterProps,
  type FooterSocialLink,
} from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const COLUMNS: FooterColumn[] = [
  {
    title: "About",
    items: [
      { label: "UMC PRODUCT", href: "/product" },
      { label: "중앙사무국", href: "/office" },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "UMC APP" },
      { label: "UMC 공식 홈페이지", href: "/home" },
      { label: "데모데이 매칭 서비스", href: "/matching" },
      { label: "리크루팅 서비스" },
      { label: "UMC Operation" },
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "서비스이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "카카오톡 채널", href: "/contact/kakao" },
      {
        label: "university@neordinary.com",
        href: "mailto:university@neordinary.com",
      },
      {
        label: "business@neordinary.com",
        href: "mailto:business@neordinary.com",
      },
    ],
  },
]

const SOCIAL_LINKS: FooterSocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/" },
  { platform: "instagram", href: "https://www.instagram.com/" },
  { platform: "youtube", href: "https://www.youtube.com/" },
]

const meta = {
  title: "앱 셸/Footer",
  id: "footer",
  component: Footer,
  parameters: {
    ...componentParameters("Footer"),
    layout: "fullscreen",
  },
  argTypes: {
    variant: { control: "inline-radio" },
    mode: { control: "inline-radio" },
    title: textControl,
    copyright: textControl,
    columns: hiddenControl,
    socialLinks: hiddenControl,
  },
  args: {
    variant: "default",
    mode: "light",
    columns: COLUMNS,
    socialLinks: SOCIAL_LINKS,
  },
} satisfies Meta<FooterProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
