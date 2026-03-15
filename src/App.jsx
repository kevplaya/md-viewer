import { useState, useCallback } from 'react'
import {
  AppBar, Toolbar, Typography, Container, Box, IconButton,
} from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import FileUploader from './components/FileUploader'
import MarkdownViewer from './components/MarkdownViewer'

const SAMPLE_MD = `# MD Viewer에 오신 것을 환영합니다!

마크다운 파일을 업로드하면 **Mermaid 다이어그램**을 포함한 내용을 확인할 수 있습니다.

## 기능
- 마크다운 파일 업로드 (드래그 & 드롭 지원)
- Mermaid 다이어그램 렌더링
- GFM (GitHub Flavored Markdown) 지원
- 모바일 / PC 반응형 UI

## Mermaid 예시

\`\`\`mermaid
graph TD
    A[파일 업로드] --> B{마크다운 파일?}
    B -->|예| C[뷰어에 렌더링]
    B -->|아니오| D[오류 메시지]
    C --> E[Mermaid 다이어그램 표시]
    C --> F[테이블/코드 하이라이팅]
\`\`\`

## 시퀀스 다이어그램

\`\`\`mermaid
sequenceDiagram
    participant U as 사용자
    participant App as MD Viewer
    participant M as Mermaid
    U->>App: .md 파일 업로드
    App->>App: 파일 읽기
    App->>M: Mermaid 코드 감지
    M-->>App: SVG 다이어그램
    App-->>U: 렌더링된 마크다운
\`\`\`

## 코드 예시

\`\`\`javascript
const greeting = "Hello, MD Viewer!";
console.log(greeting);
\`\`\`

## 테이블 예시

| 기능 | 지원 여부 |
|------|----------|
| GFM | ✅ |
| Mermaid | ✅ |
| 코드 하이라이팅 | ✅ |
| 다크 모드 | ✅ |
`

function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD)
  const [darkMode, setDarkMode] = useState(false)
  const [fileName, setFileName] = useState('')

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#9c27b0' },
      background: darkMode
        ? { default: '#121212', paper: '#1e1e1e' }
        : { default: '#f5f5f5', paper: '#ffffff' },
    },
    typography: {
      fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", sans-serif',
    },
  })

  const handleFileLoad = useCallback((content, name) => {
    setMarkdown(content)
    setFileName(name)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              MD Viewer
            </Typography>
            {fileName && (
              <Typography variant="body2" sx={{ mr: 2, opacity: 0.8 }}>
                {fileName}
              </Typography>
            )}
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
          <FileUploader onFileLoad={handleFileLoad} />
          <MarkdownViewer content={markdown} darkMode={darkMode} />
        </Container>

        <Box
          component="footer"
          sx={{ textAlign: 'center', py: 2, opacity: 0.6, fontSize: '0.85rem' }}
        >
          MD Viewer — React 19 + MUI + Mermaid
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
