# DrugDiary

AI를 활용한 복약관리 캘린더 앱

|  Name  |          Email          |
| :----: | :----------------------: |
| 김현수 |  rover0811@hotmail.com  |
| 김선환 | rlatjsghks4647@naver.com |
| 조하운 |    johaun12@naver.com    |
| 김예훈 |   rladpgns99@gmail.com   |

### Commit Message

- [feat] 새로운 기능 추가
- [fix] 버그 수정, 기능 수정
- [docs] 문서 수정
- [refactor] 코드 리팩토링 (변수명 수정 등)
- [test] 테스트 코드, 리팩토링 테스트 코드 추가
- [style] 코드 스타일 변경, 코드 자체 변경이 없는 경우
- [remove] 파일 또는 코드, 리소스 제거
- [resource] 이미지 리소스, prefab 등의 코드와 상관없는 리소스 추가

예시 :

- [resource] 이미지 리소스, prefab 등의 코드와 상관없는 리소스 추가
- [feat] Add translation to missing strings
- [feat] Disable publishing
- [feat] Sort list context menu
- [fix] Fix typo in cleanup.sh file

### Installation

- 파이썬 모듈 설치(파이썬 설치되어 있어야 함)
  $ pip install -r requirements.txt
- 리액트네이티브 모듈 설치

  1. Node.js 설치
     - https://nodejs.org/ko/download/
     - (Node.js 및 npm 버전 확인) $ node -v $ npm -v
  2. npm 모듈 설치
     - $ npm install -g react-native-cli yarn expo-cli
     - $ npm install axios
     - $ expo add axios 혹은 yarn add axios
- expo login

  1. 개인 핸드폰에 expo를 깔고 회원가입
  2. 파일 다운로드한 컴퓨터 환경에서 $ expo login --username "아이디 이름"
  3. 패스워드 입력

### Test

* /backend 폴더에서 $python -m uvicorn main:app --host=0.0.0.0 --reload
* /frontend 폴더에서 $expo start 하고 앱 애뮬레이터 혹은 모바일 기기 expo 앱에서 접속

### File Path
* result.json (약 정보가 들어있는 파일) = backend/result.json
* PillInformation.js(약 정보를 읽어오는 screen 소스코드) = frontend/src/screens/PillInformation.js
    - 스크린을 호출하는 곳은 frontend/src/navigations/TabNavigation.js > function Pill 에 있음