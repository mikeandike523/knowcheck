import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { CacheProvider } from "@emotion/react";
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
var key = "custom";
var cache = createCache({ key: key });
var _a = createEmotionServer(cache), extractCriticalToChunks = _a.extractCriticalToChunks, constructStyleTagsFromChunks = _a.constructStyleTagsFromChunks;
export default function prerenderComponent(element) {
    var html = renderToString(_jsx(CacheProvider, { value: cache, children: element }));
    var chunks = extractCriticalToChunks(html);
    var styles = constructStyleTagsFromChunks(chunks);
    return {
        html: html,
        styles: styles,
    };
}
