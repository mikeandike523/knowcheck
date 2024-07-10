import {z} from 'zod'
import {TArgs} from "../api-types/handlers/auth"
import nonempty from '../../utils/zod-refiners/nonempty'

const validator = z.object({
    subjectId:z.string().superRefine<string>(
        nonempty(false,"Subject ID is required.")
    )
})

export const parse=(data:unknown)=>validator.parse(data) as TArgs

export default validator