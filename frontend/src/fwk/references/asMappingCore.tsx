// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { forwardRef as fwdRef, HTMLAttributes} from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type HAttr<T> = HTMLAttributes<T>;



// BEGIN_AS_MAPPING_DATA

// div -- HTMLDivElement
// span -- HTMLSpanElement
// details -- HTMLDetailsElement
// summary -- HTMLElement
// b -- HTMLElement
// i -- HTMLElement
// a -- HTMLAnchorElement
// abbr -- HTMLElement
// address -- HTMLElement
// area -- HTMLAreaElement
// article -- HTMLElement
// aside -- HTMLElement
// audio -- HTMLAudioElement
// bdi -- HTMLElement
// bdo -- HTMLElement
// blockquote -- HTMLQuoteElement
// br -- HTMLBRElement
// button -- HTMLButtonElement
// canvas -- HTMLCanvasElement
// caption -- HTMLTableCaptionElement
// cite -- HTMLElement
// code -- HTMLElement
// col -- HTMLTableColElement
// colgroup -- HTMLTableColElement
// data -- HTMLDataElement
// datalist -- HTMLDataListElement
// dd -- HTMLElement
// del -- HTMLModElement
// dfn -- HTMLElement
// dialog -- HTMLDialogElement
// dl -- HTMLDListElement
// dt -- HTMLElement
// em -- HTMLElement
// embed -- HTMLEmbedElement
// fieldset -- HTMLFieldSetElement
// figcaption -- HTMLElement
// figure -- HTMLElement
// footer -- HTMLElement
// form -- HTMLFormElement
// h1 -- HTMLHeadingElement
// h2 -- HTMLHeadingElement
// h3 -- HTMLHeadingElement
// h4 -- HTMLHeadingElement
// h5 -- HTMLHeadingElement
// h6 -- HTMLHeadingElement
// head -- HTMLHeadElement
// header -- HTMLHeadElement
// hgroup -- HTMLElement
// hr -- HTMLHRElement
// html -- HTMLHtmlElement
// iframe -- HTMLIFrameElement
// img -- HTMLImageElement
// input -- HTMLInputElement
// ins -- HTMLModElement
// kbd -- HTMLElement
// label -- HTMLLabelElement
// legend -- HTMLLegendElement
// li -- HTMLLIElement
// link -- HTMLLinkElement
// main -- HTMLElement
// map -- HTMLMapElement
// mark -- HTMLElement
// menu -- HTMLMenuElement

// END_AS_MAPPING_DATA

export const asMapping = {
    
'div': fwdRef<HTMLDivElement, HAttr<HTMLDivElement>>(
    (props, ref) => <div ref={ref} {...props} />
),


'span': fwdRef<HTMLSpanElement, HAttr<HTMLSpanElement>>(
    (props, ref) => <span ref={ref} {...props} />
),


'details': fwdRef<HTMLDetailsElement, HAttr<HTMLDetailsElement>>(
    (props, ref) => <details ref={ref} {...props} />
),


'summary': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <summary ref={ref} {...props} />
),


'b': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <b ref={ref} {...props} />
),


'i': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <i ref={ref} {...props} />
),


'a': fwdRef<HTMLAnchorElement, HAttr<HTMLAnchorElement>>(
    (props, ref) => <a ref={ref} {...props} />
),


'abbr': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <abbr ref={ref} {...props} />
),


'address': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <address ref={ref} {...props} />
),


'area': fwdRef<HTMLAreaElement, HAttr<HTMLAreaElement>>(
    (props, ref) => <area ref={ref} {...props} />
),


'article': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <article ref={ref} {...props} />
),


'aside': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <aside ref={ref} {...props} />
),


'audio': fwdRef<HTMLAudioElement, HAttr<HTMLAudioElement>>(
    (props, ref) => <audio ref={ref} {...props} />
),


'bdi': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <bdi ref={ref} {...props} />
),


'bdo': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <bdo ref={ref} {...props} />
),


'blockquote': fwdRef<HTMLQuoteElement, HAttr<HTMLQuoteElement>>(
    (props, ref) => <blockquote ref={ref} {...props} />
),


'br': fwdRef<HTMLBRElement, HAttr<HTMLBRElement>>(
    (props, ref) => <br ref={ref} {...props} />
),


'button': fwdRef<HTMLButtonElement, HAttr<HTMLButtonElement>>(
    (props, ref) => <button ref={ref} {...props} />
),


'canvas': fwdRef<HTMLCanvasElement, HAttr<HTMLCanvasElement>>(
    (props, ref) => <canvas ref={ref} {...props} />
),


'caption': fwdRef<HTMLTableCaptionElement, HAttr<HTMLTableCaptionElement>>(
    (props, ref) => <caption ref={ref} {...props} />
),


'cite': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <cite ref={ref} {...props} />
),


'code': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <code ref={ref} {...props} />
),


