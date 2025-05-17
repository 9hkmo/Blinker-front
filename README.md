## Blinker
### 🌲 브랜치 전략

- 브랜치는 `main`에서 기능 단위로 분기
- 브랜치 네이밍은 순차 번호 기반: `feature/<번호>`
  - 예시:
  `feature/1`
  `feature/2`
  `feature/3`...


- 모든 기능 개발은 Pull Request로 병합
- PR 제목과 커밋 메시지에 Gitmoji 사용


### 🧾 네이밍 컨벤션

| 항목 | 예시 | 규칙 |
|------|------|------|
| 컴포넌트 | `Header.jsx` | **PascalCase** |
| 함수/변수 | `handleLogin`, `userInfo` | **camelCase** |
| 커스텀 훅 | `useUserData()` | **camelCase** |
| 이미지 파일 | `logo.svg` | **kebab-case** |
| 스타일 파일 | `globalStyle.js` | **camelCase** or **kebab-case** |


### 🧩 Gitmoji 사용 규칙

| 이모지 | 용도 |
|--------|------|
| ✨ `:sparkles:` | 새로운 기능 추가 |
| 🐛 `:bug:` | 버그 수정 |
| 💄 `:lipstick:` | UI 스타일 수정 |
| ♻️ `:recycle:` | 리팩토링 |
| 📝 `:memo:` | 문서 수정 |
| 🔧 `:wrench:` | 설정 변경 |
| ✅ `:white_check_mark:` | 테스트 추가 |
| 🚚 `:truck:` | 파일 이동 |
| 🔥 `:fire:` | 코드/파일 삭제 |

### 의존성 설치
클론 후 `npm install` 또는 `npm i` 사용

