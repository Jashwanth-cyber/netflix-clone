import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Add a comma here
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://apis.ccbp.in',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//      },
//    }
})
