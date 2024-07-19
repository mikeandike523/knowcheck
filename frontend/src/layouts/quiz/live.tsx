import { Fragment, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

import { TSchema as TSchemaAuth } from "@/common/validators/handlers/auth";
import { TSchema as TSchemaToken } from "@/common/validators/handlers/token";
import { TokenClaims } from "@/common/api-types";

import InputWithValidation, {
  useInputWithValidationState,
} from "@/components/InputWithValidation";
import LoadingEllipses from "@/components/LoadingEllipses";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import VStack from "@/fwk/components/VStack";
import { Div, H1 } from "@/fwk/html";
import { LoadingTask, useLoadingTask } from "@/lib/loading";
import { useAPIData, useRPCRoute } from "@/lib/rpc-client";
import theme from "@/themes/main";
import { zodToSimple } from "@/utils/input-validation";
import nonempty from "@/utils/zod-refiners/nonempty";
import { z } from "zod";
import { RPCError } from "@/utils/rpc";
import { InvalidTokenReason } from "@/common/api-types";
import jsCookie from "js-cookie";
import usePeriodicTokenRefresh from "@/hooks/usePeriodicTokenRefresh";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

function SublayoutEnterAccessCode({
  subjectId,
  instanceId,
  onLogin,
  loginTask,
}: {
  subjectId: string;
  instanceId: string;
  onLogin: () => void;
  loginTask: LoadingTask<null>;
}) {
  useEffect(() => {
    console.log("SublayoutEnterAccessCode has mounted");
  }, []);
  const [successMessage, setSuccessMessage] = useState("Login successful!");
  const authRoute = useRPCRoute<TSchemaAuth, string>("auth");
  const tokenRoute = useRPCRoute<TSchemaToken, TokenClaims>("token", () => {
    return sessionStorage.getItem("__session") ?? undefined;
  });
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
  async function submitAccessCode(accessCode: string | null) {
    try {
      loginTask.setLoading();
      if (accessCode === null) {
        try {
          await tokenRoute({
            action: "check",
          });
          setSuccessMessage("Already logged in!");
          loginTask.setSuccess(null);
          onLogin();
          console.info("Existing token is still valid, proceeding with quiz..");
        } catch (e) {
          if (e instanceof RPCError) {
            if (e.status === 401 || e.status === 403) {
              if (e.cause === InvalidTokenReason.MISSING_TOKEN) {
                console.info(
                  "There was no existing login token, opening up login form..."
                );
              }
              if (e.cause === InvalidTokenReason.INVALID_TOKEN) {
                console.info(
                  "Existing token is no longer valid, opening up login form..."
                );
              }
              if (e.cause === InvalidTokenReason.EXPIRED) {
                console.info("Token has expired, opening up login form...");
              }
              if (e.cause === InvalidTokenReason.INVALID_FORMAT) {
                console.info(
                  "Token format is invalid, opening up login form..."
                );
              }
              loginTask.setIdle();
              return;
            }
          }
          throw e;
        }
      } else {
        const __session = await authRoute({
          accessCode,
          subjectId,
          instanceId,
        });
        // jsCookie.set("__session",__session)
        sessionStorage.setItem("__session", __session);
      }
      loginTask.setSuccess(null);
      onLogin();
    } catch (e) {
      loginTask.setError(e);
    }
  }

  useEffect(() => {
    submitAccessCode(null);
  }, []);

  return (
    <LoadingOverlay
      width="min(30em,100%)"
      task={loadInstanceDataTask}
      loadingOverlayProps={{
        borderRadius: theme.pages.quiz.panel.borderRadius,
      }}
    >
      <VStack gap={theme.gutters.lg}>
        {loadInstanceDataTask.state === "success" ? (
          <>
            <H1 fontSize="16px" margin={0} padding={0}>
              Welcome, {instanceData?.fullName}, to the "
              {instanceData?.quizName}" quiz!
            </H1>
            <Div>Enter the access code you recieved in your email.</Div>
            <Div>
              If you cannot locate the email, you will have to register again
              at:
            </Div>
            <a href={registerLink}>{registerLink}</a>
          </>
        ) : (
          <>
            <LoadingEllipses />
          </>
        )}

        <LoadingOverlay
          task={loginTask}
          contentProps={{
            display: "flex",
            flexDirection: "column",
            gap: theme.gutters.lg,
            alignItems: "center",
          }}
          onDismiss={() => {
            loginTask.setIdle();
          }}
        >
          {loginTask.state === "success" ? (
            <Fragment key="AccessCodeForm">
              <Div background="lightgreen">{successMessage}</Div>
            </Fragment>
          ) : (
            <Fragment key="AccessCodeForm">
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
            </Fragment>
          )}
        </LoadingOverlay>
      </VStack>
    </LoadingOverlay>
  );
}

function SublayoutMainQuiz() {
  useEffect(() => {}, [console.log("SublayoutMainQuiz has mounted")]);
  return <Div>Main Quiz Layout</Div>;
}

type SublayoutState = "enter-access-code" | "main-quiz";

export default function Live({ subjectId, instanceId }: LiveProps) {
  const loginTask = useLoadingTask<null>();
  const tokenRefresher = usePeriodicTokenRefresh({
    intervalMinutes: 0.5,
    onFailure: (reason, from) => {
      if (reason === InvalidTokenReason.INVALID_TOKEN) {
        loginTask.setError("Login expired or invalid... Please login again.");
      }
      if (reason === InvalidTokenReason.EXPIRED) {
        loginTask.setError("Login expired... Please login again.");
      }
      if (reason === InvalidTokenReason.INVALID_FORMAT) {
        loginTask.setError("Login token corrupted... Please login again.");
      }
      if (reason === InvalidTokenReason.MISSING_TOKEN) {
        loginTask.setError("No login token found... Please login again.");
      }
      console.error("Failed to refresh token", reason, from);
    },
  });
  const [sublayoutState, setSublayoutState] =
    useState<SublayoutState>("enter-access-code");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    console.log("Live has mounted");
  }, []);

  return (
    <Div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Div {...theme.pages.quiz.panel}>
        {sublayoutState === "enter-access-code" && (
          <Div key="sublayout">
            <SublayoutEnterAccessCode
              loginTask={loginTask}
              subjectId={subjectId}
              instanceId={instanceId!}
              onLogin={() => {
                setSublayoutState("main-quiz");
                tokenRefresher.start();
              }}
            />
          </Div>
        )}
        {sublayoutState === "main-quiz" && (
          <Div key="sublayout">
            <SublayoutMainQuiz />
          </Div>
        )}
      </Div>
    </Div>
  );
}
