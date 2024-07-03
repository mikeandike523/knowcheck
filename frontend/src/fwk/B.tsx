import { css, SerializedStyles } from "@emotion/react";
import lodash from "lodash";
import {
  CSSProperties,
  ForwardedRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";

import {
  AsElementType,
  asMapping,
  AsType,
  SpecificAsPropsType
} from "./references/asMapping";
import { allStyleProps, StylePropTypeMapping } from "./styleProps";

export type BProps<T extends AsType> = SpecificAsPropsType<T> & {
  as: T;
  css?: SerializedStyles;
  baseCss?: SerializedStyles;
  baseRef?: ForwardedRef<AsElementType[T]>;
} & {
  [P in keyof StylePropTypeMapping]?: undefined | StylePropTypeMapping[P];
};

export type StyleProps = {
  [P in keyof StylePropTypeMapping]?: undefined | StylePropTypeMapping[P];
}

export function styleEngine<TProps extends object>(
  props:TProps
){
  const stylePropRest = lodash.pick(props, allStyleProps) as CSSProperties;
  const nonStylePropsRest = lodash.omit(
    props,
    allStyleProps,
  ) as object;
  return {
    stylePropRest,
    nonStylePropsRest,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stylesToCssString(styles: Record<string,any>) {
  return Object.entries(styles)
   .map(
      ([styleProp, value]) => `${lodash.kebabCase(styleProp)}: ${value};`,
    )
   .join("\n")
}

export const B = <T extends AsType>({
  baseCss = css``,
  css: overrideCss,
  as,
  baseRef,
  ...rest
}: BProps<T>) => {
  const HTMLComponent = asMapping[as] as ForwardRefExoticComponent<
    HTMLAttributes<SpecificAsPropsType<T>> & {
      ref?: ForwardedRef<AsElementType[T]> | undefined;
    }
  >;
  const { stylePropRest, nonStylePropsRest } = styleEngine(rest)

  return (
    <HTMLComponent
      ref={baseRef}
      css={css`
        ${baseCss};
        ${overrideCss};
        ${stylesToCssString(stylePropRest)};
      `}
      {...(nonStylePropsRest as object)}
    />
  );
};

export default B;
