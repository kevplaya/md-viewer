import { useState } from 'react'
import { Box, IconButton, Tooltip, Paper } from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export default function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  let highlighted
  try {
    highlighted = hljs.highlight(code, { language }).value
  } catch {
    highlighted = hljs.highlightAuto(code).value
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 0.5,
          bgcolor: '#1e1e2e',
          color: '#cdd6f4',
          fontSize: '0.75rem',
        }}
      >
        <span>{language}</span>
        <Tooltip title={copied ? '복사됨!' : '복사'}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: '#cdd6f4' }}>
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: 'auto',
          bgcolor: '#0d1117',
          color: '#e6edf3',
          fontSize: '0.875rem',
          fontFamily: '"Fira Code", "Consolas", monospace',
          lineHeight: 1.6,
          '& .hljs-keyword': { color: '#ff7b72' },
          '& .hljs-string': { color: '#a5d6ff' },
          '& .hljs-comment': { color: '#8b949e' },
          '& .hljs-function': { color: '#d2a8ff' },
          '& .hljs-number': { color: '#79c0ff' },
          '& .hljs-title': { color: '#d2a8ff' },
          '& .hljs-built_in': { color: '#ffa657' },
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </Box>
    </Paper>
  )
}
