import { css } from "@emotion/react";
import { ReactNode } from "react";

import { ButtonProps } from "@/fwk/html";
import { styleEngine, stylesToCssString } from "@/fwk/B";
import theme from "@/themes/main";
import ColorUtil from "../utils/ColorUtil";

export type SemanticColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "cancel";

export type SemanticButtonProps = ButtonProps & {
  fontSize?: ButtonProps["fontSize"];
  color: SemanticColor;
  children?: ReactNode | ReactNode[];
  type?: "button" | "submit" | "reset";
}

export default function SemanticButton({
  fontSize = "16px",
  children,
  color,
  type="button",
  ...rest
}: SemanticButtonProps) {
  const background = theme.colors.semantic[color];
  const textColor = theme.colors.semanticContrast[color];
  const hoverBackground = ColorUtil.fromCss(background)
    .withScaledLightness(1.2)
    .withScaledSaturation(1.2);
  const activeBackground = ColorUtil.fromCss(background)
    .withScaledLightness(1.5)
    .withScaledSaturation(1.5);
  const { stylePropRest, nonStylePropsRest } = styleEngine(rest)
  return (
    <button
      css={css`
        cursor: pointer;
        user-select: none;
        margin: 0;
        padding: 0;
        background: ${background};
        color: ${textColor};
        border: none;
        font-size: ${fontSize};
        &:hover {
          background: ${hoverBackground.toCss()};
        };
        &:active {
          background: ${activeBackground.toCss()};
          box-shadow: 0px 0px 4px ${activeBackground.withA(0.5).toCss()};
        };
      ${stylesToCssString(stylePropRest)};
      `}
      type={type}
      {...nonStylePropsRest}
    >
     {children}
    </button>
  );
}
