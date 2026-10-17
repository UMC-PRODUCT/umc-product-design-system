import {
  AddIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
} from "@umc-product/icons"

export const textControl = { control: "text" } as const

export const hiddenControl = { control: false } as const

export const iconArgType = {
  options: ["없음", "검색", "더하기", "오른쪽 화살표", "닫기"],
  mapping: {
    없음: undefined,
    검색: <SearchIcon />,
    더하기: <AddIcon weight="fill" />,
    "오른쪽 화살표": <ChevronRightIcon weight="fill" />,
    닫기: <CloseIcon weight="fill" />,
  },
  control: { type: "select" },
} as const
