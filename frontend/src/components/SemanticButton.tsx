import { css } from "@emotion/react";

import { Button, ButtonProps } from "@/fwk/html";
import ColorUtil from "mousebox/src/lib/ColorUtil";

export interface SemanticButtonProps extends ButtonProps {
  fontSize?: ButtonProps["fontSize"];
  background?: ButtonProps["background"];
  color?: ButtonProps["color"];
}

export default function SemanticButton({
  fontSize = "16px",
  background = "blue",
  color = "white",
  ...rest
}: SemanticButtonProps) {
  return (
    <Button
      css={css`
        cursor: pointer;
        box-shadow: 0px 0px 6px
          ${ColorUtil.fromCss(background).withA(0.5).toCss()};
        &:hover {
          transform: scale(1.05);
        }
        &:active {
          transform: scale(0.95);
        }
      `}
      aspectRatio="1.0"
      margin={0}
      paddingLeft="0.5em"
      paddingRight="0.5em"
      paddingBottom="0.25em"
      paddingTop="0.25em"
      fontSize={fontSize}
      transformOrigin="center"
      transition="transform 0.25s ease"
      border="none"
      background={background}
      color={color}
      {...rest}
    />
  );
}
