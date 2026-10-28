import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import build from '@hono/vite-build/cloudflare-pages'

// Two build modes:
//  - default (client): builds the React SPA from index.html into dist/
//  - worker (mode=worker): builds the Hono edge worker into dist/_worker.js
//    which serves the SPA + /api routes on Cloudflare Pages.
export default defineConfig(({ mode }) => {
  if (mode === 'worker') {
    return {
      plugins: [
        build({
          entry: 'src/worker/index.ts',
          outputDir: 'dist',
          emptyOutDir: false,
        }),
      ],
    }
  }

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2020',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
            if (id.includes('node_modules/react')) return 'react'
            return undefined
          },
        },
      },
    },
    server: { port: 5173 },
  }
})
