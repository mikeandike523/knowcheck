import {Div, DivProps} from '../html'

export interface HStackProps extends DivProps {}

export default function HStack({...rest}:HStackProps){
    return <Div display="flex" flexDirection="row" justifyContent='flex-start' alignItems="center" {...rest}/>
}