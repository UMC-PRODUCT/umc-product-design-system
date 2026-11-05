---
"@umc-product/react": patch
---

**화면 변화** 헤더 그림자(HeaderDesktop): 뒤에 오는 본문 배경에 가려지던 그림자가 보입니다 (가려짐 → 본문 배경 위에 그려짐). 헤더에 위치가 없어서 바로 뒤에 오는 본문의 배경이 헤더 그림자 위에 그려졌습니다. `HeaderMobile`과 같이 `position: relative`를 줘서 그림자가 본문 배경 위에 그려집니다. 헤더를 `sticky`나 `fixed`로 고정했거나 `relative`로 감싼 앱은 화면이 그대로입니다. 본문이 `position`과 `z-index`를 쓰면 헤더에 더 높은 `z-index`를 줍니다.
