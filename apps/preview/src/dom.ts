export type Child = Node | string

export const element = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  children: readonly Child[] = [],
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag)
  node.className = className
  node.append(...children)
  return node
}

export const section = (
  title: string,
  description: string,
  children: readonly Child[],
): HTMLElement =>
  element("section", "border-t border-black/10 px-8 py-10", [
    element("h2", "text-heading-3-semibold", [title]),
    element("p", "text-body-3-regular mt-1 text-black/60", [description]),
    element("div", "mt-6", children),
  ])

export const readVariable = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()
