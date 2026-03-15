import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Paper, Typography, Box, Link, Divider } from '@mui/material'
import MermaidBlock from './MermaidBlock'
import CodeBlock from './CodeBlock'

export default function MarkdownViewer({ content, darkMode }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 2,
        lineHeight: 1.8,
        '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 2,
          ml: 0,
          my: 2,
          color: 'text.secondary',
        },
        '& table': { width: '100%', borderCollapse: 'collapse', my: 2 },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'divider',
          px: 2,
          py: 1,
          textAlign: 'left',
        },
        '& th': { bgcolor: 'action.hover', fontWeight: 600 },
        '& ul, & ol': { pl: 3 },
        '& li': { mb: 0.5 },
        '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 3 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}>
                {children}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
          ),
          h3: ({ children }) => (
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mt: 2.5, mb: 1 }}>
              {children}
            </Typography>
          ),
          h4: ({ children }) => (
            <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </Link>
          ),
          code: ({ className, children, node, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const lang = match ? match[1] : ''
            const isBlock = node?.position && node.position.start.line !== node.position.end.line

            if (lang === 'mermaid') {
              return <MermaidBlock code={String(children).trim()} darkMode={darkMode} />
            }

            if (lang) {
              return <CodeBlock language={lang} code={String(children).trim()} />
            }

            // 인라인 코드
            return (
              <Box
                component="code"
                sx={{
                  bgcolor: 'action.hover',
                  px: 0.8,
                  py: 0.2,
                  borderRadius: 0.5,
                  fontSize: '0.875em',
                  fontFamily: '"Fira Code", "Consolas", monospace',
                }}
                {...props}
              >
                {children}
              </Box>
            )
          },
          pre: ({ children }) => (
            <Paper
              elevation={0}
              component="pre"
              sx={{
                my: 2,
                p: 2,
                overflow: 'auto',
                bgcolor: '#0d1117',
                color: '#e6edf3',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                fontSize: '0.875rem',
                fontFamily: '"Fira Code", "Consolas", monospace',
                lineHeight: 1.6,
                whiteSpace: 'pre',
                '& code': {
                  bgcolor: 'transparent',
                  p: 0,
                  borderRadius: 0,
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                },
              }}
            >
              {children}
            </Paper>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Paper>
  )
}
