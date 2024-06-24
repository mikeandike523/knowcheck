import {useParams} from 'react-router-dom'

export default function Quiz(){
    const {subjectId} = useParams()
    return <>Quiz for {subjectId}.</>
}