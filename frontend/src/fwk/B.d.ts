import { SerializedStyles } from "@emotion/react";
import { CSSProperties, ForwardedRef } from "react";
import { AsElementType, AsType, SpecificAsPropsType } from "./references/asMapping";
import { StylePropTypeMapping } from "./styleProps";
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
};
export declare function styleEngine<TProps extends object>(props: TProps): {
    stylePropRest: CSSProperties;
    nonStylePropsRest: object;
};
export declare function stylesToCssString(styles: Record<string, any>): string;
export declare const B: <T extends AsType>({ baseCss, css: overrideCss, as, baseRef, ...rest }: BProps<T>) => import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export default B;
