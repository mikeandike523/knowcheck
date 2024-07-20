import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import rewriteAll from "vite-plugin-rewrite-all";
import { createHtmlPlugin } from "vite-plugin-html";

import path from "path";
import fs from "fs"

import React from "react";

import prerenderComponent from "./src/lib/prerenderComponent";
import Spinner from "./src/components/SpinnerOverlay";

const { html: spinnerHtml, styles: spinnerStyles } = prerenderComponent(
  React.createElement(Spinner),
);

fs.writeFileSync("./spinnerHtml.html",spinnerHtml)
fs.writeFileSync("./spinnerStyles.html",spinnerStyles)




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
            spinnerStyles: `<style>${spinnerStyles}</style>`,
            spinnerHtml,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
