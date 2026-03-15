import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Paper, Typography, Box } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

export default function FileUploader({ onFileLoad }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      onFileLoad(e.target.result, file.name)
    }
    reader.readAsText(file)
  }, [onFileLoad])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md', '.markdown', '.mdx'],
      'text/plain': ['.txt'],
    },
    multiple: false,
  })

  return (
    <Paper
      {...getRootProps()}
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        bgcolor: isDragActive ? 'action.hover' : 'transparent',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <CloudUpload sx={{ fontSize: 40, color: 'text.secondary' }} />
        <Typography variant="body1" color="text.secondary">
          {isDragActive
            ? '여기에 파일을 놓으세요'
            : '.md 파일을 드래그하거나 클릭하여 업로드'}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          .md, .markdown, .mdx, .txt 파일 지원
        </Typography>
      </Box>
    </Paper>
  )
}
