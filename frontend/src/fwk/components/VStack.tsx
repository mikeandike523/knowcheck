import {Div, DivProps} from '../html'

export interface VStackProps extends DivProps{}

export default function VStack({...rest}:VStackProps){
    return <Div display="flex" flexDirection="column" justifyContent='flex-start' alignItems="center" {...rest}/>
}
