import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import rewriteAll from "vite-plugin-rewrite-all";
import {createHtmlPlugin} from 'vite-plugin-html'

import path from "path";

import React from 'react'

import prerenderComponent from './src/lib/prerenderComponent'
import Spinner from './src/components/SpinnerOverlay'

const {html:spinnerHtml, styles:spinnerStyles} = prerenderComponent(React.createElement(Spinner))

console.log(spinnerHtml)

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
      createHtmlPlugin({
        inject: {
          data: {
            spinnerStyles:`<style>${spinnerStyles}</style>`,
            spinnerHtml
          }
        }
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
