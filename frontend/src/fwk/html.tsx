
import B, {BProps} from './B';
import {AsElementType} from './references/asMapping';
import {forwardRef} from 'react';


export interface DivProps extends Omit<BProps<'div'>,'as'> {}
export const Div=forwardRef<AsElementType['div'],DivProps>((props,ref)=> {
    return <B baseRef={ref} as="div" {...props} />
})

export interface SpanProps extends Omit<BProps<'span'>,'as'> {}
export const Span=forwardRef<AsElementType['span'],SpanProps>((props,ref)=> {
    return <B baseRef={ref} as="span" {...props} />
})

export interface DetailsProps extends Omit<BProps<'details'>,'as'> {}
export const Details=forwardRef<AsElementType['details'],DetailsProps>((props,ref)=> {
    return <B baseRef={ref} as="details" {...props} />
})

export interface SummaryProps extends Omit<BProps<'summary'>,'as'> {}
export const Summary=forwardRef<AsElementType['summary'],SummaryProps>((props,ref)=> {
    return <B baseRef={ref} as="summary" {...props} />
})

export interface BoldProps extends Omit<BProps<'b'>,'as'> {}
  export const Bold=forwardRef<AsElementType['b'],BoldProps>((props,ref)=> {
      return <B baseRef={ref} as="b" {...props} />
  })
  
export interface IProps extends Omit<BProps<'i'>,'as'> {}
export const I=forwardRef<AsElementType['i'],IProps>((props,ref)=> {
    return <B baseRef={ref} as="i" {...props} />
})

export interface AProps extends Omit<BProps<'a'>,'as'> {}
export const A=forwardRef<AsElementType['a'],AProps>((props,ref)=> {
    return <B baseRef={ref} as="a" {...props} />
})

export interface AbbrProps extends Omit<BProps<'abbr'>,'as'> {}
export const Abbr=forwardRef<AsElementType['abbr'],AbbrProps>((props,ref)=> {
    return <B baseRef={ref} as="abbr" {...props} />
})

export interface AddressProps extends Omit<BProps<'address'>,'as'> {}
export const Address=forwardRef<AsElementType['address'],AddressProps>((props,ref)=> {
    return <B baseRef={ref} as="address" {...props} />
})

export interface AreaProps extends Omit<BProps<'area'>,'as'> {}
export const Area=forwardRef<AsElementType['area'],AreaProps>((props,ref)=> {
    return <B baseRef={ref} as="area" {...props} />
})

export interface ArticleProps extends Omit<BProps<'article'>,'as'> {}
export const Article=forwardRef<AsElementType['article'],ArticleProps>((props,ref)=> {
    return <B baseRef={ref} as="article" {...props} />
})

export interface AsideProps extends Omit<BProps<'aside'>,'as'> {}
export const Aside=forwardRef<AsElementType['aside'],AsideProps>((props,ref)=> {
    return <B baseRef={ref} as="aside" {...props} />
})

export interface AudioProps extends Omit<BProps<'audio'>,'as'> {}
export const Audio=forwardRef<AsElementType['audio'],AudioProps>((props,ref)=> {
    return <B baseRef={ref} as="audio" {...props} />
})

export interface BdiProps extends Omit<BProps<'bdi'>,'as'> {}
export const Bdi=forwardRef<AsElementType['bdi'],BdiProps>((props,ref)=> {
    return <B baseRef={ref} as="bdi" {...props} />
})

export interface BdoProps extends Omit<BProps<'bdo'>,'as'> {}
export const Bdo=forwardRef<AsElementType['bdo'],BdoProps>((props,ref)=> {
    return <B baseRef={ref} as="bdo" {...props} />
})

export interface BlockquoteProps extends Omit<BProps<'blockquote'>,'as'> {}
export const Blockquote=forwardRef<AsElementType['blockquote'],BlockquoteProps>((props,ref)=> {
    return <B baseRef={ref} as="blockquote" {...props} />
})

export interface BrProps extends Omit<BProps<'br'>,'as'> {}
export const Br=forwardRef<AsElementType['br'],BrProps>((props,ref)=> {
    return <B baseRef={ref} as="br" {...props} />
})

export interface ButtonProps extends Omit<BProps<'button'>,'as'> {}
export const Button=forwardRef<AsElementType['button'],ButtonProps>((props,ref)=> {
    return <B baseRef={ref} as="button" {...props} />
})

export interface CanvasProps extends Omit<BProps<'canvas'>,'as'> {}
export const Canvas=forwardRef<AsElementType['canvas'],CanvasProps>((props,ref)=> {
    return <B baseRef={ref} as="canvas" {...props} />
})

export interface CaptionProps extends Omit<BProps<'caption'>,'as'> {}
export const Caption=forwardRef<AsElementType['caption'],CaptionProps>((props,ref)=> {
    return <B baseRef={ref} as="caption" {...props} />
})

