import { css, SerializedStyles } from "@emotion/react";
import lodash from "lodash";
import React, { CSSProperties, ForwardedRef} from "react";

import { AsElementType, asMapping, AsType, SpecificAsPropsType } from "./references/asMapping";
import { allStyleProps, StylePropTypeMapping } from "./styleProps";

export type BProps<T extends AsType> = SpecificAsPropsType<T> & {
  as: T;
  css?: SerializedStyles;
  baseCss?: SerializedStyles;
  baseRef?: ForwardedRef<AsElementType[T]>;
} & {
  [P in keyof StylePropTypeMapping]?: undefined | StylePropTypeMapping[P];
};

export default function B<T extends AsType>({
  baseCss = css``,
  css: overrideCss,
  as,
  baseRef,
  ...rest
}: BProps<T>) {
  const HTMLComponent = asMapping[as] as React.FC<SpecificAsPropsType<T>>;
  const stylePropRest = lodash.pick(rest, allStyleProps) as CSSProperties;
  const nonStylePropsRest = lodash.omit(
    rest,
    allStyleProps,
  ) as SpecificAsPropsType<T>;

  return (
    <HTMLComponent
      ref={baseRef}
      css={css`
        ${baseCss};
        ${overrideCss};
        ${Object.entries(stylePropRest)
          .map(
            ([styleProp, value]) => `${lodash.kebabCase(styleProp)}: ${value};`,
          )
          .join("\n")};
      `}
      {...(nonStylePropsRest as object)}
    />
  );
}
