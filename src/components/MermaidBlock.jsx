import { useEffect, useId, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { Box, Paper } from '@mui/material'

export default function MermaidBlock({ code, darkMode }) {
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const reactId = useId()

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: darkMode ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
    })

    const id = `mermaid-${reactId.replace(/:/g, '-')}`

    mermaid.render(id, code).then(({ svg }) => {
      setSvg(svg)
    }).catch((err) => {
      setSvg(`<pre style="color:red;">Mermaid Error: ${err.message}</pre>`)
    })
  }, [code, darkMode, reactId])

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        p: 2,
        overflow: 'auto',
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '& svg': { maxWidth: '100%', height: 'auto' },
      }}
    >
      <Box
        ref={containerRef}
        sx={{ display: 'flex', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </Paper>
  )
}
