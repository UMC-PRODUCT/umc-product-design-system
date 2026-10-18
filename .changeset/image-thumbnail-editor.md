---
"@umc-product/react": minor
---

`ImageThumbnailEditor`를 더합니다. 피그마 `Image Thumbnail Editor`를 옮긴 업로드 칸입니다. 칸을 눌러 이미지 파일을 고르면 미리보기를 보여 주고 `onValueChange`로 `File`을 넘깁니다. 기본으로 PNG, SVG, 5MB 이하 파일만 받고(`accept`, `maxSize`로 변경), 맞지 않는 파일은 받지 않고 `onReject`로 파일과 이유(`"type"`, `"size"`)를 넘깁니다. 서버 업로드는 앱이 합니다. 기본 크기는 120px이고 `className`으로 바꾸며, 칸 안 문구는 `label`과 `description`으로 바꿉니다.
