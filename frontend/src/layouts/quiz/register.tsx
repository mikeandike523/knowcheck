import { z } from "zod";

import InputWithValidation, {
  zodToSimple,
  useInputWithValidationState,
} from "@/components/InputWithValidation";
import { Form } from "@/fwk/html";
import VStack from "@/fwk/components/VStack";
import theme from "@/themes/main";

const formValidators = {
  email: zodToSimple(z.string().email(), (domValue: string) =>
    domValue.trim().toLowerCase()
  ),
  fullName: zodToSimple(z.string(), (domValue: string) => domValue.trim()),
} as const;

export default function Register() {
  const emailInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: formValidators.email,
  });
  const fullNameInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: formValidators.fullName,
  });
  return (
    <Form width="30em" maxWidth="100%" background={theme.card.background}>
      <VStack width="100%" gap={theme.gutters.lg}>
        <InputWithValidation
          label="Email"
          type="email"
          inputState={emailInputState}
        />
        <InputWithValidation
          label="Full Name"
          type="text"
          inputState={fullNameInputState}
        />
      </VStack>
    </Form>
  );
}
