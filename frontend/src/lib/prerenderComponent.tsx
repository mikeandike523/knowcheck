import {ReactNode} from 'react'
import * as ReactDOMServer from 'react-dom/server'

/** Renders a given component to HTML */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function prerenderComponent(element: ReactNode){
    return ReactDOMServer.renderToStaticMarkup(element)
}