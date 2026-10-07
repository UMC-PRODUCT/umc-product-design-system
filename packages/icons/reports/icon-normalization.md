# 아이콘 정규화 리포트

`pnpm icons:build`가 만드는 파일이다. 손으로 고치지 않는다. 규칙은 `scripts/rules.ts`에서 바꾼다.

## 입력

- 피그마 파일 `U3pRZp6BjQBW5aMljCBwo9`, get_design_context asset download, 받은 날 2026-10-07
- 노드 154개, 컴포넌트 74개(아이콘 64, 픽토그램 10)

## 디자인 팀 확인 요청

1. `Icon/Search`의 변형 이름이 `Regular=Weight`로 속성과 값이 뒤집혀 있습니다. 코드에서는 `Weight=Regular`로 읽었습니다. 이름을 바로잡아 주시고, Thin과 Fill 굵기를 추가할지도 알려 주세요.
2. `Icon/Eye_visable`, `Icon/Eye_invisable`의 철자가 visable입니다. visible로 바꿔 주실 수 있나요?
3. Bold, Italic, Strikethrough, Underline, Time, warning의 Fill 변형과 ThumbsUp 전체는 프레임이 23.85×25이고, Link는 24×25, Location Fill은 19×24.51, Person Regular와 Fill은 22×24입니다. 코드에서는 24px 정사각형 안에 비율을 지켜 줄여 넣었습니다. 24×24로 맞춰 주실 수 있나요?
4. `Icon/ThumbsUp`에 보이지 않는 `Format italic` 요소가 남아 있습니다.
5. Notification, Notification-Off의 빨간 점(`#dc3d3d`)과 흰 테두리, Time과 warning의 Regular와 Thin, Check_circle Fill, ThumbsUp의 흰 부분은 아이콘 색을 바꿔도 고정입니다. 흰 배경이 아닌 곳에서는 흰 부분이 드러나므로, 뚫린 모양으로 그릴지 알려 주세요.
6. 선으로 그린 아이콘과 면으로 그린 아이콘이 섞여 있습니다. 24px에서는 같아 보이지만, 인스턴스를 줄이면 선 아이콘은 두께가 그대로이고 면 아이콘은 같이 줄어듭니다(예: Option Button 20px의 `Icon/Check`는 선 두께 2). 패키지 아이콘은 모두 크기에 비례해 줄어듭니다. 모두 면(Outline stroke)으로 맞춰 주실 수 있나요?
7. `Pictogram/Person`은 PNG 마스크라 코드에서 뺐습니다. 크기 변형(30px, 36px, 24px)이 생겼지만 세 변형 모두 아직 PNG입니다. SVG로 받을 수 있나요?
8. `Pictogram/School`의 색 `#0b6b64`는 3기 색 변수에 없습니다. 다른 픽토그램처럼 Teal-600(`#02746c`)이 맞는지 알려 주세요. 지금은 피그마 값을 기본색으로 둡니다.
9. `Pictogram/Under-construction`의 변형 이름이 `Varient`입니다. Dark 변형의 `#b3e6e1`은 Teal-200(`#b3e5e1`)과 1만큼 달라 피그마 값 그대로 두었습니다.
10. `Icon_warning`처럼 `/` 대신 `_`로 나눈 이름 5개와 소문자로 시작하는 `Icon/home`이 있습니다. 이름을 맞춰 주실 수 있나요?

## 확인 대기 굵기 대응

| 피그마 컴포넌트 | 피그마 변형 | 코드 굵기 | 이유 |
| --- | --- | --- | --- |
| `Icon/Search` | `Regular=Weight` | regular | Search의 유일한 변형 이름이 속성과 값이 뒤집혀 있다. Weight=Regular로 읽는다 |

## 제외한 컴포넌트

| 피그마 컴포넌트 | 이유 |
| --- | --- |
| `Pictogram/Person` | SVG 경로가 아니라 PNG 마스크다. 디자인 팀에 SVG를 요청했다 |

## 배치 보정

피그마가 프레임 대신 안쪽 도형만 내보낸 변형이다. 도형을 프레임 안 원래 위치로 옮긴다.

