export function isActivePath(
  currentPath: string | undefined,
  href: string,
): boolean {
  if (!currentPath) return false
  if (href === "/") return currentPath === "/"
  return currentPath === href || currentPath.startsWith(href + "/")
}
