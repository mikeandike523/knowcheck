import { z } from "zod";

import { Div, H1 } from "@/fwk/html";

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
    <Div 
    
      width="30em"
    
    >
      <H1
        width="100%"
        textAlign="center"
        background={theme.navbar.background}
        color="white"
        margin={0}
        padding={0}
      >
        Register
      </H1>

      <Form
        width="100%"
        boxSizing="border-box"
        background={theme.card.background}
        padding={theme.gutters.lg}

      >
        <VStack width="100%" gap={theme.gutters.lg}
        
        
        >
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
    </Div>
  );
}