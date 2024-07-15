import { z } from 'zod'

import {zodToSimple,ValidatorSchemaUnwrap} from '../../../utils/input-validation'
import isOneOfStrings from '../../../utils/zod-refiners/isOneOfStrings'

export const actions = ["refresh","check"] as const

export type Action = typeof actions[number]

export const schema = {
    // We need to start with z.any() and then ensure it is a string in our custom refiner
    // This is due to zod not allowing a type argument to z.string()
    // to narrow to a set of fixed strings before further refinement
    action: zodToSimple<Action>(z.any().superRefine<Action>(isOneOfStrings<Action>(
        actions,
        (action)=>`Invalid action \"${action}\", must be one of: ${actions.join(", ")}.`
    )))
}

export type TSchema = ValidatorSchemaUnwrap<typeof schema>

