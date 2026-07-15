# MD Viewer

마크다운 파일을 업로드하면 **Mermaid 다이어그램**, 코드 하이라이팅, GFM 테이블까지 렌더링해 보여주는 웹 뷰어입니다.

## 기능

- 마크다운 파일 업로드 (드래그 & 드롭 지원)
- Mermaid 다이어그램 렌더링
- GFM (GitHub Flavored Markdown) 지원
- 코드 문법 하이라이팅 (highlight.js)
- 다크 / 라이트 모드 전환
- 모바일 / PC 반응형 UI

## 기술 스택

- React 19 + Vite
- MUI (Material UI)
- react-markdown + remark-gfm + rehype-highlight
- Mermaid

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint
```

## 배포

`vercel.json`의 SPA rewrite 설정으로 Vercel에 그대로 배포됩니다.
