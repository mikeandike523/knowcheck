import { Div, DivProps } from "@/fwk/html";
import { AccessCodeBarrierState } from "@/hooks/useAccessCodeBarrierState";
import { zodToSimple } from "@/utils/input-validation";
import nonempty from "@/utils/zod-refiners/nonempty";
import { Fragment } from "react";
import { z } from "zod";
import InputWithValidation, {
  useInputWithValidationState,
} from "./InputWithValidation";
import LoadingOverlay, { LoadingOverlayProps } from "./LoadingOverlay";
import SemanticButton from "./SemanticButton";
import VStack from "@/fwk/components/VStack";
import theme from "@/themes/main";
import HStack from "@/fwk/components/HStack";

export type LoginLoadingOverlayProps = Omit<LoadingOverlayProps<null>, "task">;
export interface AccessCodeBarrierProps extends DivProps {
  state: AccessCodeBarrierState;
  loadingOverlayProps?: LoginLoadingOverlayProps;
}

export default function AccessCodeBarrier({
  state,
  children,
  loadingOverlayProps = {},
  ...rest
}: AccessCodeBarrierProps) {
  const accessCodeInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: zodToSimple(
      z
        .string()
        .transform((value) => value.trim())
        .superRefine(nonempty(false, "Please enter an access code"))
        .superRefine((value, ctx) => {
          if (value.toLowerCase().match(/^[a-zA-Z0-9]{10}$/) === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Access code must be exactly 10 characters long and contain only letters and numbers.",
              fatal: true,
            });
          }
        })
    ),
  });
  const registerLink =
    typeof window.location !== "undefined"
      ? window.location.protocol +
        "//" +
        window.location.host +
        "/quiz/" +
        state.subjectId +
        "/register/"
      : "";
  const loginForm = (
    <Div  boxSizing="border-box">
      {state.loginTask.state === "success" ? (
        <Fragment key="AccessCodeForm">
          <Div background="lightgreen">{state.successMessage}</Div>
        </Fragment>
      ) : (
        <Fragment key="AccessCodeForm">
          <VStack
      
            textAlign="center"
            gap={theme.gutters.lg}
            padding={theme.gutters.lg}
            boxSizing="border-box"
          >
            <Div>Enter the access code you recieved in your email.</Div>
            <Div>
              If you cannot locate the email, you will have to register again
              at:
            </Div>
            <a href={registerLink}>{registerLink}</a>
            <HStack gap={theme.gutters.sm}>
              <Div width="10em">
                <InputWithValidation
                  type="password"
                  inputState={accessCodeInputState}
                  placeholder="Access Code"
                  fontSize="16px"
                  padding="4px"
                  height="32px"
                />
              </Div>

              <SemanticButton
                color="primary"
                padding="4px"
                fontSize="16px"
                height="32px"
                onClick={() => {
                  const validationResult = accessCodeInputState.validate();
                  if (validationResult.valid) {
                    state.login(validationResult.data!);
                  }
                }}
              >
                Submit
              </SemanticButton>
            </HStack>
          </VStack>
        </Fragment>
      )}
    </Div>
  );
  return (
    <LoadingOverlay
      task={state.loginTask}
      contentProps={{
        width:"auto",
        ...rest
      }}
      onDismiss={() => {
        state.reset();
      }}
      {...loadingOverlayProps}
    >
      {state.authenticated ? (
        <Fragment key="LoginFormOrContent">{children}</Fragment>
      ) : (
        <Fragment key="LoginFormOrContent">{loginForm}</Fragment>
      )}
    </LoadingOverlay>
  );
}
