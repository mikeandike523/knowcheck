import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import rewriteAll from "vite-plugin-rewrite-all";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), rewriteAll()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})