| 노드 | 프레임 viewBox | 도형 위치 | 이유 |
| --- | --- | --- | --- |
| `Icon/Chevron_Left` Weight=Thin(3060:94610)<br>`Icon/Chevron_Left` Weight=Regular(3060:94614)<br>`Icon/Chevron_Left` Weight=Fill(3060:94618)<br>`Icon/Chevron_Right` Weight=Thin(3060:94199)<br>`Icon/Chevron_Right` Weight=Regular(3060:94203)<br>`Icon/Chevron_Right` Weight=Fill(3060:94207) | 0 0 24 24 | 4, 0 | Chevron_Left, Chevron_Right는 24×24 프레임이 아니라 안쪽 16×24 도형만 내보낸다. 프레임 안 위치로 되돌린다 |
| `Icon/Person` Weight=Regular(2505:16490)<br>`Icon/Person` Weight=Fill(3060:93819) | 0 0 22 24 | 1, 1 | Person Regular, Fill은 22×24 프레임이 아니라 안쪽 20×22 그룹만 내보낸다. 프레임 크기는 피그마 값 그대로 둔다 |
| `Icon/Setting` Weight=Regular(2505:16951)<br>`Icon/Setting` Weight=Fill(3060:94086) | 0 0 24 24 | 1.9997, 2.0004 | Setting은 24×24 프레임이 아니라 안쪽 20×20 그룹만 내보낸다. 프레임 안 위치로 되돌린다 |
| `Pictogram/Under-construction` Varient=Light(3156:42932)<br>`Pictogram/Under-construction` Varient=Dark(3156:42994) | 0 0 30 30 | 0.6006, 0.8994 | Under-construction은 30×30 프레임이 아니라 안쪽 28.8×27 그룹만 내보낸다. 프레임 안 위치로 되돌린다 |

## viewBox 예외

| 노드 | viewBox | 이유 |
| --- | --- | --- |
| `Icon/Bold` Weight=Fill(3060:96491)<br>`Icon/Italic` Weight=Fill(3060:96492)<br>`Icon/Strikethrough` Weight=Fill(3060:96494)<br>`Icon/Underline` Weight=Fill(3060:96493)<br>`Icon/Time` Weight=Fill(3060:96072)<br>`Icon_warning` Weight=Fill(3060:96170)<br>`Icon/ThumbsUp` Weight=Regular(3095:97510)<br>`Icon/ThumbsUp` Weight=Fill(3095:97511)<br>`Icon/ThumbsUp` Weight=Thin(3095:97517) | 0 0 23.8462 25 | 피그마 프레임이 23.85×25다. 피그마 값 그대로 두고 정사각형 svg 안에 비율을 지켜 가운데 놓는다 |
| `Icon/Link` Weight=Fill(3095:97369)<br>`Icon/Link` Weight=Regular(3095:97372)<br>`Icon/Link` Weight=Thin(3095:97376) | 0 0 24 25 | 피그마 프레임이 24×25다. 피그마 값 그대로 두고 정사각형 svg 안에 비율을 지켜 가운데 놓는다 |
| `Icon_Location` Weight=Fill(3060:96435) | 0 0 19 24.5087 | 피그마 프레임이 19×24.51이다. 피그마 값 그대로 두고 정사각형 svg 안에 비율을 지켜 가운데 놓는다 |

## 색 규칙

| 대상 | 피그마 색 | 코드 |
| --- | --- | --- |
| 아이콘 주색 | #3f4141 | `currentColor`(글자색을 따른다) |
| 아이콘 고정색 | #dc3d3d | style `var(--umc-color-red-500)` |
| 아이콘 고정색 | #ffffff | style `var(--umc-color-white)` |
| 픽토그램 주색 | #02746c | `currentColor`, 기본 `color`는 `var(--umc-color-icon-brand-strong)` |
| 픽토그램 주색 | #008a80 | `currentColor`, 기본 `color`는 `var(--umc-color-icon-brand-medium)` |
| 픽토그램 주색 | #0b6b64 | `currentColor`, 기본 `color`는 `#0b6b64` |
| 픽토그램 고정색 | #ddf4f1 | style `var(--umc-color-teal-100)` |
| 픽토그램 고정색 | #ffffff | style `var(--umc-color-white)` |
| 픽토그램 고정색 | #b3e6e1 | 속성 `#b3e6e1` |

