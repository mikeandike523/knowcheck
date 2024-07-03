const svgText = `
<svg width="100" height="40" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <circle cx="15" cy="20" r="10">
    <animate attributeName="r" from="10" to="5" begin="0s" dur="0.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" from="1" to="0.5" begin="0s" dur="0.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="50" cy="20" r="10">
    <animate attributeName="r" from="10" to="5" begin="0.2s" dur="0.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" from="1" to="0.5" begin="0.2s" dur="0.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="85" cy="20" r="10">
    <animate attributeName="r" from="10" to="5" begin="0.4s" dur="0.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" from="1" to="0.5" begin="0.4s" dur="0.8s" repeatCount="indefinite" />
  </circle>
</svg>
`;

import SVG, { Props as SVGProps } from "react-inlinesvg";

export interface LoadingEllipsesProps extends Omit<SVGProps, "src"> {}

export default function LoadingEllipses({style,...rest}: LoadingEllipsesProps) {
  const textAsBase64Src = `data:image/svg+xml;base64,${btoa(svgText)}`;
  return <SVG style={{...style,...{
    width:"2.5em",
    height:"1em"
  }}} src={textAsBase64Src} {...rest} />;
}
