import { z } from "zod";

import { QuizRegistration } from "@/common/api-types";
import InputWithValidation, {
  useInputWithValidationState,
  zodToSimple,
} from "@/components/InputWithValidation";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import VStack from "@/fwk/components/VStack";
import { Div, Form, H1 } from "@/fwk/html";
import { useLoadingTask } from "@/lib/loading";
import { useRPCRoute } from "@/lib/rpc-client";
import theme from "@/themes/main";

const formValidators = {
  email: zodToSimple(z.string().email(), (domValue: string) =>
    domValue.trim().toLowerCase()
  ),
  // How in zod to ensure that there are at least two significant strings seperated by at least one whitespace
  fullName: zodToSimple(
    z.string().refine(
      (value) => {
        const parts = value.trim().split(/\s+/);
        return parts.length >= 2 && parts.every((part) => part.length > 0);
      },
      {
        message: "At least a first and last name is required.",
      }
    ),
    (domValue: string) => domValue.trim()
  ),
} as const;

export interface RegisterProps {
  subjectId: string;
}

export default function Register({ subjectId }: RegisterProps) {
  const registerRoute = useRPCRoute<
    {
      email: string;
      fullName: string;
      subjectId: string;
      baseUrl: string;
    },
    QuizRegistration
  >("registerForQuiz");
  const registerTask = useLoadingTask<QuizRegistration>();
  const emailInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: formValidators.email,
  });
  const fullNameInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: formValidators.fullName,
  });
  async function register() {
    const results = [emailInputState.validate(), fullNameInputState.validate()];
    const allValid = results.every((result) => result.valid);
    if (allValid) {
      const data = results.map((result) => result.data!);
      try {
        registerTask.setLoading();
        const result = await registerRoute({
          email: data[0],
          fullName: data[1],
          subjectId,
          baseUrl: `${window.location.protocol}//${window.location.host}`,
        });
        registerTask.setSuccess(result);

        console.log(result);
      } catch (e) {
        registerTask.setError(e);
      }
    }
  }
  return (
    <Div width="30em">
      <LoadingOverlay task={registerTask}>
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
            <SemanticButton
              boxSizing="border-box"
              display="inline-block"
              margin={0}
              padding="0.5em"
              color="primary"
              fontSize="16px"
              aspectRatio="auto"
              onClick={register}
            >
              Submit
            </SemanticButton>
          </VStack>
        </Form>
      </LoadingOverlay>
    </Div>
  );
}
