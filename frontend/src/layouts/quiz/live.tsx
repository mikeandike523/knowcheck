import { useState } from "react";

import InputWithValidation, {
  useInputWithValidationState,
  zodToSimple,
} from "@/components/InputWithValidation";
import LoadingEllipses from "@/components/LoadingEllipses";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import VStack from "@/fwk/components/VStack";
import { Div, H1 } from "@/fwk/html";
import { useAPIData } from "@/lib/rpc-client";
import theme from "@/themes/main";
import { z } from "zod";
import { useLoadingTask } from "@/lib/loading";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

function SublayoutEnterAccessCode({
  subjectId,
  instanceId,
}: {
  subjectId: string;
  instanceId: string;
}) {
  const loadInstanceDataTask = useAPIData<
    {
      subjectId: string;
      instanceId: string;
    },
    {
      fullName: string;
      quizName: string;
    }
  >(
    "getQuizInstanceData",
    {
      subjectId,
      instanceId,
    },
    []
  ).task;
  // The access token is stored in an http only cookie so the loading task data type is null
  // Access token needs to be exchanged for a new one every 10 minutes
  const submitAccessCodeTask = useLoadingTask<null>();
  const accessCodeInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: zodToSimple(
      z
        .string()

        .superRefine((value, ctx) => {
          if (value.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please enter an access code.",
              fatal: true,
            });
            return z.NEVER;
          }
          if (value.toLowerCase().match(/^[a-z0-9]{10}$/) === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Access code must be exactly 10 characters long and contain only letters and numbers.",
              fatal: true,
            });
          }
        }),
      (value) => value.trim()
    ),
  });
  const instanceData = loadInstanceDataTask.data;
  const registerLink =
    typeof window.location !== "undefined"
      ? window.location.protocol +
        "//" +
        window.location.host +
        "/quiz/" +
        subjectId +
        "/register/"
      : "";
  async function submitAccessCode(accessCode: string) {}
  return (
    <VStack height="100%" justifyContent="center">
      <LoadingOverlay
        task={loadInstanceDataTask}
        {...theme.pages.quiz.panel}
        loadingOverlayProps={{
          borderRadius: theme.pages.quiz.panel.borderRadius,
        }}
      >
        <VStack
          gap={theme.gutters.lg}
          opacity={loadInstanceDataTask.state !== "success" ? 0 : 1}
          transition="all 0.25 ease"
        >
          <H1 fontSize="16px" margin={0} padding={0}>
            Welcome, {instanceData?.fullName ?? <LoadingEllipses />}, to the "
            {instanceData?.quizName ?? <LoadingEllipses />}" quiz!
          </H1>
          <p>Enter the access code you recieved in your email.</p>
          <p>
            If you cannot locate the email, you will have to register again at:
          </p>
          <a href={registerLink}>{registerLink}</a>
          <InputWithValidation
            type="password"
            inputState={accessCodeInputState}
            label="Access Code"
          />
          <SemanticButton
            color="primary"
            padding="0.5em"
            onClick={() => {
              const validationResult = accessCodeInputState.validate();
              if (validationResult.valid) {
                submitAccessCode(validationResult.data!);
              }
            }}
          >
            Start Quiz
          </SemanticButton>
        </VStack>
      </LoadingOverlay>
    </VStack>
  );
}

function SublayoutReadInstructions() {
  return <></>;
}

function SublayoutMainQuiz() {
  return <></>;
}

function SublayoutLogoutOrAccessError() {
  return <></>;
}

function SublayoutGeneralError() {
  return <></>;
}

type SublayoutState =
  | "enter-access-code"
  | "read-instructions"
  | "main-quiz"
  | "logout-or-access-error"
  | "general-error";

export default function Live({ subjectId, instanceId }: LiveProps) {
  const [sublayoutState, setSublayoutState] =
    useState<SublayoutState>("enter-access-code");
  const [errorMessage, setErrorMessage] = useState<string>("");
  if (typeof instanceId === "undefined") {
    return (
      <Div
        key="SublayoutOrError"
        padding={theme.gutters.lg}
        background="white"
        border="2px solid red"
        color="red"
      >
        Missing Instance Id. Double-check the url in the browser.
        {typeof window !== "undefined" && (
          <p>
            The url should look similar to:
            <br />
            {window.location.protocol}//{window.location.host}/quiz/{subjectId}
            /live/
            <i>&lt;INSTANCE_ID&gt;</i>
          </p>
        )}
      </Div>
    );
  }
  switch (sublayoutState) {
    case "enter-access-code":
      return (
        <SublayoutEnterAccessCode
          subjectId={subjectId}
          instanceId={instanceId!}
        />
      );
    case "read-instructions":
      return <SublayoutReadInstructions />;
    case "main-quiz":
      return <SublayoutMainQuiz />;
    case "logout-or-access-error":
      return <SublayoutLogoutOrAccessError />;
    case "general-error":
      return <SublayoutGeneralError />;
    default:
      return (
        <Div
          key="SublayoutOrError"
          padding={theme.gutters.lg}
          background="white"
          border="2px solid red"
          color="red"
        >
          Unknown sublayout state: {sublayoutState}
        </Div>
      );
  }
}
