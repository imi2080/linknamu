# 링크타래

내 모든 링크를 실타래처럼 한 페이지에 엮어 두고 하나의 URL로 공유하는 Link in Bio 서비스입니다.
요구사항은 [PRD.md](PRD.md)를 참고합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 클릭 수 저장 (MongoDB Atlas)

`.env.example`을 `.env.local`로 복사한 뒤 `MONGODB_URI`에 Atlas 연결 문자열을 넣습니다.
값이 없으면 화면은 그대로 동작하지만 클릭 수는 저장되지 않고 새로 고치면 0으로 돌아갑니다.

클릭 수는 `clicks` 컬렉션에 `{ linkId, count }` 형태로 저장됩니다.

## 내용 바꾸기

- 프로필과 링크 카드: `src/data/profile.ts`
- 프로필 사진: `public/profile.svg`
- 작품 이미지: `public/works/` (이미지를 바꾸면 `profile.ts`의 `imageWidth`, `imageHeight`도 원본 크기에 맞춥니다)
