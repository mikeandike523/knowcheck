import { css, SerializedStyles } from "@emotion/react";
import { ReactNode } from "react";

import { Button, ButtonProps, Span } from "@/fwk/html";
// Comes from another project I am wporking on
// Don't feel like rewriting the code
import ColorUtil from "mousebox/src/lib/ColorUtil";
import theme from "@/themes/main";

export type SemanticColor =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "cancel";

export interface SemanticButtonProps extends ButtonProps {
  fontSize?: ButtonProps["fontSize"];
  color: SemanticColor;
  children?: ReactNode | ReactNode[];
  textCss?: SerializedStyles;
}

export default function SemanticButton({
  fontSize = "16px",
  children,
  color,
  textCss = css``,
  ...rest
}: SemanticButtonProps) {
  const background = theme.colors.semantic[color];
  const textColor = theme.colors.semanticContrast[color];
  console.log(background,textColor)
  const hoverBackground = ColorUtil.fromCss(background)
    .withScaledLightness(1.2)
    .withScaledSaturation(1.2);
  const activeBackground = ColorUtil.fromCss(background)
    .withScaledLightness(1.5)
    .withScaledSaturation(1.5);
  console.log(hoverBackground.toCss(),activeBackground.toCss())
  return (
    <Button
      css={css`
        &:hover {
          background: ${hoverBackground.toCss()};
        }
        &:active {
          background: ${activeBackground.toCss()};
          box-shadow: 0px 0px 4px ${activeBackground.withA(0.5).toCss()};
        }
      `}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      userSelect="none"
      aspectRatio="1.0"
      margin={0}
      fontSize={fontSize}
      transformOrigin="center"
      transition="transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease"
      border="none"
      background={background}
      color={textColor}
      {...rest}
    >
      <Span css={textCss}>{children}</Span>
    </Button>
  );
}
