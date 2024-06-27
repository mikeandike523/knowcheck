import {
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import asMapping from "./asMappingCore";

export { asMapping };

export type AsElementType = {
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends FC<
    HTMLAttributes<infer ElementType>
  >
    ? ElementType
    : never;
};

export type AsPropsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends ForwardRefExoticComponent<
    infer Props
  > &
    RefAttributes<any>
    ? Props
    : never;
};

export type AsRefType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends ForwardRefExoticComponent<any> &
    RefAttributes<infer Ref>
    ? Ref
    : never;
};

export type AsExoticType = {
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends ForwardRefExoticComponent<
    infer Props
  > &
    RefAttributes<infer ElementType>
    ? ForwardRefExoticComponent<Props> & RefAttributes<ElementType>
    : never;
};

export type AsType = keyof typeof asMapping;

export type SpecificAsPropsType<T extends AsType> = AsPropsType[T];

export type SpecificAsExoticType<T extends AsType> = AsExoticType[T];
