
import B, {BProps} from './B';
import {AsElementType} from './references/asMapping';
import {forwardRef} from 'react';


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

export interface PProps extends Omit<BProps<'p'>,'as'> {}
export const P=forwardRef<AsElementType['p'],PProps>((props,ref)=> {
    return <B baseRef={ref} as="p" {...props} />
})

export interface AProps extends Omit<BProps<'a'>,'as'> {}
export const A=forwardRef<AsElementType['a'],AProps>((props,ref)=> {
    return <B baseRef={ref} as="a" {...props} />
})

export interface ImgProps extends Omit<BProps<'img'>,'as'> {}
export const Img=forwardRef<AsElementType['img'],ImgProps>((props,ref)=> {
    return <B baseRef={ref} as="img" {...props} />
})

export interface DivProps extends Omit<BProps<'div'>,'as'> {}
export const Div=forwardRef<AsElementType['div'],DivProps>((props,ref)=> {
    return <B baseRef={ref} as="div" {...props} />
})

export interface SpanProps extends Omit<BProps<'span'>,'as'> {}
export const Span=forwardRef<AsElementType['span'],SpanProps>((props,ref)=> {
    return <B baseRef={ref} as="span" {...props} />
})

export interface ButtonProps extends Omit<BProps<'button'>,'as'> {}
export const Button=forwardRef<AsElementType['button'],ButtonProps>((props,ref)=> {
    return <B baseRef={ref} as="button" {...props} />
})

export interface InputProps extends Omit<BProps<'input'>,'as'> {}
export const Input=forwardRef<AsElementType['input'],InputProps>((props,ref)=> {
    return <B baseRef={ref} as="input" {...props} />
})

export interface TextareaProps extends Omit<BProps<'textarea'>,'as'> {}
export const Textarea=forwardRef<AsElementType['textarea'],TextareaProps>((props,ref)=> {
    return <B baseRef={ref} as="textarea" {...props} />
})

export interface SelectProps extends Omit<BProps<'select'>,'as'> {}
export const Select=forwardRef<AsElementType['select'],SelectProps>((props,ref)=> {
    return <B baseRef={ref} as="select" {...props} />
})

export interface OptionProps extends Omit<BProps<'option'>,'as'> {}
export const Option=forwardRef<AsElementType['option'],OptionProps>((props,ref)=> {
    return <B baseRef={ref} as="option" {...props} />
})

export interface LabelProps extends Omit<BProps<'label'>,'as'> {}
export const Label=forwardRef<AsElementType['label'],LabelProps>((props,ref)=> {
    return <B baseRef={ref} as="label" {...props} />
})

export interface FormProps extends Omit<BProps<'form'>,'as'> {}
export const Form=forwardRef<AsElementType['form'],FormProps>((props,ref)=> {
    return <B baseRef={ref} as="form" {...props} />
})

export interface TableProps extends Omit<BProps<'table'>,'as'> {}
export const Table=forwardRef<AsElementType['table'],TableProps>((props,ref)=> {
    return <B baseRef={ref} as="table" {...props} />
})

export interface TheadProps extends Omit<BProps<'thead'>,'as'> {}
export const Thead=forwardRef<AsElementType['thead'],TheadProps>((props,ref)=> {
    return <B baseRef={ref} as="thead" {...props} />
})

export interface TbodyProps extends Omit<BProps<'tbody'>,'as'> {}
export const Tbody=forwardRef<AsElementType['tbody'],TbodyProps>((props,ref)=> {
    return <B baseRef={ref} as="tbody" {...props} />
})

export interface TfootProps extends Omit<BProps<'tfoot'>,'as'> {}
export const Tfoot=forwardRef<AsElementType['tfoot'],TfootProps>((props,ref)=> {
    return <B baseRef={ref} as="tfoot" {...props} />
})

export interface TrProps extends Omit<BProps<'tr'>,'as'> {}
export const Tr=forwardRef<AsElementType['tr'],TrProps>((props,ref)=> {
    return <B baseRef={ref} as="tr" {...props} />
})

export interface TdProps extends Omit<BProps<'td'>,'as'> {}
export const Td=forwardRef<AsElementType['td'],TdProps>((props,ref)=> {
    return <B baseRef={ref} as="td" {...props} />
})

export interface ThProps extends Omit<BProps<'th'>,'as'> {}
export const Th=forwardRef<AsElementType['th'],ThProps>((props,ref)=> {
    return <B baseRef={ref} as="th" {...props} />
})

export interface UlProps extends Omit<BProps<'ul'>,'as'> {}
export const Ul=forwardRef<AsElementType['ul'],UlProps>((props,ref)=> {
    return <B baseRef={ref} as="ul" {...props} />
})

export interface OlProps extends Omit<BProps<'ol'>,'as'> {}
export const Ol=forwardRef<AsElementType['ol'],OlProps>((props,ref)=> {
    return <B baseRef={ref} as="ol" {...props} />
})

export interface LiProps extends Omit<BProps<'li'>,'as'> {}
export const Li=forwardRef<AsElementType['li'],LiProps>((props,ref)=> {
    return <B baseRef={ref} as="li" {...props} />
})

export interface NavProps extends Omit<BProps<'nav'>,'as'> {}
export const Nav=forwardRef<AsElementType['nav'],NavProps>((props,ref)=> {
    return <B baseRef={ref} as="nav" {...props} />
})

export interface HeaderProps extends Omit<BProps<'header'>,'as'> {}
export const Header=forwardRef<AsElementType['header'],HeaderProps>((props,ref)=> {
    return <B baseRef={ref} as="header" {...props} />
})

