## 폴더 구조

```shell
.
└── src
    ├── _post
    ├── assets
    │   └── images
    ├── components
    │   └── header
    ├── hooks
    ├── libs
    ├── queries
    ├── state
    ├── style
    └── view
        ├── Intro
        │   └── Cards
        ├── admin
        ├── auth
        ├── board
        ├── comment
        ├── home
        │   ├── goal
        │   ├── tag
        │   └── week
        ├── mypage
        ├── note
        └── search
```

## Markdown is supported!!
엘리스 위키는 게시글 작성에 마크다운을 지원합니다. 이를 위해 toast ui에서 제공하는 마크다운 에디터를 이용하였으며 버전은 3.7.1입니다.
게시글의 제목, 생성날짜, 작성자등은 데이터베이스에 저장되지만, 게시글의 본문은 md파일로 저장되어 배포환경인 VM에서 src내의 \_post 폴더에 저장됩니다.
 
