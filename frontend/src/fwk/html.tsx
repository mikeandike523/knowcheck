import B, {BProps} from './B'


export interface H1Props extends Omit<BProps<'h1'>,'as'> {}
export function H1(props: H1Props) {
    return <B as="h1" {...props} />
}

export interface H2Props extends Omit<BProps<'h2'>,'as'> {}
export function H2(props: H2Props) {
    return <B as="h2" {...props} />
}

export interface H3Props extends Omit<BProps<'h3'>,'as'> {}
export function H3(props: H3Props) {
    return <B as="h3" {...props} />
}

export interface H4Props extends Omit<BProps<'h4'>,'as'> {}
export function H4(props: H4Props) {
    return <B as="h4" {...props} />
}

export interface H5Props extends Omit<BProps<'h5'>,'as'> {}
export function H5(props: H5Props) {
    return <B as="h5" {...props} />
}

export interface H6Props extends Omit<BProps<'h6'>,'as'> {}
export function H6(props: H6Props) {
    return <B as="h6" {...props} />
}

export interface PProps extends Omit<BProps<'p'>,'as'> {}
export function P(props: PProps) {
    return <B as="p" {...props} />
}

export interface AProps extends Omit<BProps<'a'>,'as'> {}
export function A(props: AProps) {
    return <B as="a" {...props} />
}

export interface ImgProps extends Omit<BProps<'img'>,'as'> {}
export function Img(props: ImgProps) {
    return <B as="img" {...props} />
}

export interface DivProps extends Omit<BProps<'div'>,'as'> {}
export function Div(props: DivProps) {
    return <B as="div" {...props} />
}

export interface SpanProps extends Omit<BProps<'span'>,'as'> {}
export function Span(props: SpanProps) {
    return <B as="span" {...props} />
}

export interface ButtonProps extends Omit<BProps<'button'>,'as'> {}
export function Button(props: ButtonProps) {
    return <B as="button" {...props} />
}

export interface InputProps extends Omit<BProps<'input'>,'as'> {}
export function Input(props: InputProps) {
    return <B as="input" {...props} />
}

export interface TextareaProps extends Omit<BProps<'textarea'>,'as'> {}
export function Textarea(props: TextareaProps) {
    return <B as="textarea" {...props} />
}

export interface SelectProps extends Omit<BProps<'select'>,'as'> {}
export function Select(props: SelectProps) {
    return <B as="select" {...props} />
}

export interface OptionProps extends Omit<BProps<'option'>,'as'> {}
export function Option(props: OptionProps) {
    return <B as="option" {...props} />
}

export interface LabelProps extends Omit<BProps<'label'>,'as'> {}
export function Label(props: LabelProps) {
    return <B as="label" {...props} />
}

export interface FormProps extends Omit<BProps<'form'>,'as'> {}
export function Form(props: FormProps) {
    return <B as="form" {...props} />
}

export interface TableProps extends Omit<BProps<'table'>,'as'> {}
export function Table(props: TableProps) {
    return <B as="table" {...props} />
}

export interface TheadProps extends Omit<BProps<'thead'>,'as'> {}
export function Thead(props: TheadProps) {
    return <B as="thead" {...props} />
}

export interface TbodyProps extends Omit<BProps<'tbody'>,'as'> {}
export function Tbody(props: TbodyProps) {
    return <B as="tbody" {...props} />
}

export interface TfootProps extends Omit<BProps<'tfoot'>,'as'> {}
export function Tfoot(props: TfootProps) {
    return <B as="tfoot" {...props} />
}

export interface TrProps extends Omit<BProps<'tr'>,'as'> {}
export function Tr(props: TrProps) {
    return <B as="tr" {...props} />
}

export interface TdProps extends Omit<BProps<'td'>,'as'> {}
export function Td(props: TdProps) {
    return <B as="td" {...props} />
}

export interface ThProps extends Omit<BProps<'th'>,'as'> {}
export function Th(props: ThProps) {
    return <B as="th" {...props} />
}

export interface UlProps extends Omit<BProps<'ul'>,'as'> {}
export function Ul(props: UlProps) {
    return <B as="ul" {...props} />
}

export interface OlProps extends Omit<BProps<'ol'>,'as'> {}
export function Ol(props: OlProps) {
    return <B as="ol" {...props} />
}

