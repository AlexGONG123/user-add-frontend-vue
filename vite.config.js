import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // set up alias for src
  resolve:{
    alias:{
      "~":path.resolve(__dirname,"src")
    }
  },
  plugins: [vue(),,WindiCSS()],
})
