import stylePropTypeMapping from "./references/stylePropTypeMapping";

type StringToType<T extends string> = T extends "number"
  ? number
  : T extends "string"
    ? string
    : T extends "boolean"
      ? boolean
      : T extends "null"
        ? null
        : T extends "undefined"
          ? undefined
          : T extends "symbol"
            ? symbol
            : T extends "bigint"
              ? bigint
              : T extends "unknown"
                ? unknown
                : T extends "object"
                  ? object
                  : // eslint-disable-next-line @typescript-eslint/ban-types
                    T extends "function"
                    ? Function
                    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      T extends "any"
                      ? any
                      : T extends `${infer U} | ${infer V}`
                        ? StringToType<U> | StringToType<V>
                        : T extends string
                          ? T
                          : never;

export type StylePropTypeMapping = {
  [P in keyof typeof stylePropTypeMapping]: StringToType<
    (typeof stylePropTypeMapping)[P]
  >;
};

export type StyleProp = keyof StylePropTypeMapping;

export const allStyleProps = Object.keys(
  stylePropTypeMapping,
) as Array<StyleProp>;