export interface LiProps extends Omit<BProps<'li'>,'as'> {}
export function Li(props: LiProps) {
    return <B as="li" {...props} />
}

export interface NavProps extends Omit<BProps<'nav'>,'as'> {}
export function Nav(props: NavProps) {
    return <B as="nav" {...props} />
}

export interface HeaderProps extends Omit<BProps<'header'>,'as'> {}
export function Header(props: HeaderProps) {
    return <B as="header" {...props} />
}

export interface FooterProps extends Omit<BProps<'footer'>,'as'> {}
export function Footer(props: FooterProps) {
    return <B as="footer" {...props} />
}

export interface SectionProps extends Omit<BProps<'section'>,'as'> {}
export function Section(props: SectionProps) {
    return <B as="section" {...props} />
}

export interface ArticleProps extends Omit<BProps<'article'>,'as'> {}
export function Article(props: ArticleProps) {
    return <B as="article" {...props} />
}

export interface AsideProps extends Omit<BProps<'aside'>,'as'> {}
export function Aside(props: AsideProps) {
    return <B as="aside" {...props} />
}

export interface MainProps extends Omit<BProps<'main'>,'as'> {}
export function Main(props: MainProps) {
    return <B as="main" {...props} />
}

export interface FigureProps extends Omit<BProps<'figure'>,'as'> {}
export function Figure(props: FigureProps) {
    return <B as="figure" {...props} />
}

export interface FigcaptionProps extends Omit<BProps<'figcaption'>,'as'> {}
export function Figcaption(props: FigcaptionProps) {
    return <B as="figcaption" {...props} />
}

export interface DetailsProps extends Omit<BProps<'details'>,'as'> {}
export function Details(props: DetailsProps) {
    return <B as="details" {...props} />
}

export interface SummaryProps extends Omit<BProps<'summary'>,'as'> {}
export function Summary(props: SummaryProps) {
    return <B as="summary" {...props} />
}

export interface MarkProps extends Omit<BProps<'mark'>,'as'> {}
export function Mark(props: MarkProps) {
    return <B as="mark" {...props} />
}

export interface ProgressProps extends Omit<BProps<'progress'>,'as'> {}
export function Progress(props: ProgressProps) {
    return <B as="progress" {...props} />
}

export interface MeterProps extends Omit<BProps<'meter'>,'as'> {}
export function Meter(props: MeterProps) {
    return <B as="meter" {...props} />
}

export interface BlockquoteProps extends Omit<BProps<'blockquote'>,'as'> {}
export function Blockquote(props: BlockquoteProps) {
    return <B as="blockquote" {...props} />
}

export interface CiteProps extends Omit<BProps<'cite'>,'as'> {}
export function Cite(props: CiteProps) {
    return <B as="cite" {...props} />
}

export interface CodeProps extends Omit<BProps<'code'>,'as'> {}
export function Code(props: CodeProps) {
    return <B as="code" {...props} />
}

export interface PreProps extends Omit<BProps<'pre'>,'as'> {}
export function Pre(props: PreProps) {
    return <B as="pre" {...props} />
}

export interface TimeProps extends Omit<BProps<'time'>,'as'> {}
export function Time(props: TimeProps) {
    return <B as="time" {...props} />
}

export interface VarProps extends Omit<BProps<'var'>,'as'> {}
export function Var(props: VarProps) {
    return <B as="var" {...props} />
}

export interface KbdProps extends Omit<BProps<'kbd'>,'as'> {}
export function Kbd(props: KbdProps) {
    return <B as="kbd" {...props} />
}

export interface SampProps extends Omit<BProps<'samp'>,'as'> {}
export function Samp(props: SampProps) {
    return <B as="samp" {...props} />
}

export interface ItalicProps extends Omit<BProps<'italic'>,'as'> {}
export function Italic(props: ItalicProps) {
    return <B as="italic" {...props} />
}

export interface BoldProps extends Omit<BProps<'bold'>,'as'> {}
export function Bold(props: BoldProps) {
    return <B as="bold" {...props} />
}

export interface StrongProps extends Omit<BProps<'strong'>,'as'> {}
export function Strong(props: StrongProps) {
    return <B as="strong" {...props} />
}

export interface HrProps extends Omit<BProps<'hr'>,'as'> {}
export function Hr(props: HrProps) {
    return <B as="hr" {...props} />
}