export interface FooterProps extends Omit<BProps<'footer'>,'as'> {}
export const Footer=forwardRef<AsElementType['footer'],FooterProps>((props,ref)=> {
    return <B baseRef={ref} as="footer" {...props} />
})

export interface SectionProps extends Omit<BProps<'section'>,'as'> {}
export const Section=forwardRef<AsElementType['section'],SectionProps>((props,ref)=> {
    return <B baseRef={ref} as="section" {...props} />
})

export interface ArticleProps extends Omit<BProps<'article'>,'as'> {}
export const Article=forwardRef<AsElementType['article'],ArticleProps>((props,ref)=> {
    return <B baseRef={ref} as="article" {...props} />
})

export interface AsideProps extends Omit<BProps<'aside'>,'as'> {}
export const Aside=forwardRef<AsElementType['aside'],AsideProps>((props,ref)=> {
    return <B baseRef={ref} as="aside" {...props} />
})

export interface MainProps extends Omit<BProps<'main'>,'as'> {}
export const Main=forwardRef<AsElementType['main'],MainProps>((props,ref)=> {
    return <B baseRef={ref} as="main" {...props} />
})

export interface FigureProps extends Omit<BProps<'figure'>,'as'> {}
export const Figure=forwardRef<AsElementType['figure'],FigureProps>((props,ref)=> {
    return <B baseRef={ref} as="figure" {...props} />
})

export interface FigcaptionProps extends Omit<BProps<'figcaption'>,'as'> {}
export const Figcaption=forwardRef<AsElementType['figcaption'],FigcaptionProps>((props,ref)=> {
    return <B baseRef={ref} as="figcaption" {...props} />
})

export interface DetailsProps extends Omit<BProps<'details'>,'as'> {}
export const Details=forwardRef<AsElementType['details'],DetailsProps>((props,ref)=> {
    return <B baseRef={ref} as="details" {...props} />
})

export interface SummaryProps extends Omit<BProps<'summary'>,'as'> {}
export const Summary=forwardRef<AsElementType['summary'],SummaryProps>((props,ref)=> {
    return <B baseRef={ref} as="summary" {...props} />
})

export interface MarkProps extends Omit<BProps<'mark'>,'as'> {}
export const Mark=forwardRef<AsElementType['mark'],MarkProps>((props,ref)=> {
    return <B baseRef={ref} as="mark" {...props} />
})

export interface ProgressProps extends Omit<BProps<'progress'>,'as'> {}
export const Progress=forwardRef<AsElementType['progress'],ProgressProps>((props,ref)=> {
    return <B baseRef={ref} as="progress" {...props} />
})

export interface MeterProps extends Omit<BProps<'meter'>,'as'> {}
export const Meter=forwardRef<AsElementType['meter'],MeterProps>((props,ref)=> {
    return <B baseRef={ref} as="meter" {...props} />
})

export interface BlockquoteProps extends Omit<BProps<'blockquote'>,'as'> {}
export const Blockquote=forwardRef<AsElementType['blockquote'],BlockquoteProps>((props,ref)=> {
    return <B baseRef={ref} as="blockquote" {...props} />
})

export interface CiteProps extends Omit<BProps<'cite'>,'as'> {}
export const Cite=forwardRef<AsElementType['cite'],CiteProps>((props,ref)=> {
    return <B baseRef={ref} as="cite" {...props} />
})

export interface CodeProps extends Omit<BProps<'code'>,'as'> {}
export const Code=forwardRef<AsElementType['code'],CodeProps>((props,ref)=> {
    return <B baseRef={ref} as="code" {...props} />
})

export interface PreProps extends Omit<BProps<'pre'>,'as'> {}
export const Pre=forwardRef<AsElementType['pre'],PreProps>((props,ref)=> {
    return <B baseRef={ref} as="pre" {...props} />
})

export interface TimeProps extends Omit<BProps<'time'>,'as'> {}
export const Time=forwardRef<AsElementType['time'],TimeProps>((props,ref)=> {
    return <B baseRef={ref} as="time" {...props} />
})

export interface VarProps extends Omit<BProps<'var'>,'as'> {}
export const Var=forwardRef<AsElementType['var'],VarProps>((props,ref)=> {
    return <B baseRef={ref} as="var" {...props} />
})

export interface KbdProps extends Omit<BProps<'kbd'>,'as'> {}
export const Kbd=forwardRef<AsElementType['kbd'],KbdProps>((props,ref)=> {
    return <B baseRef={ref} as="kbd" {...props} />
})

export interface SampProps extends Omit<BProps<'samp'>,'as'> {}
export const Samp=forwardRef<AsElementType['samp'],SampProps>((props,ref)=> {
    return <B baseRef={ref} as="samp" {...props} />
})

export interface ItalicProps extends Omit<BProps<'italic'>,'as'> {}
export const Italic=forwardRef<AsElementType['italic'],ItalicProps>((props,ref)=> {
    return <B baseRef={ref} as="italic" {...props} />
})

export interface BoldProps extends Omit<BProps<'bold'>,'as'> {}
export const Bold=forwardRef<AsElementType['bold'],BoldProps>((props,ref)=> {
    return <B baseRef={ref} as="bold" {...props} />
})

export interface StrongProps extends Omit<BProps<'strong'>,'as'> {}
export const Strong=forwardRef<AsElementType['strong'],StrongProps>((props,ref)=> {
    return <B baseRef={ref} as="strong" {...props} />
})

export interface HrProps extends Omit<BProps<'hr'>,'as'> {}
export const Hr=forwardRef<AsElementType['hr'],HrProps>((props,ref)=> {
    return <B baseRef={ref} as="hr" {...props} />
})
