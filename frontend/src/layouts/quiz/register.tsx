
import { QuizRegistration } from "@/common/api-types";
import { schema } from "@/common/validators/handlers/registerForQuiz";
import InputWithValidation, {
  useInputWithValidationState,
} from "@/components/InputWithValidation";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import VStack from "@/fwk/components/VStack";
import { Div, Form, H1 } from "@/fwk/html";
import { useLoadingTask } from "@/lib/loading";
import { useRPCRoute } from "@/lib/rpc-client";
import theme from "@/themes/main";

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
    validator: schema.email,
    changeHook: () => {
      if(registerTask.state === "success") {
        registerTask.setIdle();
      }
    },
  });
  const fullNameInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: schema.fullName,
    changeHook: () => {
      if(registerTask.state === "success") {
        registerTask.setIdle();
      }
    }
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
      <LoadingOverlay
        task={registerTask}
        onDismiss={() => {
          registerTask.setIdle();
        }}
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
          <VStack width="100%" gap={theme.gutters.lg}>
            <InputWithValidation
              placeholder="Email"
              type="email"
              inputState={emailInputState}
            />
            <InputWithValidation
              placeholder="Full Name"
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
            {registerTask.state === "success" && (
              <>
                <Div background="lightgreen">

                  {
                    registerTask?.data?.isDuplicate??false ? <>
                                      <Div>
                                        You have registered for this quiz before. <br/>
                                        Instead of creating a new registration, <br/>
                                        A new access code and link have been generated and emailed to you.
                                      </Div>
                    </> :<>
                                      <Div>Succesfully registered for the quiz.</Div></>
                  }
                  <Div>
                    Check your email for the access link and access code.
                  </Div>
                  <Div>
                    If you did not recieve the email, check for typos in the
                    provided email, check your spam folder, and then try
                    registering again.
                  </Div>
                </Div>
              </>
            )}
          </VStack>
        </Form>
      </LoadingOverlay>
    </Div>
  );
}
