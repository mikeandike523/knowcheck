import { FC, HTMLAttributes, forwardRef, ForwardedRef } from "react";

export const asMapping = {
  h1: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h1 ref={ref} {...props} />,
  ),
  h2: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h2 ref={ref} {...props} />,
  ),
  h3: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h3 ref={ref} {...props} />,
  ),
  h4: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h4 ref={ref} {...props} />,
  ),
  h5: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h5 ref={ref} {...props} />,
  ),
  h6: forwardRef(
    (
      props: HTMLAttributes<HTMLHeadingElement>,
      ref: ForwardedRef<HTMLHeadingElement>,
    ) => <h6 ref={ref} {...props} />,
  ),
  p: forwardRef(
    (
      props: HTMLAttributes<HTMLParagraphElement>,
      ref: ForwardedRef<HTMLParagraphElement>,
    ) => <p ref={ref} {...props} />,
  ),
  a: forwardRef(
    (
      props: HTMLAttributes<HTMLAnchorElement>,
      ref: ForwardedRef<HTMLAnchorElement>,
    ) => <a ref={ref} {...props} />,
  ),
  img: forwardRef(
    (
      props: HTMLAttributes<HTMLImageElement>,
      ref: ForwardedRef<HTMLImageElement>,
    ) => <img ref={ref} {...props} />,
  ),
  div: forwardRef(
    (
      props: HTMLAttributes<HTMLDivElement>,
      ref: ForwardedRef<HTMLDivElement>,
    ) => <div ref={ref} {...props} />,
  ),
  span: forwardRef(
    (
      props: HTMLAttributes<HTMLSpanElement>,
      ref: ForwardedRef<HTMLSpanElement>,
    ) => <span ref={ref} {...props} />,
  ),
  button: forwardRef(
    (
      props: HTMLAttributes<HTMLButtonElement>,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => <button ref={ref} {...props} />,
  ),
  input: forwardRef(
    (
      props: HTMLAttributes<HTMLInputElement>,
      ref: ForwardedRef<HTMLInputElement>,
    ) => <input ref={ref} {...props} />,
  ),
  textarea: forwardRef(
    (
      props: HTMLAttributes<HTMLTextAreaElement>,
      ref: ForwardedRef<HTMLTextAreaElement>,
    ) => <textarea ref={ref} {...props} />,
  ),
  select: forwardRef(
    (
      props: HTMLAttributes<HTMLSelectElement>,
      ref: ForwardedRef<HTMLSelectElement>,
    ) => <select ref={ref} {...props} />,
  ),
  option: forwardRef(
    (
      props: HTMLAttributes<HTMLOptionElement>,
      ref: ForwardedRef<HTMLOptionElement>,
    ) => <option ref={ref} {...props} />,
  ),
  label: forwardRef(
    (
      props: HTMLAttributes<HTMLLabelElement>,
      ref: ForwardedRef<HTMLLabelElement>,
    ) => <label ref={ref} {...props} />,
  ),
  form: forwardRef(
    (
      props: HTMLAttributes<HTMLFormElement>,
      ref: ForwardedRef<HTMLFormElement>,
    ) => <form ref={ref} {...props} />,
  ),
  table: forwardRef(
    (
      props: HTMLAttributes<HTMLTableElement>,
      ref: ForwardedRef<HTMLTableElement>,
    ) => <table ref={ref} {...props} />,
  ),
  thead: forwardRef(
    (
      props: HTMLAttributes<HTMLTableSectionElement>,
      ref: ForwardedRef<HTMLTableSectionElement>,
    ) => <thead ref={ref} {...props} />,
  ),
  tbody: forwardRef(
    (
      props: HTMLAttributes<HTMLTableSectionElement>,
      ref: ForwardedRef<HTMLTableSectionElement>,
    ) => <tbody ref={ref} {...props} />,
  ),
  tfoot: forwardRef(
    (
      props: HTMLAttributes<HTMLTableSectionElement>,
      ref: ForwardedRef<HTMLTableSectionElement>,
    ) => <tfoot ref={ref} {...props} />,
  ),
  tr: forwardRef(
    (
      props: HTMLAttributes<HTMLTableRowElement>,
      ref: ForwardedRef<HTMLTableRowElement>,
    ) => <tr ref={ref} {...props} />,
  ),
  td: forwardRef(
    (
      props: HTMLAttributes<HTMLTableDataCellElement>,
      ref: ForwardedRef<HTMLTableDataCellElement>,
    ) => <td ref={ref} {...props} />,
  ),
  th: forwardRef(
    (
      props: HTMLAttributes<HTMLTableHeaderCellElement>,
      ref: ForwardedRef<HTMLTableHeaderCellElement>,
    ) => <th ref={ref} {...props} />,
  ),
  ul: forwardRef(
    (
      props: HTMLAttributes<HTMLUListElement>,
      ref: ForwardedRef<HTMLUListElement>,
    ) => <ul ref={ref} {...props} />,
  ),
  ol: forwardRef(
    (
      props: HTMLAttributes<HTMLOListElement>,
      ref: ForwardedRef<HTMLOListElement>,
    ) => <ol ref={ref} {...props} />,
  ),
  li: forwardRef(
    (
      props: HTMLAttributes<HTMLLIElement>,
      ref: ForwardedRef<HTMLLIElement>,
    ) => <li ref={ref} {...props} />,
  ),
  nav: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <nav ref={ref} {...props} />
    ),
  ),
  header: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <header ref={ref} {...props} />
    ),
  ),
  footer: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <footer ref={ref} {...props} />
    ),
  ),
  section: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <section ref={ref} {...props} />
    ),
  ),
  article: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <article ref={ref} {...props} />
    ),
  ),
  aside: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <aside ref={ref} {...props} />
    ),
  ),
  main: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <main ref={ref} {...props} />
    ),
  ),
  figure: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <figure ref={ref} {...props} />
    ),
  ),
  figcaption: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <figcaption ref={ref} {...props} />
    ),
  ),
  details: forwardRef(
    (
      props: HTMLAttributes<HTMLDetailsElement>,
      ref: ForwardedRef<HTMLDetailsElement>,
    ) => <details ref={ref} {...props} />,
  ),
  summary: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <summary ref={ref} {...props} />
    ),
  ),
  mark: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <mark ref={ref} {...props} />
    ),
  ),
  progress: forwardRef(
    (
      props: HTMLAttributes<HTMLProgressElement>,
      ref: ForwardedRef<HTMLProgressElement>,
    ) => <progress ref={ref} {...props} />,
  ),
  meter: forwardRef(
    (
      props: HTMLAttributes<HTMLMeterElement>,
      ref: ForwardedRef<HTMLMeterElement>,
    ) => <meter ref={ref} {...props} />,
  ),
  blockquote: forwardRef(
    (
      props: HTMLAttributes<HTMLQuoteElement>,
      ref: ForwardedRef<HTMLQuoteElement>,
    ) => <blockquote ref={ref} {...props} />,
  ),
  cite: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <cite ref={ref} {...props} />
    ),
  ),
  code: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <code ref={ref} {...props} />
    ),
  ),
  pre: forwardRef(
    (
      props: HTMLAttributes<HTMLPreElement>,
      ref: ForwardedRef<HTMLPreElement>,
    ) => <pre ref={ref} {...props} />,
  ),
  time: forwardRef(
    (
      props: HTMLAttributes<HTMLTimeElement>,
      ref: ForwardedRef<HTMLTimeElement>,
    ) => <time ref={ref} {...props} />,
  ),
  var: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <var ref={ref} {...props} />
    ),
  ),
  kbd: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <kbd ref={ref} {...props} />
    ),
  ),
  samp: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <samp ref={ref} {...props} />
    ),
  ),
  italic: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <i ref={ref} {...props} />
    ),
  ),
  bold: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <b ref={ref} {...props} />
    ),
  ),
  strong: forwardRef(
    (props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) => (
      <strong ref={ref} {...props} />
    ),
  ),
  hr: forwardRef(
    (
      props: HTMLAttributes<HTMLHRElement>,
      ref: ForwardedRef<HTMLHRElement>,
    ) => <hr ref={ref} {...props} />,
  )
} as const;

export type AsElementType = {
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends FC<HTMLAttributes<infer ElementType>>
    ? ElementType
    : never;
};

export type AsPropsType = {
  [P in keyof typeof asMapping]: (typeof asMapping)[P] extends FC<infer Props>
    ? Props
    : never;
};

export type AsType = keyof typeof asMapping;

export type SpecificAsPropsType<T extends AsType> = AsPropsType[T];