'col': fwdRef<HTMLTableColElement, HAttr<HTMLTableColElement>>(
    (props, ref) => <col ref={ref} {...props} />
),


'colgroup': fwdRef<HTMLTableColElement, HAttr<HTMLTableColElement>>(
    (props, ref) => <colgroup ref={ref} {...props} />
),


'data': fwdRef<HTMLDataElement, HAttr<HTMLDataElement>>(
    (props, ref) => <data ref={ref} {...props} />
),


'datalist': fwdRef<HTMLDataListElement, HAttr<HTMLDataListElement>>(
    (props, ref) => <datalist ref={ref} {...props} />
),


'dd': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <dd ref={ref} {...props} />
),


'del': fwdRef<HTMLModElement, HAttr<HTMLModElement>>(
    (props, ref) => <del ref={ref} {...props} />
),


'dfn': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <dfn ref={ref} {...props} />
),


'dialog': fwdRef<HTMLDialogElement, HAttr<HTMLDialogElement>>(
    (props, ref) => <dialog ref={ref} {...props} />
),


'dl': fwdRef<HTMLDListElement, HAttr<HTMLDListElement>>(
    (props, ref) => <dl ref={ref} {...props} />
),


'dt': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <dt ref={ref} {...props} />
),


'em': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <em ref={ref} {...props} />
),


'embed': fwdRef<HTMLEmbedElement, HAttr<HTMLEmbedElement>>(
    (props, ref) => <embed ref={ref} {...props} />
),


'fieldset': fwdRef<HTMLFieldSetElement, HAttr<HTMLFieldSetElement>>(
    (props, ref) => <fieldset ref={ref} {...props} />
),


'figcaption': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <figcaption ref={ref} {...props} />
),


'figure': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <figure ref={ref} {...props} />
),


'footer': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <footer ref={ref} {...props} />
),


'form': fwdRef<HTMLFormElement, HAttr<HTMLFormElement>>(
    (props, ref) => <form ref={ref} {...props} />
),


'h1': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h1 ref={ref} {...props} />
),


'h2': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h2 ref={ref} {...props} />
),


'h3': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h3 ref={ref} {...props} />
),


'h4': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h4 ref={ref} {...props} />
),


'h5': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h5 ref={ref} {...props} />
),


'h6': fwdRef<HTMLHeadingElement, HAttr<HTMLHeadingElement>>(
    (props, ref) => <h6 ref={ref} {...props} />
),


'head': fwdRef<HTMLHeadElement, HAttr<HTMLHeadElement>>(
    (props, ref) => <head ref={ref} {...props} />
),


'header': fwdRef<HTMLHeadElement, HAttr<HTMLHeadElement>>(
    (props, ref) => <header ref={ref} {...props} />
),


'hgroup': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <hgroup ref={ref} {...props} />
),


'hr': fwdRef<HTMLHRElement, HAttr<HTMLHRElement>>(
    (props, ref) => <hr ref={ref} {...props} />
),


'html': fwdRef<HTMLHtmlElement, HAttr<HTMLHtmlElement>>(
    (props, ref) => <html ref={ref} {...props} />
),


'iframe': fwdRef<HTMLIFrameElement, HAttr<HTMLIFrameElement>>(
    (props, ref) => <iframe ref={ref} {...props} />
),


'img': fwdRef<HTMLImageElement, HAttr<HTMLImageElement>>(
    (props, ref) => <img ref={ref} {...props} />
),


'input': fwdRef<HTMLInputElement, HAttr<HTMLInputElement>>(
    (props, ref) => <input ref={ref} {...props} />
),


'ins': fwdRef<HTMLModElement, HAttr<HTMLModElement>>(
    (props, ref) => <ins ref={ref} {...props} />
),


'kbd': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <kbd ref={ref} {...props} />
),


'label': fwdRef<HTMLLabelElement, HAttr<HTMLLabelElement>>(
    (props, ref) => <label ref={ref} {...props} />
),


'legend': fwdRef<HTMLLegendElement, HAttr<HTMLLegendElement>>(
    (props, ref) => <legend ref={ref} {...props} />
),


'li': fwdRef<HTMLLIElement, HAttr<HTMLLIElement>>(
    (props, ref) => <li ref={ref} {...props} />
),


'link': fwdRef<HTMLLinkElement, HAttr<HTMLLinkElement>>(
    (props, ref) => <link ref={ref} {...props} />
),


'main': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <main ref={ref} {...props} />
),


'map': fwdRef<HTMLMapElement, HAttr<HTMLMapElement>>(
    (props, ref) => <map ref={ref} {...props} />
),


'mark': fwdRef<HTMLElement, HAttr<HTMLElement>>(
    (props, ref) => <mark ref={ref} {...props} />
),


'menu': fwdRef<HTMLMenuElement, HAttr<HTMLMenuElement>>(
    (props, ref) => <menu ref={ref} {...props} />
),

  } as const;

export default asMapping;