export interface CiteProps extends Omit<BProps<'cite'>,'as'> {}
export const Cite=forwardRef<AsElementType['cite'],CiteProps>((props,ref)=> {
    return <B baseRef={ref} as="cite" {...props} />
})

export interface CodeProps extends Omit<BProps<'code'>,'as'> {}
export const Code=forwardRef<AsElementType['code'],CodeProps>((props,ref)=> {
    return <B baseRef={ref} as="code" {...props} />
})

export interface ColProps extends Omit<BProps<'col'>,'as'> {}
export const Col=forwardRef<AsElementType['col'],ColProps>((props,ref)=> {
    return <B baseRef={ref} as="col" {...props} />
})

export interface ColgroupProps extends Omit<BProps<'colgroup'>,'as'> {}
export const Colgroup=forwardRef<AsElementType['colgroup'],ColgroupProps>((props,ref)=> {
    return <B baseRef={ref} as="colgroup" {...props} />
})

export interface DataProps extends Omit<BProps<'data'>,'as'> {}
export const Data=forwardRef<AsElementType['data'],DataProps>((props,ref)=> {
    return <B baseRef={ref} as="data" {...props} />
})

export interface DatalistProps extends Omit<BProps<'datalist'>,'as'> {}
export const Datalist=forwardRef<AsElementType['datalist'],DatalistProps>((props,ref)=> {
    return <B baseRef={ref} as="datalist" {...props} />
})

export interface DdProps extends Omit<BProps<'dd'>,'as'> {}
export const Dd=forwardRef<AsElementType['dd'],DdProps>((props,ref)=> {
    return <B baseRef={ref} as="dd" {...props} />
})

export interface DelProps extends Omit<BProps<'del'>,'as'> {}
export const Del=forwardRef<AsElementType['del'],DelProps>((props,ref)=> {
    return <B baseRef={ref} as="del" {...props} />
})

export interface DfnProps extends Omit<BProps<'dfn'>,'as'> {}
export const Dfn=forwardRef<AsElementType['dfn'],DfnProps>((props,ref)=> {
    return <B baseRef={ref} as="dfn" {...props} />
})

export interface DialogProps extends Omit<BProps<'dialog'>,'as'> {}
export const Dialog=forwardRef<AsElementType['dialog'],DialogProps>((props,ref)=> {
    return <B baseRef={ref} as="dialog" {...props} />
})

export interface DlProps extends Omit<BProps<'dl'>,'as'> {}
export const Dl=forwardRef<AsElementType['dl'],DlProps>((props,ref)=> {
    return <B baseRef={ref} as="dl" {...props} />
})

export interface DtProps extends Omit<BProps<'dt'>,'as'> {}
export const Dt=forwardRef<AsElementType['dt'],DtProps>((props,ref)=> {
    return <B baseRef={ref} as="dt" {...props} />
})

export interface EmProps extends Omit<BProps<'em'>,'as'> {}
export const Em=forwardRef<AsElementType['em'],EmProps>((props,ref)=> {
    return <B baseRef={ref} as="em" {...props} />
})

export interface EmbedProps extends Omit<BProps<'embed'>,'as'> {}
export const Embed=forwardRef<AsElementType['embed'],EmbedProps>((props,ref)=> {
    return <B baseRef={ref} as="embed" {...props} />
})

export interface FieldsetProps extends Omit<BProps<'fieldset'>,'as'> {}
export const Fieldset=forwardRef<AsElementType['fieldset'],FieldsetProps>((props,ref)=> {
    return <B baseRef={ref} as="fieldset" {...props} />
})

export interface FigcaptionProps extends Omit<BProps<'figcaption'>,'as'> {}
export const Figcaption=forwardRef<AsElementType['figcaption'],FigcaptionProps>((props,ref)=> {
    return <B baseRef={ref} as="figcaption" {...props} />
})

export interface FigureProps extends Omit<BProps<'figure'>,'as'> {}
export const Figure=forwardRef<AsElementType['figure'],FigureProps>((props,ref)=> {
    return <B baseRef={ref} as="figure" {...props} />
})

export interface FooterProps extends Omit<BProps<'footer'>,'as'> {}
export const Footer=forwardRef<AsElementType['footer'],FooterProps>((props,ref)=> {
    return <B baseRef={ref} as="footer" {...props} />
})

export interface FormProps extends Omit<BProps<'form'>,'as'> {}
export const Form=forwardRef<AsElementType['form'],FormProps>((props,ref)=> {
    return <B baseRef={ref} as="form" {...props} />
})

export interface H1Props extends Omit<BProps<'h1'>,'as'> {}
export const H1=forwardRef<AsElementType['h1'],H1Props>((props,ref)=> {
    return <B baseRef={ref} as="h1" {...props} />
})

export interface H2Props extends Omit<BProps<'h2'>,'as'> {}
export const H2=forwardRef<AsElementType['h2'],H2Props>((props,ref)=> {
    return <B baseRef={ref} as="h2" {...props} />
})

