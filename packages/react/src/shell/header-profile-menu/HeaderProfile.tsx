import { cx } from "../../internal/cx.ts"
import { ProfileSilhouetteGlyph } from "../../internal/glyphs.tsx"

export type HeaderProfileProps = {
  src?: string
  className?: string
}

export function HeaderProfile({ src, className }: HeaderProfileProps) {
  return (
    <span className={cx("umc-header-profile", className)}>
      {src === undefined ? (
        <ProfileSilhouetteGlyph className="umc-header-profile__silhouette" />
      ) : (
        <img className="umc-header-profile__image" src={src} alt="" />
      )}
    </span>
  )
}
