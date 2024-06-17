import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import rewriteAll from "vite-plugin-rewrite-all";
import path from "path";

const RPC_URL_PROD="http://localhost:5001/knowcheck-4cbab/us-central1"
const RPC_URL_DEV="https://us-central1-knowcheck-4cbab.cloudfunctions.net"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
      mkcert(),
      rewriteAll(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
