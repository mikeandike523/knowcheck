import {useParams} from 'react-router-dom'

import { Div } from '@/fwk/html'

export default function Quiz(){
    const {subjectId,action,token} = useParams()
    return <Div whiteSpace="pre-wrap">
        {JSON.stringify({subjectId,action,token},null,2)}
    </Div>
}