## 이름 대응표

| 피그마 컴포넌트 | 코드 컴포넌트 | 변형 |
| --- | --- | --- |
| `Icon/Add/Circle` | `AddCircleIcon` | thin(3060:96211), regular(3060:96217), fill(3060:96223) |
| `Icon/Add` | `AddIcon` | thin(3060:94161), regular(2505:16969), fill(3060:94171) |
| `Icon/Bold` | `BoldIcon` | fill(3060:96491) |
| `Icon/Calendar` | `CalendarIcon` | fill(3060:95765) |
| `Icon/Camera` | `CameraIcon` | fill(3095:97340) |
| `Icon/ChatBubbleDots` | `ChatBubbleDotsIcon` | regular(3060:96575), fill(3060:96559) |
| `Icon/Chatbubbles` | `ChatbubblesIcon` | fill(3060:95761) |
| `Icon/Checkbox` | `CheckboxIcon` | thin(3060:96785), regular(3060:96734) |
| `Icon_Check_circle` | `CheckCircleIcon` | thin(3140:48656), regular(3140:48662), fill(3140:48668) |
| `Icon/Check` | `CheckIcon` | thin(3060:94644), regular(2505:17076), fill(3060:94647) |
| `Icon/Chevron_Left` | `ChevronLeftIcon` | thin(3060:94610), regular(3060:94614), fill(3060:94618) |
| `Icon/Chevron_Right` | `ChevronRightIcon` | thin(3060:94199), regular(3060:94203), fill(3060:94207) |
| `Icon/Close` | `CloseIcon` | thin(3060:94290), regular(2505:17000), fill(3060:94282) |
| `Icon/Cloud-upload` | `CloudUploadIcon` | thin(3060:96808), regular(3060:96736), fill(2505:16659) |
| `Icon/Collapse-all` | `CollapseAllIcon` | thin(3060:96992), regular(3060:96731) |
| `Icon/Copy` | `CopyIcon` | thin(3095:97406), regular(3095:97385), fill(3095:97390) |
| `Icon/Document` | `DocumentIcon` | thin(3060:96584), regular(3060:96583), fill(3060:96582) |
| `Icon/Download` | `DownloadIcon` | thin(3095:97189), regular(3095:97168), fill(3095:97194) |
| `Icon/Edit` | `EditIcon` | thin(3060:97059), regular(2505:16720), fill(3060:97066) |
| `Icon/Expand-all` | `ExpandAllIcon` | thin(3060:96956), regular(3060:96935) |
| `Icon/Expand_less` | `ExpandLessIcon` | thin(3060:95384), regular(2505:17239), fill(3060:95387) |
| `Icon/Expand_more` | `ExpandMoreIcon` | thin(3060:95354), regular(2505:17175), fill(3060:94726) |
| `Icon/Eye_invisable` | `EyeInvisibleIcon` | regular(3095:97143) |
| `Icon/Eye_visable` | `EyeVisibleIcon` | fill(3095:97142) |
| `Icon/File-upload` | `FileUploadIcon` | thin(3060:96832), regular(3060:96738) |
| `Icon/Filter` | `FilterIcon` | thin(3060:96863), regular(2505:17095), fill(3060:96870) |
| `Icon/Flag` | `FlagIcon` | fill(3095:97484) |
| `Icon/Funnel` | `FunnelIcon` | thin(3060:96848), regular(3060:96730) |
| `Icon/Goal` | `GoalIcon` | thin(3060:96752), regular(3060:96735), fill(3060:96758) |
| `Icon/GraduationCap` | `GraduationCapIcon` | fill(3095:97355) |
| `Icon/home` | `HomeIcon` | fill(3060:95773) |
| `Icon/Info` | `InfoIcon` | thin(3095:97217), regular(3095:97223), fill(3095:97229) |
| `Icon/Italic` | `ItalicIcon` | fill(3060:96492) |
| `Icon/Link` | `LinkIcon` | thin(3095:97376), regular(3095:97372), fill(3095:97369) |
| `Icon/List` | `ListIcon` | regular(3060:96625), fill(3060:96638) |
| `Icon_Location` | `LocationIcon` | thin(3060:96478), regular(3060:96430), fill(3060:96435) |
| `Icon/Lock` | `LockIcon` | fill(3095:97336) |
| `Icon/Megaphone` | `MegaphoneIcon` | fill(3095:97475) |
| `Icon/Menu` | `MenuIcon` | thin(3060:93840), regular(3060:93842), fill(3060:93844) |
| `Icon/More_horiz` | `MoreHorizIcon` | thin(3060:95468), regular(3060:95473), fill(2505:17245) |
| `Icon/More_Vertical` | `MoreVerticalIcon` | thin(3060:95443), regular(3060:95439), fill(2505:17248) |
| `Icon/Notification` | `NotificationIcon` | regular(2505:16945), fill(3060:93949) |
| `Icon/Notification-Off` | `NotificationOffIcon` | regular(3060:93965), fill(3060:93970) |
| `Icon/Open-new` | `OpenNewIcon` | thin(3060:97025), regular(2505:16716), fill(3060:97035) |
| `Icon/Paperclip` | `PaperclipIcon` | thin(3060:96620), regular(3060:96607), fill(3060:96612) |
| `Icon/Person` | `PersonIcon` | regular(2505:16490), fill(3060:93819) |
| `Icon/Picture` | `PictureIcon` | fill(3095:97327) |
| `Icon/Radio` | `RadioIcon` | thin(3060:96732), regular(3060:96768) |
| `Icon_remove_circle` | `RemoveCircleIcon` | thin(3060:96323), regular(3060:96330), fill(3060:96337) |
| `Icon/Repeat` | `RepeatIcon` | thin(3095:97454), regular(3095:97444), fill(3095:97434) |
| `Icon/Reset` | `ResetIcon` | thin(3060:96555), regular(3060:96545), fill(3060:96544) |
| `Icon/Search` | `SearchIcon` | regular(3331:44045) |
| `Icon/Setting` | `SettingIcon` | regular(2505:16951), fill(3060:94086) |
| `Icon/Share` | `ShareIcon` | thin(3060:95562), regular(3060:95564) |
| `Icon/Strikethrough` | `StrikethroughIcon` | fill(3060:96494) |
| `Icon_Subtract_Circle` | `SubtractCircleIcon` | thin(3060:96406), regular(3060:96412), fill(3060:96418) |
| `Icon/Subtraction` | `SubtractionIcon` | thin(3060:94325), regular(2505:16987), fill(2505:16990) |
| `Icon/Text` | `TextIcon` | fill(3095:97362) |
| `Icon/ThumbsUp` | `ThumbsUpIcon` | thin(3095:97517), regular(3095:97510), fill(3095:97511) |
| `Icon/Time` | `TimeIcon` | thin(3060:96154), regular(3060:96068), fill(3060:96072) |
| `Icon/Trash` | `TrashIcon` | thin(3060:95505), regular(3060:95495) |
| `Icon/Underline` | `UnderlineIcon` | fill(3060:96493) |
| `Icon/Users` | `UsersIcon` | fill(3095:97361) |
| `Icon_warning` | `WarningIcon` | thin(3060:96160), regular(3060:96165), fill(3060:96170) |
| `Pictogram/Document` | `DocumentPictogram` | light(3095:99530) |
| `Pictogram/Flag` | `FlagPictogram` | light(3095:99528) |
| `Pictogram/Goal` | `GoalPictogram` | light(3095:99529) |
| `Pictogram/GraduationCap` | `GraduationCapPictogram` | light(3095:99527) |
| `Pictogram/People` | `PeoplePictogram` | light(2903:72069) |
| `Pictogram/School` | `SchoolPictogram` | light(2505:16879) |
| `Pictogram/Under-construction` | `UnderConstructionPictogram` | light(3156:42932), dark(3156:42994) |
| `Pictogram/User shield` | `UserShieldPictogram` | light(3095:99549) |
| `Pictogram/Users` | `UsersPictogram` | light(3095:99526) |
| `Pictogram/Vote` | `VotePictogram` | light(3095:99535) |
