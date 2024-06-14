import { css } from "@emotion/react";

import theme from "@/themes/main";
import { H1, I, H2 } from "@/fwk/html";

export default function Index() {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: ${theme.gutters.lg};
      `}
    >
      <H1 fontSize={theme.fontSize.jumbotron}>Know/Check{"\u{2122}"}</H1>
      <I>By Wired Hyena LLC</I>
      <H2>The World's Leading AI-Powered Quiz Platform</H2>
    </div>
  );
}
