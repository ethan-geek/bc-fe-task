# BUSINESSCANVAS FRONT TASK

Business Canvas 프론트엔드 개발 과제를 위한 프로젝트입니다. 회원 목록을 관리하는 테이블을 구현하며, React, TypeScript, AntD를 활용했습니다.

## 과제 진행 방식

1. **요구사항 분석 및 설계**

   - 데이터 구조 정의.
   - 컴포넌트 계층 설계.
   - 폴더 구조 정의

2. **프로젝트 초기 설정**

   - Vite로 React + TypeScript 환경 구축.
   - AntD와 테스트 도구(Vitest) 설치.
   - 환경 변수 설정.

3. **구현**

   - AntD를 사용하여 회원 목록 구현.
   - 모달 공통 컴포넌트 구현.
   - CRUD 로직 구현.
   - Figma 디자인에 맞춰 CSS 커스터마이징 구현.

4. **테스트 및 최적화**
   - Vitest로 단위 테스트 작성 및 기능 검증.
   - 코드 리팩토링으로 추상화와 유지보수성 강화.

## 사용 라이브러리

- **React**: UI 구성 및 상태 관리.
- **TypeScript**: 정적 타입 검사로 안정성 확보.
- **AntD**: 테이블, 모달, 입력 UI 등 주요 컴포넌트 제공.
- **Vite**: 빠른 빌드와 개발 서버 제공.
- **Vitest & React Testing Library**: 단위 테스트로 코드 품질 보증.
- **Prettier**: 코드 포맷팅으로 일관성 유지.

## 실행 방법

1. **리포지토리 클론**

   ```bash
   git clone https://github.com/ethan-geek/bc-fe-task.git
   cd bc-fe-task
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   - 브라우저에서 `http://localhost:5173`으로 접속.

4. **테스트 실행**

   ```bash
   npm run test
   ```

5. **저장소 모드 변경**
   - `.env` 파일의 `VITE_STORAGE` 값을 `in-memory` 또는 `local-storage`로 설정 후 서버 재시작.
   - 예: `VITE_STORAGE=local-storage`

## 환경 정보

- **Node.js**: v22.x.x (LTS 버전 권장)
- **React**: ^19.0.0
- **TypeScript**: ~5.7.2
- **AntD**: ^4.24.16
- **Vite**: ^6.2.0
- **Vitest**: ^2.1.5
- **Prettier**: ^3.3.3

## 디렉토리 구조

```
bc-fe-task/
├── src/
│   ├── __tests__/      # 테스트 파일
│   ├── components/     # UI 컴포넌트
│   ├── services/       # 비즈니스 로직
│   ├── pages/          # 페이지 단위 화면
│   ├── types/          # 타입 정의
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```
