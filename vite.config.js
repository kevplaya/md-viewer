import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'react-grab',
      transformIndexHtml(html, ctx) {
        if (ctx.server) {
          return html.replace(
            '</head>',
            '    <script src="//unpkg.com/react-grab/dist/index.global.js" crossorigin="anonymous"></script>\n  </head>'
          )
        }
        return html
      },
    },
  ],
})
