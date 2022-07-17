import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      'assets' : path.resolve(__dirname, './src/assets')
    },
  },
  plugins: [vue(), svgLoader()]
})
