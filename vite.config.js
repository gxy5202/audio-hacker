// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'index.ts'),
            name: 'audiohacker',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            treeshake: false
          },
    },
    plugins: [dts()]
})