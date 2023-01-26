# Elice Wiki
코딩 학습 자료를 기록하고 공유할 수 있는 위키 서비스(Elice Wiki)의 업그레이드 버전입니다.

## 목차
- [Elice Wiki Page](#elice-wiki-page)
- [기획 의도](#기획-의도)
  - [서비스 목표](#서비스-목표)
  - [서비스의 콘텐츠](#서비스의-콘텐츠)
- [프로젝트 구조](#프로젝트-구조)
  - [프로젝트 구조도](#프로젝트-구조도)
  - [유저 구조도](#유저-구조도)
- [리팩토링](#리팩토링)
  - [리팩토링 폴더 구조](#리팩토링-폴더-구조)
  - [기술 스택](#기술-스택-upgrade-ver)
  - [리팩토링 멤버](#리팩토링-멤버)
  - [리팩토링 위키](#리팩토링-위키)
  - [리팩토링 목표](#리팩토링-목표)
- [팀 프로젝트](#팀-프로젝트)
  - [프로젝트 멤버](#프로젝트-멤버)
  - [기술 스택](#기술-스택)
  - [협업 도구](#협업-도구)
  - [회의 방식](#회의-방식)
  - [와이어 프레임](#와이어-프레임)
  - [서비스 확장 계획](#서비스-확장-계획)


## Elice Wiki Page
[프로젝트 링크](http://elicewiki.kro.kr/)

## 기획 의도

### 서비스 목표

엘리스 위키는 /*elice*/ AI 트랙에 참여하는 학생(레이서)을 대상으로 학습공동체를 형성하여 단순한 학습내용의 기록을 넘어서 정보공유와 토론과 같은 커뮤니티 기능을 제공합니다.

### 서비스의 콘텐츠

#### 1. 커리큘럼에 따른 학습 기록: 메인 기능

- 주차별 학습 주제와 학습 목표가 제시된 페이지에 학습한 내용을 기록할 수 있습니다. 기록된 게시글은 위키 형식으로 누구나 편집이 가능합니다.

#### 2. 학습 기록 공유: 서브 기능

- 메인스트림과 관련된, 혹은 앞으로의 개발 생활에 도움이 될 만한 여러 추가 정보들 역시 위키 형식으로 작성이 가능합니다.

#### 3. 토론&질문 게시판: 서브 기능

- 학습하면서 생긴 여러 질문들이나 진로에 관한 궁금증들을 게시판에 작성하고 답변, 토론하면서 레이서들의 커뮤니티를 형성할 수 있습니다.

## 프로젝트 구조

### 프로젝트 구조도
<img src="front/src/assets/images/Group 1.png">

### 유저 구조도
![USER HIERARCHY](https://user-images.githubusercontent.com/95666311/187865424-cef5d446-e144-4d31-b6a7-0b51006f7c50.png)

## 리팩토링
> 기간 : 22.07.11 ~ 22.08.29

### 리팩토링 폴더 구조
```
// 📂 front

📦src
 ┣ 📂_post
 ┣ 📂assets
 ┃ ┗ 📂images
 ┣ 📂components
 ┃ ┣ 📂header
 ┃ ┣ 📜Layout.jsx
 ┃ ┣ 📜Loader.jsx
 ┃ ┗ 📜Spinner.jsx
 ┣ 📂hooks
 ┣ 📂libs
 ┃ ┣ 📜api.js
 ┣ 📂queries
 ┣ 📂state
 ┃ ┗ 📜atoms.js
 ┣ 📂style
 ┣ 📂view
 ┃ ┣ 📂Intro
 ┃ ┣ 📂admin
 ┃ ┣ 📂auth
 ┃ ┣ 📂board
 ┃ ┣ 📂comment
 ┃ ┣ 📂home
 ┃ ┣ 📂mypage
 ┃ ┣ 📂note
 ┃ ┗ 📂search
 ┣ 📜App.jsx
 ┗ 📜index.js
 ```

- 헤더, 레이아웃, 로딩과 같이 재사용이 가능한 컴포넌트는 따로 components 폴더로 분리하였습니다.
- hooks에는 animation과 관련된 커스텀 훅을, lib폴더의 api.js는 axios를 사용하여 인스턴스를 생성하여 공통 api 코드를 구현했습니다.
- style 폴더에는 전역으로 관리할 수 있도록 스타일 코드를 분리하였습니다.
- views는 UI를 그리는 view 폴더로 분리하였습니다.
 

### 기술 스택 (upgrade ver.)
- Redux ⇒ **React-Query** 변경
- Module CSS ⇒ **Styled Components** 변경
 

### 리팩토링 멤버
- [@송가람](https://github.com/songgaram)
- [@홍지운](https://github.com/hongloans)

### 리팩토링 위키
[리팩토링 위키](https://github.com/songgaram/elice-wiki-upgrade/wiki)

### 리팩토링 목표
- 상태관리 라이브러리 React-Query를 통해 서버와 클라이언트 데이터를 구분하고, 원하는 때 데이터를 업데이트 하기
- 스타일 코드를 CSS in JS로 바꿔 직관적인 코드 사용이 가능하고, Props로 조건부 스타일을 적용하기
- 미디어 쿼리로 반응형 웹 구현하기
- 무한스크롤 이슈 해결해서 적용하기
- 코드 중복을 막고 에러 핸들을 공통으로 처리하기 위해 Axios API 추상화하기
- 관심사 분리를 통해 유지보수가 쉬운 폴더 구조 설계하기
- 읽기 쉬운 코드를 위해 비즈니스와 view 로직 분리하기
- 배포 완료하기

<br/>

# 팀 프로젝트

## 프로젝트 멤버

| 이름   | 역할                    |
| ----- | ---------------------- |
| 송가람 | 프론트엔드/팀장/최종발표      |
| 이영우 | 프론트엔드                |
| 김현서 | 프론트엔드                |
| 홍지운 | 백엔드/프론트엔드/리드미     |
| 송경아 | 백엔드                   |
| 이상원 | 백엔드                   |
| 심은지 | 기획/문서작성              |


## 기술 스택

| Position                | Languages & Tools    | README.md |
| ----------------------- | -------------------- | --------- |
| Frontend                | <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> <img alt="mui" src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>| [FrontEnd](https://github.com/songgaram/elice-wiki-upgrade/blob/master/front/README.md) |
| Backend                 | <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">| [BackEnd](https://github.com/songgaram/elice-wiki-upgrade/blob/master/back/README.md) |
| Deploy                  | <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"> <img src="https://img.shields.io/badge/ORACLE-F80000?style=for-the-badge&logo=oracle&logoColor=white"/>| |


## 협업 도구

-   Gitlab: 프로젝트 코드 저장소
-   Discord: 팀 공지사항, 아이디어 회의
-   Figma: 디자인 회의, 아이디어 회의, 스크럼에 활용

## 회의 방식
### 애자일 방법론: scrum

-   화 ~ 토 오전 10시 scrum 진행
-   각자 개발하고 있는 부분의 진행도를 공유


## 와이어 프레임

[Figma url](https://www.figma.com/file/hCYF8WdrbhzaKcjvuZxm9p/%EB%AF%B8%EB%8B%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-UI%2C-Flow?node-id=32%3A6)

## 서비스 확장 계획
![1_elice-wiki-18(드래그함) 1](https://user-images.githubusercontent.com/95666311/187868355-a43366b2-6981-4bb2-84e3-bd7702ed25ac.png)


