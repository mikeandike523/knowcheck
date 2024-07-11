import { z } from 'zod'

import {zodToSimple} from '../../../utils/input-validation'
import nonempty from '../../../utils/zod-refiners/nonempty'
import isEmail from '../../../frontend/src/utils/zod-refiners/isEmail'

const schema = {
    email: zodToSimple(z.string().transform(email => email.trim().toLowerCase()).superRefine(nonempty(
        false,
        "Email address is required."
    )).superRefine(isEmail("Invalid email address."))),
    fullName: zodToSimple(
        z.string().transform(fullName => fullName.trim()).superRefine(nonempty(
            false,
            "Full name is required."
        ))
    )
}

export default schema

