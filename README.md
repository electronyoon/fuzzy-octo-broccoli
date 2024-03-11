# 1. 소개
인스타그램의 피드만 게시판처럼 간단하게 구현한 앱입니다. MSA 설계 연습을 위해 만들어졌습니다.

<br><br>

# 2. 프로젝트 구조
k8s는 미완입니다. docker-compose로 대체 개발했습니다.
```
.
├── 1️⃣ fuzzy-octo-broccoli-express  : 백엔드 서버
├── 2️⃣ fuzzy-octo-broccoli-next     : 프론트엔드 웹앱
├── 3️⃣ fuzzy-octo-broccoli-process  : pubsub <-> DB 동기화 서비스
├── 4️⃣ fuzzy-octo-broccoli-sse      : 실시간 알람 서버
├── 📂 kubernetes                   : ❌ k8s configs
├── 📂 docker-compose.yml           : ✅ docker-compose
├── 📂 testjsons                    : 테스트용 json 파일
└── 📂 testscripts                  : 파일 가공, 부하테스트 스크립트
```
![Picture1](https://github.com/electronyoon/fuzzy-octo-broccoli/assets/52403430/da91af0f-b254-44bd-b914-6d974eb76c4c)
