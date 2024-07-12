import { z } from 'zod'

import {zodToSimple,ValidatorSchemaUnwrap} from '../../../utils/input-validation'
import nonempty from '../../../utils/zod-refiners/nonempty'
import isEmail from '../../../utils/zod-refiners/isEmail'

export const schema = {
    email: zodToSimple(z.string().transform(email => email.trim().toLowerCase()).superRefine(nonempty(
        false,
        "Email address is required."
    )).superRefine(isEmail("Invalid email address."))),
    fullName: zodToSimple(
        z.string().transform(fullName => fullName.trim()).superRefine(nonempty(
            false,
            "Full name is required."
        ))
    ),
    subjectId: zodToSimple(z.string().superRefine(nonempty(false, "Subject ID is required."))),
    baseUrl: zodToSimple(z.string().url().superRefine(nonempty(
        false,
        "Base URL is required."
    )))
}

export type TSchema = ValidatorSchemaUnwrap<typeof schema>

