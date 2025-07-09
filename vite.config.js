// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// REMOVE the line: import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    // REMOVE the tailwindcss() plugin from here
  ],
})