export interface H3Props extends Omit<BProps<'h3'>,'as'> {}
export const H3=forwardRef<AsElementType['h3'],H3Props>((props,ref)=> {
    return <B baseRef={ref} as="h3" {...props} />
})

export interface H4Props extends Omit<BProps<'h4'>,'as'> {}
export const H4=forwardRef<AsElementType['h4'],H4Props>((props,ref)=> {
    return <B baseRef={ref} as="h4" {...props} />
})

export interface H5Props extends Omit<BProps<'h5'>,'as'> {}
export const H5=forwardRef<AsElementType['h5'],H5Props>((props,ref)=> {
    return <B baseRef={ref} as="h5" {...props} />
})

export interface H6Props extends Omit<BProps<'h6'>,'as'> {}
export const H6=forwardRef<AsElementType['h6'],H6Props>((props,ref)=> {
    return <B baseRef={ref} as="h6" {...props} />
})

export interface HeadProps extends Omit<BProps<'head'>,'as'> {}
export const Head=forwardRef<AsElementType['head'],HeadProps>((props,ref)=> {
    return <B baseRef={ref} as="head" {...props} />
})

export interface HeaderProps extends Omit<BProps<'header'>,'as'> {}
export const Header=forwardRef<AsElementType['header'],HeaderProps>((props,ref)=> {
    return <B baseRef={ref} as="header" {...props} />
})

export interface HgroupProps extends Omit<BProps<'hgroup'>,'as'> {}
export const Hgroup=forwardRef<AsElementType['hgroup'],HgroupProps>((props,ref)=> {
    return <B baseRef={ref} as="hgroup" {...props} />
})

export interface HrProps extends Omit<BProps<'hr'>,'as'> {}
export const Hr=forwardRef<AsElementType['hr'],HrProps>((props,ref)=> {
    return <B baseRef={ref} as="hr" {...props} />
})

export interface HtmlProps extends Omit<BProps<'html'>,'as'> {}
export const Html=forwardRef<AsElementType['html'],HtmlProps>((props,ref)=> {
    return <B baseRef={ref} as="html" {...props} />
})

export interface IframeProps extends Omit<BProps<'iframe'>,'as'> {}
export const Iframe=forwardRef<AsElementType['iframe'],IframeProps>((props,ref)=> {
    return <B baseRef={ref} as="iframe" {...props} />
})

export interface ImgProps extends Omit<BProps<'img'>,'as'> {}
export const Img=forwardRef<AsElementType['img'],ImgProps>((props,ref)=> {
    return <B baseRef={ref} as="img" {...props} />
})

export interface InputProps extends Omit<BProps<'input'>,'as'> {}
export const Input=forwardRef<AsElementType['input'],InputProps>((props,ref)=> {
    return <B baseRef={ref} as="input" {...props} />
})

export interface InsProps extends Omit<BProps<'ins'>,'as'> {}
export const Ins=forwardRef<AsElementType['ins'],InsProps>((props,ref)=> {
    return <B baseRef={ref} as="ins" {...props} />
})

export interface KbdProps extends Omit<BProps<'kbd'>,'as'> {}
export const Kbd=forwardRef<AsElementType['kbd'],KbdProps>((props,ref)=> {
    return <B baseRef={ref} as="kbd" {...props} />
})

export interface LabelProps extends Omit<BProps<'label'>,'as'> {}
export const Label=forwardRef<AsElementType['label'],LabelProps>((props,ref)=> {
    return <B baseRef={ref} as="label" {...props} />
})

export interface LegendProps extends Omit<BProps<'legend'>,'as'> {}
export const Legend=forwardRef<AsElementType['legend'],LegendProps>((props,ref)=> {
    return <B baseRef={ref} as="legend" {...props} />
})

export interface LiProps extends Omit<BProps<'li'>,'as'> {}
export const Li=forwardRef<AsElementType['li'],LiProps>((props,ref)=> {
    return <B baseRef={ref} as="li" {...props} />
})

export interface LinkProps extends Omit<BProps<'link'>,'as'> {}
export const Link=forwardRef<AsElementType['link'],LinkProps>((props,ref)=> {
    return <B baseRef={ref} as="link" {...props} />
})

export interface MainProps extends Omit<BProps<'main'>,'as'> {}
export const Main=forwardRef<AsElementType['main'],MainProps>((props,ref)=> {
    return <B baseRef={ref} as="main" {...props} />
})

export interface MapProps extends Omit<BProps<'map'>,'as'> {}
export const Map=forwardRef<AsElementType['map'],MapProps>((props,ref)=> {
    return <B baseRef={ref} as="map" {...props} />
})

export interface MarkProps extends Omit<BProps<'mark'>,'as'> {}
export const Mark=forwardRef<AsElementType['mark'],MarkProps>((props,ref)=> {
    return <B baseRef={ref} as="mark" {...props} />
})

export interface MenuProps extends Omit<BProps<'menu'>,'as'> {}
export const Menu=forwardRef<AsElementType['menu'],MenuProps>((props,ref)=> {
    return <B baseRef={ref} as="menu" {...props} />
})
