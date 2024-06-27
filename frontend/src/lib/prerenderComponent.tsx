import { ReactNode } from "react";

import { CacheProvider } from "@emotion/react";
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

const key = "custom";
const cache = createCache({ key });
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(cache);

export default function prerenderComponent(element: ReactNode) {
  const html = renderToString(
    <CacheProvider value={cache}>{element}</CacheProvider>,
  );

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);

  return {
    html,
    styles,
  };
}
