import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 환경변수 로드
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://bookpick-test.duckdns.org',
          changeOrigin: true,
          secure: false,
        },
        '/bookpick': {
          target: env.VITE_IMAGE_UPLOAD_URL || '',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
