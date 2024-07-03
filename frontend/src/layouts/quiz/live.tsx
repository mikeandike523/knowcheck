import { useState } from "react";

import theme from "@/themes/main";
import { Div, H1, H2 } from "@/fwk/html";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useLoadingTask } from "@/lib/loading";
import { QuizRegistration } from "@/common/api-types";
import { z } from "zod";
import InputWithValidation, {
  useInputWithValidationState,
  zodToSimple,
} from "@/components/InputWithValidation";
import { useAPIData } from "@/lib/rpc-client";
import LoadingEllipses from "@/components/LoadingEllipses";

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
  const accessCodeInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: zodToSimple(
      z
        .string()
        .refine((values) => values.length > 0, "Access code is required.")
        .refine((values) => {
          const accessCode = values.toLowerCase();
          return accessCode.match(/^[a-z0-9]{10}$/) !== null;
        }, "Access code must be 10 characters and contain only letters and numbers."),
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
  return (
    <Div
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingOverlay task={loadInstanceDataTask} {...theme.pages.quiz.panel} loadingOverlayProps={{
        borderRadius:theme.pages.quiz.panel.borderRadius
      }}>
        <Div opacity={loadInstanceDataTask.state!=="success"?0:1} transition="all 0.25 ease">
          <H1 fontSize="16px">
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
        </Div>
      </LoadingOverlay>
    </Div>
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
