import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    })
  ],
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
      // Force HMR to work with the latest changes
      force: true
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'ui-vendor': ['lucide-react', 'react-icons'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing'
    ],
    exclude: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing']
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})
