import { z } from 'zod'

import { zodToSimple } from '../../../utils/input-validation'
import isEmail from '../../../utils/zod-refiners/isEmail'
import nonempty from '../../../utils/zod-refiners/nonempty'

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

export type TSchema = {
    email: string;
    fullName: string;
    subjectId: string;
    baseUrl: string;
}

