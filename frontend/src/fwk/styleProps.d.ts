import stylePropTypeMapping from "./references/stylePropTypeMapping";
type StringToType<T extends string> = T extends "number" ? number : T extends "string" ? string : T extends "boolean" ? boolean : T extends "null" ? null : T extends "undefined" ? undefined : T extends "symbol" ? symbol : T extends "bigint" ? bigint : T extends "unknown" ? unknown : T extends "object" ? object : T extends "function" ? Function : T extends "any" ? any : T extends `${infer U} | ${infer V}` ? StringToType<U> | StringToType<V> : T extends string ? T : never;
export type StylePropTypeMapping = {
    [P in keyof typeof stylePropTypeMapping]: StringToType<(typeof stylePropTypeMapping)[P]>;
};
export type StyleProp = keyof StylePropTypeMapping;
export declare const allStyleProps: Array<StyleProp>;
export {};
