import { z } from 'zod'

import {zodToSimple,ValidatorSchemaUnwrap} from '../../../utils/input-validation'
import nonempty from '../../../utils/zod-refiners/nonempty'

export const schema = {
    instanceId: zodToSimple(z.string().superRefine(nonempty(false, "instance ID is required."))),
}

export type TSchema = ValidatorSchemaUnwrap<typeof schema>

