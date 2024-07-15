import {z} from 'zod'

import { ValidatorSchemaUnwrap, zodToSimple } from "../../utils/input-validation"
import nonempty from '../../utils/zod-refiners/nonempty'

export const schemaTokenClaims = {
    subjectId: zodToSimple(z.string().superRefine(nonempty())),
    instanceId: zodToSimple(z.string().superRefine(nonempty())),
    timestamp: zodToSimple(z.number()),
    expires: zodToSimple(z.number()),
    maxAge: zodToSimple(z.number()),
}
